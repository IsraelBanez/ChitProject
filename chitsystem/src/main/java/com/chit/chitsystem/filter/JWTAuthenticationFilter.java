package com.chit.chitsystem.filter;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import com.chit.chitsystem.repository.TokenRepository;
import com.chit.chitsystem.service.JWTService;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;
import io.micrometer.common.util.StringUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class JWTAuthenticationFilter extends OncePerRequestFilter{

    @Autowired
    private final JWTService jwtService;
    private final UserDetailsService userDetailService;
    private final HandlerExceptionResolver handlerExceptionResolver;
    private final TokenRepository tokenRepository;
    
    // Processes a JW access token
    // TODO: catch invalid tokens like using refresh token
    @Override
    protected void doFilterInternal(
        @NotNull HttpServletRequest request, 
        @NotNull HttpServletResponse response, 
        @NotNull FilterChain filterChain)
        throws ServletException, IOException 
        {
        
        try {
            final String authHeader = request.getHeader("Authorization");
            final String jwt;
            final String userEmail;

            // Check if AuthHeader is not null (only if a token exists) and formatted correctly, else continue
            log.info("AuthHeader is = {}", authHeader);
            if(authHeader == null || authHeader.isEmpty() || !authHeader.startsWith("Bearer ")){
                filterChain.doFilter(request, response);
                return;
            }
            
            jwt = authHeader.substring(7);
            userEmail = jwtService.extractUsername(jwt); // Grab email from token

            // Check if user exist and verifies whether there is currently no authenticated user in the security context. 
            // If so, we authenticate the user
            if(userEmail != null && StringUtils.isNotEmpty(userEmail) && SecurityContextHolder.getContext().getAuthentication() == null){
                UserDetails userDetails = this.userDetailService.loadUserByUsername(userEmail); // load user detail based on email

                var isTokenValidInDB = tokenRepository.findByAccessToken(jwt) // Grab token from db and make sure it isn't expired or revoked
                    .map(t -> !t.isExpired() && !t.isRevoked())
                    .orElse(false);
                
                // Check if token is valid for the given user details and valid in the db
                if(jwtService.isTokenValid(jwt, userDetails) && isTokenValidInDB){

                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                    ); // Create auth token based on user details and authorities

                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request)); // Set auth details for current request

                    SecurityContextHolder.getContext().setAuthentication(authToken); // Creates new security context with auth token
                } else{
                    log.error("[JWTAuthenticationFilter] - Invalid or revoked token." ); // TODO: Audit the logs for expired/revoked tokens
                    
                }
            }
            filterChain.doFilter(request, response);

        } catch(SignatureException | ExpiredJwtException | MalformedJwtException  e){
            handlerExceptionResolver.resolveException(request, response, null, e); 
        }
    }
    
}
