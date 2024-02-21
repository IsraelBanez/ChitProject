package com.chit.chitsystem.config.websocket;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class PlainWebSocketHandler extends TextWebSocketHandler{
    
    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // Handle incoming text messages for plain WebSocket endpoint
        session.sendMessage(new TextMessage("ping"));
    }
}
