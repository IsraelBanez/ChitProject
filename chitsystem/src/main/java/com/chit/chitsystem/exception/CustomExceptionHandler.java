package com.chit.chitsystem.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.validation.FieldError;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.chit.chitsystem.exception.newexceptions.DuplicateUserException;
import com.chit.chitsystem.exception.newexceptions.InvalidTokenException;
import com.chit.chitsystem.exception.newexceptions.TokenNotFoundException;
import com.chit.chitsystem.exception.newexceptions.UserNotFoundException;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;

@RestControllerAdvice
public class CustomExceptionHandler {
    // Global Exception Handling for generic exceptions

    // Handle Validation exceptions as map for requests
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(org.springframework.http.HttpStatus.BAD_REQUEST)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return ResponseEntity.badRequest().body(errors);
    }

    // Handle exceptions relating to bad credentials provided by the user when signing in or signing up
    @ExceptionHandler({
        ConstraintViolationException.class, 
        BadCredentialsException.class
    })
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ProblemDetail handleCredentialException(Exception exception) {
        ProblemDetail errorDetail = null;

        // Sign up error
        if (exception instanceof ConstraintViolationException) {
            ConstraintViolationException constraintViolationException = (ConstraintViolationException) exception;
            StringBuilder messageBuilder = new StringBuilder();

            for (ConstraintViolation<?> violation : constraintViolationException.getConstraintViolations()) {
                messageBuilder.append(violation.getMessage()).append("\n");
            }

            String errorMessage = messageBuilder.toString().trim();
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatus.UNAUTHORIZED, errorMessage);
        }

        // Sign in error
        if (exception instanceof BadCredentialsException) {
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatus.UNAUTHORIZED, exception.getMessage());
        
        }

        return errorDetail;
    }

    // Handle exceptions relating to user's trying to create an account that already exists
    @ExceptionHandler(DuplicateUserException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ProblemDetail handleDuplicateUserException(Exception exception) {
        ProblemDetail errorDetail = null;

        if (exception instanceof DuplicateUserException) {
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, exception.getMessage());
        
        }

        return errorDetail;
    }

    // Handle exceptions when a JW toke trying to be used but it is expired or revoked in the database
    @ExceptionHandler(InvalidTokenException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ProblemDetail handleInvalidTokenException(Exception exception) {
        ProblemDetail errorDetail = null;

        if (exception instanceof InvalidTokenException) {
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatus.UNAUTHORIZED, exception.getMessage());
        
        }

        return errorDetail;
    }

    // JW Token related exceptions when filtering
    @ExceptionHandler({
        AccessDeniedException.class, 
        SignatureException.class, 
        ExpiredJwtException.class, 
        MalformedJwtException.class,
    })
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ProblemDetail handleAuthorityException(Exception exception) {
        ProblemDetail errorDetail = null;

        // When a user tries to access something they have no authority in like a page
        if (exception instanceof AccessDeniedException) {
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN, exception.getMessage());
        }

        // When the JWT signature is invalid
        if (exception instanceof SignatureException) {
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN, exception.getMessage());
        }

        // When the JW token is expired
        if (exception instanceof ExpiredJwtException) {
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN, exception.getMessage());
        }

        // When the JW token is formatted incorrectly
        if (exception instanceof MalformedJwtException) {
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN, exception.getMessage());
        }

        return errorDetail;
    }

    // Handle exceptions when credentials are missing from the database
    @ExceptionHandler({
        UserNotFoundException.class, 
        TokenNotFoundException.class
    })
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ProblemDetail handleMissingCredentialsException(Exception exception) {
        ProblemDetail errorDetail = null;

        if (exception instanceof UserNotFoundException) {
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, exception.getMessage());
        }

        if (exception instanceof TokenNotFoundException) {
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, exception.getMessage());
        }
        
        return errorDetail;
    }
    

}


