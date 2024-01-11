package com.chit.chitsystem.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chit.chitsystem.dto.requests.RefreshTokenRequest;
import com.chit.chitsystem.dto.requests.SignInRequest;
import com.chit.chitsystem.dto.requests.SignUpRequest;
import com.chit.chitsystem.dto.responses.JWTAuthenticationResponse;
import com.chit.chitsystem.exception.newexceptions.InvalidTokenException;
import com.chit.chitsystem.service.AuthenticationService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(path = "api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    // Sign up new years with valid credentials into the system along with appropriate tokens
    @PostMapping("/sign-up")
    public ResponseEntity<?> signUpUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        return ResponseEntity.ok(authenticationService.signUpUser(signUpRequest));
    }

    // Sign in users with valid credentials
    @PostMapping("/sign-in")
    public ResponseEntity<JWTAuthenticationResponse> signInUser(@Valid @RequestBody SignInRequest signInRequest) {
        return ResponseEntity.ok(authenticationService.signInUser(signInRequest));
    }

    
    // TODO: automatic refresh token after 12 hours if the user is still logged in
    // a neww set of access and refresh token is made while recoking/ expuring the current access and refresh token
    // when a user logs out revoke both refresh and access tokens

    // Genereate new access and refresh tokens
    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@Valid @RequestBody RefreshTokenRequest refreshTokenRequest) {
        try {
            JWTAuthenticationResponse newTokens = authenticationService.createRefreshToken(refreshTokenRequest);
            if (newTokens != null) {
                return ResponseEntity.ok(newTokens);
            } else {
                ProblemDetail errorDetail = ProblemDetail.forStatusAndDetail(HttpStatus.UNAUTHORIZED, "Invalid or expired refresh token.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorDetail);
            }
        } catch (InvalidTokenException e) {
            ProblemDetail errorDetail = ProblemDetail.forStatusAndDetail(HttpStatus.UNAUTHORIZED, e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorDetail);  
        } catch (IllegalArgumentException e) {
            ProblemDetail errorDetail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorDetail); 
        } catch (Exception e) {
            // Handle other exceptions
            ProblemDetail errorDetail = ProblemDetail.forStatusAndDetail(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorDetail);
        }
    }
}

// Keep all tokens for auditing but set up a clean up tokens every month 
//https://login.microsoftonline.com/common/oauth2/logout