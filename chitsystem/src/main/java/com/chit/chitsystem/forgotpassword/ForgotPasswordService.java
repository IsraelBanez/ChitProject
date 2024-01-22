package com.chit.chitsystem.forgotpassword;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.chit.chitsystem.entity.User;
import com.chit.chitsystem.entity.enums.TokenType;
import com.chit.chitsystem.exception.newexceptions.ChangePasswordException;
import com.chit.chitsystem.exception.newexceptions.InvalidTokenException;
import com.chit.chitsystem.exception.newexceptions.UserNotFoundException;
import com.chit.chitsystem.repository.UserRepository;
import com.chit.chitsystem.service.EmailService;
import com.chit.chitsystem.service.JWTService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ForgotPasswordService {

    @Autowired
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final UserRepository userRepository; 
    private final JWTService jwtService; 
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    // Verify that the email is valid, then send an email with the token link to reset password
    public void verifyForgotPasswordEmail(ForgotPasswordRequest request) {
        try{
            // Validate the email
            var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UserNotFoundException("User with provided email is not found."));
            
            // Genereate the reset token
            var jwt = jwtService.generatePasswordResetToken(user);

            // Buid the reset token
            var resetToken = PasswordResetToken.builder()
                .user(user)
                .token(jwt)
                .tokenType(TokenType.BEARER)
                .revoked(false)
                .build();

            // Revoke all reset tokens from the user prior to this current request
            revokeAllUserResetTokens(user);
            // Store the reset token
            passwordResetTokenRepository.save(resetToken);

            // Send the email with the reset token
            String resetLink = "http://localhost:8080/api/v1/forgot-password/reset-password?token=" + jwt;
            String subject = "Password Reset";
            emailService.sendPasswordResetEmail(user.getEmail(), subject, resetLink);
        } catch (Exception e) {
            log.error("[ForgotPasswordService] - Error verifying email.", e);
            throw e;
        }
    }

    // Verify the token, password, and user associated is valid and update the db
    public void resetPassword(String resetToken, PasswordResetRequest request){
        try {
            final String userEmail;
            if (resetToken == null || resetToken.isEmpty()) {
                throw new IllegalArgumentException("Reset token cannot be null or empty.");
            }

            // Verify that the new passwords match each other
            if (!request.getNewPassword().equals(request.getConfirmNewPassword())) {
                throw new ChangePasswordException("New passwords do not match.");
            }

            // Verify email exists for given token in db
            userEmail = jwtService.extractUsername(resetToken);
            
            if (userEmail != null){
                // Verify the associated email for the reset token is valid
                var user = userRepository.findByEmail(userEmail) 
                    .orElseThrow(() -> new UserNotFoundException("User not found for reset token."));

                // Verify token exists in db and isn't revoked
                boolean isResetTokenValidInDB = passwordResetTokenRepository.findByToken(resetToken)
                    .map(t -> !t.isRevoked())
                    .orElse(false);
                
                // Verify token isn't expired
                if (jwtService.isTokenValid(resetToken, user) && isResetTokenValidInDB) {

                    // Verify that this new passwords isn't the same as the old passwords
                    if (passwordEncoder.matches(request.getNewPassword(), user.getPassword())){
                        throw new ChangePasswordException("New password cannot be the same as old passwords.");
                    } 

                    // Update the password to the new password
                    user.setPassword(passwordEncoder.encode(request.getNewPassword()));
                    
                    // Save the changes
                    userRepository.save(user);

                    // Revoke the reset token immediately after all is done
                    revokeAllUserResetTokens(user);
                } else{
                    throw new InvalidTokenException("Invalid or revoked token.");
                }
            }
        } catch (Exception e) {
            log.error("[ForgotPasswordService] - Error verfiying reset token.", e);
            throw e;
        }
    }

    // Revoke user reset tokens
    // For example: user asks to resend link, creating mutiple tokens, revoke the old ones immediately instead of 
    // waiting for expiration time 
    private void revokeAllUserResetTokens(User user) {
        var validUserTokens = passwordResetTokenRepository.findAllValidResetTokenByUser(user.getId());

        if (validUserTokens.isEmpty()){
            return;
        }

        // Update each token
        validUserTokens.forEach(token -> {
            token.setRevoked(true);
        });

        // Store the reset tokens
        passwordResetTokenRepository.saveAll(validUserTokens);
    }

}
