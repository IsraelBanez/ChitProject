package com.chit.chitsystem.config.websocket;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class CustomeWebSocketHandler extends TextWebSocketHandler{


    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        
        // Send a welcome message to the client
        log.info("Connection with [ws-realtime] websocket is established.");  
    }
    
    // Handle incoming text messages for plain WebSocket endpoint
    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

        // Ping Pong mechanism to determine that connection between server and client exists
        if ("ping".equals(message.getPayload())) {
            // Respond with a pong message
            session.sendMessage(new TextMessage("pong"));
        }
    }

    
}
