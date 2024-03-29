package com.chit.chitsystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.chit.chitsystem.dto.requests.RefreshTokenRequest;
import com.chit.chitsystem.dto.requests.SignInRequest;
import com.chit.chitsystem.dto.requests.SignUpRequest;
import com.chit.chitsystem.dto.responses.JWTAuthenticationResponse;
import com.chit.chitsystem.entity.Token;
import com.chit.chitsystem.entity.User;
import com.chit.chitsystem.entity.enums.Role;
import com.chit.chitsystem.entity.enums.Status;
import com.chit.chitsystem.entity.enums.TokenType;
import com.chit.chitsystem.exception.newexceptions.DuplicateUserException;
import com.chit.chitsystem.exception.newexceptions.InvalidTokenException;
import com.chit.chitsystem.exception.newexceptions.TokenNotFoundException;
import com.chit.chitsystem.exception.newexceptions.UserNotFoundException;
import com.chit.chitsystem.repository.TokenRepository;
import com.chit.chitsystem.repository.UserRepository;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationService {

    @Autowired
    private final UserRepository userRepository;
    private final JWTService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenRepository tokenRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final SimpUserRegistry userRegistry;
    

    // Build/store new users and return tokens
    public JWTAuthenticationResponse signUpUser(
            SignUpRequest signUpRequest,
            HttpServletRequest request,
            HttpServletResponse response) {
        try {
            if (userRepository.existsByUserName(signUpRequest.getUserName())) {
                throw new DuplicateUserException("Username already exists.");
            }
            if (userRepository.existsByEmail(signUpRequest.getEmail())) {
                throw new DuplicateUserException("Email already exists.");
            }

            var user = User
                    .builder()
                    .fullName(signUpRequest.getFullName())
                    .userName(signUpRequest.getUserName())
                    .email(signUpRequest.getEmail())
                    .password(passwordEncoder.encode(signUpRequest.getPassword()))
                    .role(Role.USER)
                    .status(Status.OFFLINE)
                    .build(); // Build user from request body

            var storedUser = userRepository.save(user);
            var jwt = jwtService.generateToken(user); // Generate token

            var refreshToken = jwtService.generateRefreshToken(user); // Generate refreshtoken
            storeUserToken(storedUser, jwt, refreshToken, request, response); // Store token

            return JWTAuthenticationResponse.builder().accessToken(jwt).refreshToken(refreshToken).build();                                                                                       
        } catch (Exception e) {
            log.error("[AuthenticationService] - Error during sign up.", e);
            throw e;
        }
    }

    // Sign in and validate users
    public JWTAuthenticationResponse signInUser(
            SignInRequest signInRequest,
            HttpServletRequest request,
            HttpServletResponse response) {
        try {
            // Authenticate user
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(signInRequest.getEmail(), signInRequest.getPassword())); 
                                                                                                                     
            var user = userRepository.findByEmail(signInRequest.getEmail())
                    .orElseThrow(() -> new UserNotFoundException("Invalid email."));

            // Set user's status to ONLINE when logging in
            user.setStatus(Status.ONLINE); 
            userRepository.save(user);

            var jwt = jwtService.generateToken(user);
            var refreshToken = jwtService.generateRefreshToken(user);

            revokeAllUserTokens(user, request, response); // Revoke all user tokens
            storeUserToken(user, jwt, refreshToken, request, response); // Store Token

            return JWTAuthenticationResponse.builder().accessToken(jwt).refreshToken(refreshToken).build();
        } catch (Exception e) {
            log.error("[AuthenticationService] - Error during sign in.", e);
            throw e;
        }
    }

    // Check if the user has a valid token
    public Boolean whoAmITokenCheck(HttpServletRequest request) {
        final String accessToken = extractAccessTokenFromCookies(request);
    
        return jwtService.isTokenAuthorized(accessToken, "accessToken");
    }
    // Check if the user has logged out
    public Boolean whoAmIStatusCheck(HttpServletRequest request){
        final String accessToken = extractAccessTokenFromCookies(request);
        final String userEmail = jwtService.extractUsername(accessToken);
        var user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UserNotFoundException("Invalid email for refresh token."));

        if (user.getStatus() == Status.OFFLINE){
            return false;
        }
        return true;
    }

    // Helper to extract the access token from the http-only cookies
    public String extractAccessTokenFromCookies(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        // Scan cookie for access token
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("accessToken")) {
                    return cookie.getValue();
                }
            }
        }
        // No authenticated user logged in with access token
        return null;
    }

    // Helper to extract the refresh token from the http-only cookies
    public String extractRefreshTokenFromCookies(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("refreshToken")) {
                    return cookie.getValue();
                }
            }
        }
        
        return null;
    }


    // Create a new access token and refresh token based on the refresh token
    public JWTAuthenticationResponse createRefreshToken(
            HttpServletRequest request,
            HttpServletResponse response) {
        try {
            final String refreshToken = extractRefreshTokenFromCookies(request);
            boolean isValidRefreshToken = jwtService.isTokenAuthorized(refreshToken, "refreshToken");

            if (isValidRefreshToken) {
                // Extract user
                final String userEmail = jwtService.extractUsername(refreshToken);
                var user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new UserNotFoundException("Invalid Token: email for access or refresh token doesn't exist."));
                
                // Generate new access and refresh tokens
                var newAccessToken = jwtService.generateToken(user);
                var newRefreshToken = jwtService.generateRefreshToken(user);

                // Revoke the current access and refresh tokens, and store the new ones, update cookies
                revokeAllUserTokens(user, request, response);
                storeUserToken(user, newAccessToken, newRefreshToken, request, response);

                // Generate an auth response containing the new tokens
                var authResponse = JWTAuthenticationResponse.builder()
                        .accessToken(newAccessToken)
                        .refreshToken(newRefreshToken)
                        .build();

                return authResponse;
            } else {
                throw new TokenNotFoundException("Token missing: there is no refresh token available.");
            }
        } catch (Exception e) {
            log.error("[AuthenticationService] - Error during creating refresh token.", e);
            throw e;
        }
    }

    // Helper method to build http-only cookies
    private void createHttpOnlyCookie(String name, String token, Boolean deleteToken, HttpServletRequest request,
            HttpServletResponse response) {
        var expiration = 0;
        // Get expiration of access or refresh token in miliseconds and convert to
        // seconds
        if (deleteToken) {
            expiration = 0;
            Cookie deletedCookie = new Cookie(name, "");
            deletedCookie.setMaxAge(0);
            deletedCookie.setPath("/");
            deletedCookie.setSecure(true);
            response.addCookie(deletedCookie);
        } else {
            expiration = (int) (jwtService.getExpirationToken(token) / 1000);
            String cookieValue = String.format("%s=%s; Max-Age=%d; Path=/; HttpOnly; Secure; SameSite=None",
                    name, token, deleteToken ? 0 : expiration);
            response.addHeader("Set-Cookie", cookieValue);
        }
    }

    // Helper method to build and store the Token entity
    private void storeUserToken(
            User user,
            String jwtToken,
            String refreshToken,
            HttpServletRequest request,
            HttpServletResponse response) {
        var token = Token.builder()
                .user(user)
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);

        // Create and add http only cookies to client
        createHttpOnlyCookie("accessToken", jwtToken, false, request, response);
        createHttpOnlyCookie("refreshToken", refreshToken, false, request, response);
    }

    // Helper method to invalidate all prior user tokens to make room for a new one.
    private void revokeAllUserTokens(
            User user,
            HttpServletRequest request,
            HttpServletResponse response) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());

        if (validUserTokens.isEmpty()) {
            return;
        }

        // Update each token
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });

        // Store the tokens
        tokenRepository.saveAll(validUserTokens);

        // Delete cookies
        createHttpOnlyCookie("accessToken", "", true, request, response);
        createHttpOnlyCookie("refreshToken", "", true, request, response);
    }

}
