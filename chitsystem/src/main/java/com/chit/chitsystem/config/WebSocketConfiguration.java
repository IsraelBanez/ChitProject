package com.chit.chitsystem.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.chit.chitsystem.config.websocket.CustomeWebSocketHandler;

@Configuration
@EnableWebSocket
public class WebSocketConfiguration implements WebSocketConfigurer{

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(new CustomeWebSocketHandler(), "/ws-realtime")
            .setAllowedOriginPatterns("*")
            .withSockJS();
        registry.addHandler(new CustomeWebSocketHandler(), "/ws-realtime")
            .setAllowedOriginPatterns("*");
    }
    
}
