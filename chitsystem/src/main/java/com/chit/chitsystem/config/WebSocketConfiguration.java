package com.chit.chitsystem.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.chit.chitsystem.config.websocket.PlainWebSocketHandler;

@Configuration
@EnableWebSocket
public class WebSocketConfiguration implements WebSocketConfigurer{

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(new PlainWebSocketHandler(), "/wbsk")
            .setAllowedOriginPatterns("http://localhost:3000")
            .withSockJS();
        registry.addHandler(new PlainWebSocketHandler(), "/wbsk")
            .setAllowedOriginPatterns("http://localhost:3000");
    }
    
}
