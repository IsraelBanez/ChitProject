package com.chit.chitsystem.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(path = "api/v1/admin")
@RequiredArgsConstructor
public class AdminController {

    @GetMapping()
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> adminsEndPoint() {
        return ResponseEntity.ok("ONLY admins can see this");
    }  
}
