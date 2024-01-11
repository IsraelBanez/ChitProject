package com.chit.chitsystem.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chit.chitsystem.dto.requests.ChangePasswordRequest;
import com.chit.chitsystem.exception.newexceptions.ChangePasswordException;
import com.chit.chitsystem.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(path = "api/v1/user")
@RequiredArgsConstructor
@CrossOrigin
public class UserController{

    @Autowired
    private final UserService userService;

    @GetMapping
    public ResponseEntity<String> adminsEndPoint() {
        return ResponseEntity.ok("ONLY users can see this");
    }  

    @PatchMapping
    public ResponseEntity<?> changePassword(@Valid @RequestBody ChangePasswordRequest request, Principal connectedUser){
        try{
            userService.changePassword(request, connectedUser);
            return ResponseEntity.ok().build();
        } catch(ChangePasswordException e){
            ProblemDetail errorDetail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, e.getMessage());
            return ResponseEntity.badRequest().body(errorDetail);
        }

    }

    // // Get all users from the system
    // @GetMapping("/users")
    // public ResponseEntity<List<User>> getAllUsers(){
    //     List<User> allUsers = userService.getAllUsers();
    //     return ResponseEntity.status(HttpStatus.OK).body(allUsers);
    
    // }

}