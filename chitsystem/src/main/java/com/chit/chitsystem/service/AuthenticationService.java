package com.chit.chitsystem.service;


import org.springframework.beans.factory.annotation.Autowired;
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
    public JWTAuthenticationResponse signUpUser(SignUpRequest request) {
        try {
            if (userRepository.existsByUserName(request.getUserName())) {
                throw new DuplicateUserException("Username already exists.");
            }
            if (userRepository.existsByEmail(request.getEmail())) {
                throw new DuplicateUserException("Email already exists.");
            }

            var user = User
                        .builder()
                        .fullName(request.getFullName())
                        .userName(request.getUserName())
                        .email(request.getEmail())
                        .password(passwordEncoder.encode(request.getPassword()))
                        .role(Role.USER)
                        .build(); // Build user from request body

            var storedUser = userRepository.save(user);
            var jwt = jwtService.generateToken(user); // Generate token
            var refreshToken = jwtService.generateRefreshToken(user); // Generate refreshtoken
            storeUserToken(storedUser, jwt, refreshToken); // Store token
            return JWTAuthenticationResponse.builder().accessToken(jwt).refreshToken(refreshToken).build(); // Return response
        } catch (Exception e){
            log.error("[AuthenticationService] - Error during sign up.", e);
            throw e;
        }
    }

    // Sign in and validate users
    public JWTAuthenticationResponse signInUser(SignInRequest request) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())); // Authenticate user

            var user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new UserNotFoundException("Invalid email."));
                    
            var jwt = jwtService.generateToken(user);
            var refreshToken = jwtService.generateRefreshToken(user);
            revokeAllUserTokens(user); // Revoke all user tokens
            storeUserToken(user, jwt, refreshToken); // Store Token
            return JWTAuthenticationResponse.builder().accessToken(jwt).refreshToken(refreshToken).build();
        } catch (Exception e) {
            log.error("[AuthenticationService] - Error during sign in.", e);
            throw e;
        } 
    }

    // Helper method to build http-only cookies
    private void createHTTPOnlyCookie(String name, String value, int maxAge, HttpServletRequest request, HttpServletResponse response) {
        Cookie cookie = new Cookie(name, value);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(maxAge);
        cookie.setSecure(request.isSecure()); // Set to true if using HTTPS
        cookie.setPath("/");
        response.addCookie(cookie);
    }

    // Helper method to build and store the Token entity
    private void storeUserToken(User user, String jwtToken, String refreshToken) {
        var token = Token.builder()
            .user(user)
            .accessToken(jwtToken)
            .refreshToken(refreshToken)
            .tokenType(TokenType.BEARER)
            .expired(false)
            .revoked(false)
            .build();
        tokenRepository.save(token);
    }

    // Helper method to invalidate all prior user tokens to make room for a new one.
    private void revokeAllUserTokens(User user) {
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
    }


    // Create a new access token and refresh token based on the refresh token 
    public JWTAuthenticationResponse createRefreshToken(RefreshTokenRequest request){
        try {
            final String refreshToken = request.getRefreshToken();
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
                    revokeAllUserTokens(user);  
                    storeUserToken(user, newAccessToken, newRefreshToken); 

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
    
}
