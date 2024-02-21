package com.chit.chitsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ChitsystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChitsystemApplication.class, args);
	}

	// *Summary*
	// To Be Continued: Keep developing mutiple websockets for ping pong, one for messages, and others 
	// TODO: eventually make everything https and wss

}
