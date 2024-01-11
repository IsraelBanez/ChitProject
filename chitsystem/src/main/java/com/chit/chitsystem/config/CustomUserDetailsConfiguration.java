package com.chit.chitsystem.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.chit.chitsystem.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class CustomUserDetailsConfiguration {
    
    @Autowired
    private final UserRepository repository;

    // Get user details by email (username) from database (implements loadUserByUsername)
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> repository.findByEmail(username)
            .orElseThrow(() -> new UsernameNotFoundException("[ApplicationConfig] - User not found"));
    }
}
