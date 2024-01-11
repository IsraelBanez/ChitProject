package com.chit.chitsystem.dto.requests;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignInRequest {
    // Sign in request details

    @NotEmpty(message = "Email cannot be empty.")
    private String email;

    @NotEmpty(message = "Passsword cannot be empty.")
    private String password;
}
