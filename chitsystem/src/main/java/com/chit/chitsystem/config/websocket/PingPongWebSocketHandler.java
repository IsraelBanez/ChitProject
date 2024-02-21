package com.chit.chitsystem.config.websocket;

import java.io.IOException;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;


public class PingPongWebSocketHandler extends TextWebSocketHandler  {

    private static final long PING_INTERVAL_SECONDS = 30;
    private static final long TIMEOUT_SECONDS = 35;

    private final ScheduledExecutorService executor = Executors.newSingleThreadScheduledExecutor();
    private volatile boolean pongReceived = false;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        super.afterConnectionEstablished(session);
        schedulePing(session);
        //scheduleTimeout(session);
        // MAybe use convertandsendtouser(Ping) || for server to client ping pong
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        if ("pong".equals(message.getPayload())) {
            pongReceived = true;
        }
    }

    private void schedulePing(WebSocketSession session) {
        executor.scheduleAtFixedRate(() -> {
            try {
                if (!pongReceived && session != null && session.isOpen()) {
                    synchronized (session) {
                        session.sendMessage(new TextMessage("ping"));
                    }
                }
                pongReceived = false;
            } catch (IOException e) {
                // Handle IOException
            }
        }, 0, PING_INTERVAL_SECONDS, TimeUnit.SECONDS);
    }

    private void scheduleTimeout(WebSocketSession session) {
        executor.schedule(() -> {
            if (!pongReceived) {
                try {
                    session.close(CloseStatus.SERVER_ERROR.withReason("Ping timeout"));
                } catch (IOException e) {
                    // Handle IOException
                }
            }
        }, TIMEOUT_SECONDS, TimeUnit.SECONDS);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        executor.shutdown();
        super.afterConnectionClosed(session, status);
    }
}