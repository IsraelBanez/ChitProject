package com.chit.chitsystem.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.chit.chitsystem.service.WebSocketService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class WebSocketSchedulers {
 
    @Autowired
    private final WebSocketService webSocketService;

    //Globally check the status of all the access tokens every 12 hours to manage expiration
    @Scheduled(fixedRate = 12 * 60 * 60 * 1000)
    public void tokenStatusScheduler(){
        log.info("Token Status Scheduler Started...");
        webSocketService.checkTokenStatus();
        log.info("...Token Status Scheduler Finished.");
    }

    // Send ping every 30 seconds to the client
    // Eventially override handleTextMessage to make the messages just be ping instead of all the headers
    @Scheduled(fixedRate = 30000) 
    public void pingPongScheduler() {
        webSocketService.sendPingToUser();
    }
}
