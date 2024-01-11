package com.chit.chitsystem.forgotpassword;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ForgotPasswordRequest {
    
    @Email(message = "Please provide a valid email address.")
    @NotBlank(message = "Please provide an email.")
    private String email;
}
