package com.chit.chitsystem.service;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

// For generating and validating tokens
@Service
public class JWTService {
   
    // Generated via [node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"] 
    @Value("${token.secret-key}")
    private String secretKey;

    @Value("${token.expiration}")
    private Long expirationToken;
    
    @Value("${token.refresh-expiration}")
    private Long refreshExpirationToken;

    @Value("${token.reset-expiration}")
    private Long resetExpirationToken;

    // Extract user email from the token
    public String extractUsername(String token){
        return extractClaim(token, Claims::getSubject);
    }

    // Extract specific claim from the token of varying type
    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    
    // Verifies and parses the JWToken, extracting the payload (contains user info)
    private Claims extractAllClaims(String token) {
        return Jwts
            .parser()
            .verifyWith(getSignInKey())
            .build()
            .parseSignedClaims(token)
            .getPayload();
    }
 
    // Decode and develope an HmacSHA key
    private SecretKey getSignInKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    // Generate tokens without extra claims; maintain default 
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    // Generate tokens with extra claims; addition custome values
    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return buildToken(extraClaims, userDetails, expirationToken);
    }

    // Generate refresh token without extra claims
    public String generateRefreshToken(UserDetails userDetails) {
        return buildToken(new HashMap<>(), userDetails, refreshExpirationToken);
    }

    // Generate forgot password reset token without extra claims
    public String generatePasswordResetToken(UserDetails userDetails) {
        return buildToken(new HashMap<>(), userDetails, resetExpirationToken);
    }

    // Constructs the JWT based on email, claims, expiration, and key signature 
    private String buildToken(Map<String, Object> extraClaims, UserDetails userDetails, Long expiration){

        return Jwts.builder()
            .claims(extraClaims)
            .subject(userDetails.getUsername()) // set unique identifier of JWT to email
            .issuedAt(new Date(System.currentTimeMillis()))
            .expiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(getSignInKey(), Jwts.SIG.HS256)
            .compact();
    }

    // Verify that the username(email) from the token matches the username of the target user
    // Also verify that the token is not expired
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    // Compares the expiration date of the toke and the current date to see if it is before the current date
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date()); 
    }

    // Extracts the expiration date from the token
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
}