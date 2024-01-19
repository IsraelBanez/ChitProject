package com.chit.chitsystem.forgotpassword;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.chit.chitsystem.exception.newexceptions.ChangePasswordException;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(path = "api/v1/forgot-password")
@RequiredArgsConstructor
@CrossOrigin
public class ForgotPasswordController {
    
    @Autowired
    private final ForgotPasswordService forgotPasswordService;

    // Send email with reset token to valid user email for forgot password 
    @PostMapping
    public ResponseEntity<?> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request){
        forgotPasswordService.verifyForgotPasswordEmail(request);
        return ResponseEntity.ok("Password reset email sent successfully.");
    }

    // Reset password of user
    @PatchMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam("token") String resetToken, @Valid @RequestBody PasswordResetRequest request){
        try {
            forgotPasswordService.resetPassword(resetToken, request);
            return ResponseEntity.ok("Password reset successfully.");
        } catch (ChangePasswordException e) {
            ProblemDetail errorDetail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, e.getMessage());
            return ResponseEntity.badRequest().body(errorDetail);
        } catch (IllegalArgumentException e) {
            ProblemDetail errorDetail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, e.getMessage());
            return ResponseEntity.badRequest().body(errorDetail);
        }
    }


}
