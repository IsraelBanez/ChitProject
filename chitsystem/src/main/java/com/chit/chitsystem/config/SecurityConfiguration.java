package com.chit.chitsystem.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;

import com.chit.chitsystem.entity.enums.Role;
import com.chit.chitsystem.filter.JWTAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    @Autowired
    private final JWTAuthenticationFilter jwtAuthenticationFilter;
    private final UserDetailsService userDetailsService;
    private final LogoutHandler logoutHandler;

    // Authenticate users based on credentials via comparison with database using userDetailsService()
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider(); 
        authProvider.setUserDetailsService(userDetailsService); // Compares user details with database
        authProvider.setPasswordEncoder(passwordEncoder()); // Compares password with database
        return authProvider;
    }

    // Encodes passwords using BCrypt
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Overall provides an instance of auth manager which validate the credentials and determine the user's identity.
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    // Defines how requests are secured and authenticated 
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(request -> request // Authorization rules per path/request
                .requestMatchers(HttpMethod.POST, "/api/v1/auth/**", "/api/v1/forgot-password/**").permitAll()
                .requestMatchers(HttpMethod.PATCH, "/api/v1/forgot-password/reset-password/**").permitAll()
                .requestMatchers("/api/v1/admin/**").hasAnyAuthority(Role.ADMIN.name())
                .requestMatchers("/api/v1/user/**").hasAnyAuthority(Role.USER.name())
                .anyRequest().authenticated()
            )
            // Treat each request independently; the server will not create an HTTPSession or store any security info
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) 
            .authenticationProvider(authenticationProvider()) // Validate user credentials
            // Executes custom jwtAuthFilter before the form-based login filter
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
            .logout(logout ->
                logout.logoutUrl("/api/v1/auth/logout")
                    .addLogoutHandler(logoutHandler) // Logout clean up actions
                    .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext())) // Logout sucess actions
            ;


        return http.build();
    }
}
