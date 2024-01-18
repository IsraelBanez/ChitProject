package com.chit.chitsystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

import com.chit.chitsystem.exception.newexceptions.InvalidTokenException;
import com.chit.chitsystem.exception.newexceptions.TokenNotFoundException;
import com.chit.chitsystem.repository.TokenRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {

    @Autowired
    private final TokenRepository tokenRepository;
    private final JWTService jwtService;

    // fix this
    @Override
    public void logout(
        HttpServletRequest request, 
        HttpServletResponse response, 
        Authentication authentication
    ) {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;

        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            return;
        }
        // Get current authenticated user
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        // Grab access token
        jwt = authHeader.substring(7);

        // Grab the access token and verify the access token exists in db   
        var storedToken = tokenRepository.findByAccessToken(jwt).orElse(null);
        if (storedToken == null) {
            throw new TokenNotFoundException("Access token not found in the database.");
        }

        // Verify the access token is not expired or revoked
        var isAccessTokenValidInDB = tokenRepository.findByAccessToken(jwt) 
            .map(t -> !t.isExpired() && !t.isRevoked())
            .orElse(false);

        // Verify access token is not revoked or expired, and is valid token
        if (isAccessTokenValidInDB  && jwtService.isTokenValid(jwt, userDetails)) {
            // Expire and revoke current access and refresh token
            storedToken.setExpired(true);
            storedToken.setRevoked(true);

            // Update the db
            tokenRepository.save(storedToken);
        } else {
            throw new InvalidTokenException("Invalid or revoked token.");
        }
    
    }
    
}
