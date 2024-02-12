package com.chit.chitsystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;

import com.chit.chitsystem.entity.Token;
import com.chit.chitsystem.entity.User;
import com.chit.chitsystem.entity.enums.Status;
import com.chit.chitsystem.repository.TokenRepository;
import com.chit.chitsystem.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class WebSocketService {
    
    @Autowired
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final JWTService jwtService;

    // Check the status of ever access token
    public void checkTokenStatus() {
        List<Token> activeTokens = tokenRepository.findAllValidTokens();

        for (Token token : activeTokens) {
            if (isTokenApproachingHalfwayPoint(token)) {
                notifyClient(token.getUser());
            } else {
                String payload = "Token is still valid.";
                Message<String> message = MessageBuilder
                    .withPayload(payload)
                    .setHeader("tokenRefresh", false)
                    .build();
                messagingTemplate.convertAndSendToUser(
                    token.getUser().getUsername(),
                    "/specific/token-halfway-check",
                    message);
            }
        }
    }

    // Helper to calculate if the user's token has hit the halfway point
    private boolean isTokenApproachingHalfwayPoint(Token token) {
        // Get remaining time before expiration date in miliseconds
        final Long remainingTimeBeforeExpiration = jwtService.getExpirationToken(token.getAccessToken());
        // Set halfway time to 13 hours in milliseconds
        final Long halfWayTime = 46800000L;

        // Check to see if the remaining time is 13 hours or less
        // Note: Added the extra hour instead of 12 to allow for an hour of buffer time
        // for checks and searches
        // AKA: After 12 hours, if the token has lived for 11 hours or longer, we should
        // refresh it
        if (remainingTimeBeforeExpiration <= halfWayTime) {
            return true;
        }
        return false;
    }

    // Helper to notify client that the user has hit halfway point
    private void notifyClient(User user) {
        String payload = "Token is ready for refresh.";
        Message<String> message = MessageBuilder
            .withPayload(payload)
            .setHeader("tokenRefresh", true)
            .build();
        messagingTemplate.convertAndSendToUser(
            user.getUsername(),
            "/specific/token-halfway-check",
            message);
    }


    public void sendPingToUser(){
        List<User> onlineUsers = userRepository.findAllByStatus(Status.ONLINE);

        for (User user : onlineUsers) {
            String payload = "ping";
            Message<String> message = MessageBuilder
                .withPayload(payload)
                .build();
            messagingTemplate.convertAndSendToUser(
                user.getUsername(), 
                "/specific/ping", 
                "ping");
        }

    }
}
