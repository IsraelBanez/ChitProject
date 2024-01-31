package com.chit.chitsystem.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chit.chitsystem.dto.requests.RefreshTokenRequest;
import com.chit.chitsystem.dto.requests.SignInRequest;
import com.chit.chitsystem.dto.requests.SignUpRequest;
import com.chit.chitsystem.dto.responses.JWTAuthenticationResponse;
import com.chit.chitsystem.service.AuthenticationService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(path = "api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") // Note: change to either http or https 
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    // Sign up new years with valid credentials into the system along with appropriate tokens
    @PostMapping("/sign-up")
    public ResponseEntity<?> signUpUser(
        @Valid @RequestBody SignUpRequest signUpRequest, 
        HttpServletRequest request, 
        HttpServletResponse response
    ) {
        return ResponseEntity.ok(authenticationService.signUpUser(signUpRequest, request, response));
    }

    // Sign in users with valid credentials
    @PostMapping("/sign-in")
    public ResponseEntity<JWTAuthenticationResponse> signInUser(
        @Valid @RequestBody SignInRequest signInRequest,
        HttpServletRequest request, 
        HttpServletResponse response
        ) {
        return ResponseEntity.ok(authenticationService.signInUser(signInRequest, request, response));
    }

    
    // TODO: automatic refresh token after 12 hours if the user is still logged in
    // a neww set of access and refresh token is made while recoking/ expuring the current access and refresh token
    // when a user logs out revoke both refresh and access tokens

    // Genereate new access and refresh tokens
    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(
        @Valid @RequestBody RefreshTokenRequest refreshTokenRequest,
        HttpServletRequest request, 
        HttpServletResponse response
    ) {
        try {
            JWTAuthenticationResponse newTokens = authenticationService.createRefreshToken(refreshTokenRequest, request, response);
            if (newTokens != null) {
                return ResponseEntity.ok(newTokens);
            } else {
                ProblemDetail errorDetail = ProblemDetail.forStatusAndDetail(HttpStatus.UNAUTHORIZED, "Invalid or expired refresh token.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorDetail);
            }
        } catch (Exception e) {
            // Handle other exceptions
            ProblemDetail errorDetail = ProblemDetail.forStatusAndDetail(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorDetail);
        }
    }

    // To check if a user is logged in 
    // Senarios: 1.) Someone is logged in
    //           2.) They are not logged in
    //           3.) Someone is logged in but the acces token is expired
    //           4.) Someone is logged in but the acces token is invalid or the user accosciated do not match
    @GetMapping("/whoami")
    public ResponseEntity<?> whoAmI(HttpServletRequest request){
        boolean isValidToken = authenticationService.whoAmI(request); 

        if (isValidToken) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No access token is present.");
        }
    }
}

// Keep all tokens for auditing but set up a clean up tokens every month 
//https://login.microsoftonline.com/common/oauth2/logout