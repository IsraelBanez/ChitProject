package com.chit.chitsystem.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.chit.chitsystem.service.AuthenticationService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class TokenStatusScheduler {

    // @Autowired
    // private final AuthenticationService authenticationService;

    // //Globally check the status of all the access tokens every 12 hours to manage expiration
    // @Scheduled(fixedRate = 12 * 60 * 60 * 1000) 
    // public void checkTokenStatus(){
    //     log.info("Token Status Scheduler Started...");
    //     authenticationService.checkTokenStatus();
    //     log.info("...Token Status Scheduler Finished.");
    // }

}
