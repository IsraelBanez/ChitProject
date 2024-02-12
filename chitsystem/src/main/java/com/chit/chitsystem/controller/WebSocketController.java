package com.chit.chitsystem.controller;

import java.security.Principal;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
public class WebSocketController {
    

    // To keep track of user activity using ping pong heartbeats
    @MessageMapping("/pong")
    public void handlePongMessage(Principal principal, @Payload String message) {
        log.info("Received pong message: {}", message);
        
    }
}
