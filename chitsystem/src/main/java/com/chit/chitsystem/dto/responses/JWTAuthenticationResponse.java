package com.chit.chitsystem.dto.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JWTAuthenticationResponse {
    // What the user gets after successful authentication (response)

    private String accessToken;

    private String refreshToken;
}
