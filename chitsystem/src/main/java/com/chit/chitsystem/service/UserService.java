package com.chit.chitsystem.service;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.chit.chitsystem.dto.requests.ChangePasswordRequest;
import com.chit.chitsystem.entity.User;
import com.chit.chitsystem.exception.newexceptions.ChangePasswordException;
import com.chit.chitsystem.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    @Autowired
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // Verify the new changes are valid and update the db with the new password
    public void changePassword(ChangePasswordRequest request, Principal connectedUser) {
        try {
            // Extracts the authenticated user (User) from the Principal associated with the current authentication token 
            var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

            // Verify that the current password matches the password associated with the user
            if(!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
                throw new ChangePasswordException("Current password does not match.");
            }

            // Verify that the new passwords match each other
            if (!request.getNewPassword().equals(request.getConfirmNewPassword())) {
                throw new ChangePasswordException("New passwords do not match.");
            }

            // Verify that this new passwords isnt the same as the old passwords
            if (request.getNewPassword().equals(request.getCurrentPassword())){
                throw new ChangePasswordException("New password cannot be the same as old passwords.");
            }

            // Update the password to the new password
            user.setPassword(passwordEncoder.encode(request.getNewPassword()));

            // Save the changes
            userRepository.save(user);
        } catch (Exception e) {
            log.error("[UserService] - Error changing password.", e);
            throw e;
        }
    }

    
}
