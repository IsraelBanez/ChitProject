package com.chit.chitsystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

import com.chit.chitsystem.entity.enums.Status;
import com.chit.chitsystem.exception.newexceptions.InvalidTokenException;
import com.chit.chitsystem.exception.newexceptions.TokenNotFoundException;
import com.chit.chitsystem.exception.newexceptions.UserNotFoundException;
import com.chit.chitsystem.repository.TokenRepository;
import com.chit.chitsystem.repository.UserRepository;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {

    @Autowired
    private final TokenRepository tokenRepository;
    private final JWTService jwtService;
    private final UserRepository userRepository;

    // At this point, the user is alreay logged out so just hanlde expiring and revoking the token in the database
    @Override
    public void logout(
        HttpServletRequest request, 
        HttpServletResponse response, 
        Authentication authentication
    ) {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            throw new TokenNotFoundException("Access token not found in the auth header.");
        }
      
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

        if (isAccessTokenValidInDB ) {
            // Set the user status to OFFLINE
            userEmail = jwtService.extractUsername(jwt);
            var user = userRepository.findByEmail(userEmail)
                            .orElseThrow(() -> new UserNotFoundException("Invalid email."));
            user.setStatus(Status.OFFLINE);
            userRepository.save(user);

            // Expire and revoke current access and refresh token
            storedToken.setExpired(true);
            storedToken.setRevoked(true);

            // Update the db
            tokenRepository.save(storedToken);

            // Delete cookies
            deletedCookie("accessToken", response);
            deletedCookie("refreshToken", response);
        } else {
            throw new InvalidTokenException("Invalid or revoked token.");
        }
    
    }

    private void deletedCookie(String name, HttpServletResponse response ){
        Cookie deletedCookie = new Cookie(name, "");
        deletedCookie.setMaxAge(0);
        deletedCookie.setPath("/");
        deletedCookie.setSecure(true);
        response.addCookie(deletedCookie);
    }

    
}
