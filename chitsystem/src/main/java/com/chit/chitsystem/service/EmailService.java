package com.chit.chitsystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {
    
    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String senderEmail;    

    // Send email regarding password reset
    public void sendPasswordResetEmail(String toEmail, String subject, String link) {
        try {
            String emailBody= "We recevied a request to reset the password for you account\n" + "\n" +
            "To reset your password click the provided link:\n" + link + "\n" +
            "Thank you, \n" + "The Chit Team";
            
            // Build email
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(senderEmail);
            message.setTo(toEmail);
            message.setSubject(subject);
            message.setText(emailBody);

            javaMailSender.send(message);  
            log.info("[EmailService] - Mail sent successfully!");
        } catch (MailException ex) {
            log.error("[EmailService] - Error sending email.", ex.getMessage());
            throw new RuntimeException(ex);
        }
    }
}
