package com.chit.chitsystem.service;


import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.chit.chitsystem.dto.requests.RefreshTokenRequest;
import com.chit.chitsystem.dto.requests.SignInRequest;
import com.chit.chitsystem.dto.requests.SignUpRequest;
import com.chit.chitsystem.dto.responses.JWTAuthenticationResponse;
import com.chit.chitsystem.entity.Token;
import com.chit.chitsystem.entity.User;
import com.chit.chitsystem.entity.enums.Role;
import com.chit.chitsystem.entity.enums.TokenType;
import com.chit.chitsystem.exception.newexceptions.DuplicateUserException;
import com.chit.chitsystem.exception.newexceptions.InvalidTokenException;
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

    // Build/store new users and return tokens
    public JWTAuthenticationResponse signUpUser(
        SignUpRequest signUpRequest,
        HttpServletRequest request,
        HttpServletResponse response
    ) {
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
                        .build(); // Build user from request body

            var storedUser = userRepository.save(user);
            var jwt = jwtService.generateToken(user); // Generate token
            var refreshToken = jwtService.generateRefreshToken(user); // Generate refreshtoken
            storeUserToken(storedUser, jwt, refreshToken, request, response); // Store token
            return JWTAuthenticationResponse.builder().accessToken(jwt).refreshToken(refreshToken).build(); // Return response
        } catch (Exception e){
            log.error("[AuthenticationService] - Error during sign up.", e);
            throw e;
        }
    }

    // Sign in and validate users
    public JWTAuthenticationResponse signInUser(
        SignInRequest signInRequest,
        HttpServletRequest request, 
        HttpServletResponse response
    ) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signInRequest.getEmail(), signInRequest.getPassword())); // Authenticate user

            var user = userRepository.findByEmail(signInRequest.getEmail())
                    .orElseThrow(() -> new UserNotFoundException("Invalid email."));
                    
            var jwt = jwtService.generateToken(user);
            var refreshToken = jwtService.generateRefreshToken(user);
            revokeAllUserTokens(user, request, response); // Revoke all user tokens
            storeUserToken(user, jwt, refreshToken, request, response); // Store Token
            // Check if the authentication object is present
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.isAuthenticated()) {
                // Perform actions based on the authenticated user
                log.info("User '{}' successfully signed in.", authentication.getPrincipal());
            } else {
                // Authentication failed or user not authenticated
                log.warn("Sign-in authentication failed.");
            }
            return JWTAuthenticationResponse.builder().accessToken(jwt).refreshToken(refreshToken).build();
        } catch (Exception e) {
            log.error("[AuthenticationService] - Error during sign in.", e);
            throw e;
        } 
    }

    // Check if a user is still logged in
    public Boolean whoAmI(HttpServletRequest request){
        final String accessToken = extractAccessTokenFromCookies(request);
        log.info(accessToken + "here1");
        final String userEmail;

        // If no access token, no user is logged in
        if (accessToken == null) {
            return false;
        }

        log.info(accessToken + "here2");
        // There is an access token, therefore some is logged in
        userEmail = jwtService.extractUsername(accessToken);

        if (userEmail != null){
            // Verify the email accociated with the access token is in the db
            var user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UserNotFoundException("Invalid email for refresh token."));

            // Verify that the access token is not expired or revoked
            var isAccessTokenValidInDB = tokenRepository.findByAccessToken(accessToken) 
                .map(t -> !t.isExpired() && !t.isRevoked())
                .orElse(false);
            log.info("ff" + isAccessTokenValidInDB);
            log.info(""+ jwtService.isTokenValid(accessToken, user));
            // Verify that the refresh token is not expired and is associated with the email
            if (jwtService.isTokenValid(accessToken, user) && isAccessTokenValidInDB) {
                return true;
            } else{
                throw new InvalidTokenException("Invalid or revoked token.");
            }
        }
        throw new InvalidTokenException("Invalid token.");
    }

    // Helper to extract the access token from the http-only cookies
    private String extractAccessTokenFromCookies(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        // Scan cookie for access token
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("accessToken")) {
                    log.info(cookie.getValue() + "here3");
                    return cookie.getValue();
                }
            }
        }
        // No authenticated user logged in with access token
        return null;
    }

    // Create a new access token and refresh token based on the refresh token 
    public JWTAuthenticationResponse createRefreshToken(
        RefreshTokenRequest refreshTokenRequest,
        HttpServletRequest request, 
        HttpServletResponse response
    ){
        try {
            final String refreshToken = refreshTokenRequest.getRefreshToken();
            final String userEmail = jwtService.extractUsername(refreshToken);

            if (userEmail != null){
                // Verify the email accociated with the refresh token is in the db
                var user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new UserNotFoundException("Invalid email for refresh token."));

                // Verify that the refresh token is not expired or revoked
                var isRefreshTokenValidInDB = tokenRepository.findByRefreshToken(refreshToken) 
                    .map(t -> !t.isExpired() && !t.isRevoked())
                    .orElse(false);

                // Verify that the refresh token is not expired and is associated with the email
                if (jwtService.isTokenValid(refreshToken, user) && isRefreshTokenValidInDB) {
                    // Generate new access and refresh tokens
                    var newAccessToken = jwtService.generateToken(user); 
                    var newRefreshToken = jwtService.generateRefreshToken(user);

                    // Revoke the current access and refresh tokens, and store the new ones
                    revokeAllUserTokens(user, request, response);  
                    storeUserToken(user, newAccessToken, newRefreshToken, request, response); 

                    // Generate an auth response containing the new tokens
                    var authResponse = JWTAuthenticationResponse.builder()
                        .accessToken(newAccessToken)
                        .refreshToken(newRefreshToken)
                        .build();
                    
                    return authResponse; 
                } else {
                    throw new InvalidTokenException("Invalid or revoked token.");
                }
            }
            return null;
        } catch (Exception e) {
            log.error("[AuthenticationService] - Error during creating refresh token.", e);
            throw e;
        }
    }

    // Helper method to build http-only cookies
    private void createHttpOnlyCookie(String name, String token, Boolean deleteToken, HttpServletRequest request, HttpServletResponse response) {
        var expiration = 0;
        // Get expiration of access or refresh token in miliseconds and convert to seconds
        if (deleteToken){
            expiration = 0;
        } else{
            expiration = (int) (jwtService.getExpirationToken(token) / 1000);
        }

        Cookie cookie = new Cookie(name, token);
        // Set HttpOnly to true, making the cookie inaccessible to JavaScript
        cookie.setHttpOnly(true);
        // Set the cookie age 
        cookie.setMaxAge(deleteToken ? 0 : expiration);
        // Set to true if using HTTPS
        cookie.setSecure(request.isSecure()); 
        // Set path valid for entire application
        cookie.setPath("/");
        cookie.setDomain("localhost");
        // Add the cookie to  response, making it available to client
        response.addCookie(cookie);
    }

    // Helper method to build and store the Token entity
    private void storeUserToken(
        User user, 
        String jwtToken, 
        String refreshToken,
        HttpServletRequest request,
        HttpServletResponse response
        ) {
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
        HttpServletResponse response
    ) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());

        if (validUserTokens.isEmpty()){
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
        createHttpOnlyCookie("refreshToken", "",true, request, response);
    }

    
}
