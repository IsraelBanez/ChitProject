package com.chit.chitsystem.dto.requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignUpRequest {
    // Sign up request details

    @NotEmpty(message = "Full name cannot be empty.")
    private String fullName;

    @NotEmpty(message = "Username cannot be empty.")
    private String userName;

    @NotEmpty(message = "Email cannot be empty.")
    @Email(message = "Email must be a valid email address.")
    private String email;

    @NotEmpty(message = "Passsword cannot be empty.")
    @Size(min = 10, message = "Passsword must be at least 10 characters")
    @Pattern(regexp = ".*[A-Z].*", message = "Password must contain an uppercase letter")
    @Pattern(regexp = ".*[a-z].*", message = "Password must contain a lowercase letter")
    @Pattern(regexp = ".*\\d.*", message = "Password must contain a digit")
    @Pattern(regexp = ".*[@#$%^&+=!].*", message = "Password must contain a special character")
    private String password;
}
