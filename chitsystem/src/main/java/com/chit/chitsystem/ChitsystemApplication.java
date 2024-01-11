package com.chit.chitsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ChitsystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChitsystemApplication.class, args);
	}

	// *Summary*
	// 1:10:2024 || break notes 
	// Resolve : I have decided to use both a global exception handler (CustomExceptionHandler) and 
	//           allowed for local exceptions.
	// Exception Format: - log errors and throw exceptions in services and other files
	//       		     - catch exceptions in controllers or custom handler exceptions
	// To Be Continued: Logout catch errors | trigger a refresh token | tidy up exceptions 
	//                  | know when a user is still active | tidy up folder namings and arrangment

}
