package com.chit.chitsystem.forgotpassword;

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
public class PasswordResetRequest {

    @NotEmpty(message = "New passsword cannot be empty.")
    @Size(min = 10, message = "Passsword must be at least 10 characters")
    @Pattern(regexp = ".*[A-Z].*", message = "Password must contain an uppercase letter")
    @Pattern(regexp = ".*[a-z].*", message = "Password must contain a lowercase letter")
    @Pattern(regexp = ".*\\d.*", message = "Password must contain a digit")
    @Pattern(regexp = ".*[@#$%^&+=!].*", message = "Password must contain a special character")
    private String newPassword;

    @NotEmpty(message = "Confirm passsword cannot be empty.")
    private String confirmNewPassword;
}
