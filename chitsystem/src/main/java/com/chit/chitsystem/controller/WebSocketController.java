package com.chit.chitsystem.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.RestController;

import com.chit.chitsystem.service.WebSocketService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
public class WebSocketController {
    
    @Autowired
    private final WebSocketService webSocketService;
    
    // To keep track of user activity using ping pong 
    @MessageMapping("/ping")
    public void handlePingMessage(Principal principal, @Payload String message) {
        log.info("Received ping message: {}", message);
        webSocketService.sendPongToUser(principal);
    }
}
