package com.chit.chitsystem.data;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.chit.chitsystem.entity.User;
import com.chit.chitsystem.entity.enums.Role;
import com.chit.chitsystem.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AdminData implements CommandLineRunner {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        
        if (userRepository.count() == 0) {
            User admin = User
                      .builder()
                      .userName("admin#NA1")
                      .fullName("the admin")
                      .email("admin@admin.com")
                      .password(passwordEncoder.encode("#Password3202@ForgetMe"))
                      .role(Role.ADMIN)
                      .build();
            userRepository.save(admin);
        }
    }
}
