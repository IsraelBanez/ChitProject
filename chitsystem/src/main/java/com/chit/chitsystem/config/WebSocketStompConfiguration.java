package com.chit.chitsystem.config;

import java.security.Principal;
import java.time.Duration;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketTransportRegistration;
import org.springframework.web.socket.handler.WebSocketHandlerDecoratorFactory;
import org.springframework.web.socket.server.HandshakeInterceptor;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import com.chit.chitsystem.config.websocket.PingPongWebSocketHandler;
import com.chit.chitsystem.exception.newexceptions.TokenNotFoundException;
import com.chit.chitsystem.service.JWTService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Configuration
@EnableWebSocketMessageBroker
@Order(Ordered.HIGHEST_PRECEDENCE + 99)
@RequiredArgsConstructor
@Slf4j
public class WebSocketStompConfiguration implements WebSocketMessageBrokerConfigurer {

    @Autowired
    private final JWTService jwtService;
    private final UserDetailsService userDetailsService;

    // Endpoint to connect to WebSocket server
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("http://localhost:3000")
                .setHandshakeHandler(handShakeHandler())
                .addInterceptors(httpSessionHandshakeInterceptor());
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("http://localhost:3000")
                .setHandshakeHandler(handShakeHandler())
                .addInterceptors(httpSessionHandshakeInterceptor())
                .withSockJS();

    }

    // Routes messages from clients
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // Sets prefix for methods bound with @MessageMapping to /app
        // (ie:the endpoints a client sends message/request to)
        config.setApplicationDestinationPrefixes("/app");
        config.setUserDestinationPrefix("/user");
        // Enables a messages broker for clients to subscribe to
        // (ie: the endpoint that a server sends a message/response to which the client
        // can subscribe to receive the message/response)
        config.enableSimpleBroker("/all", "/specific", "/queue");

    }

    // Handles tasks before and after the WebSocket handshake; if successful the
    // client and server can exchange messages.
    // Also, extracts the auth toke from cookie and validates it. If valid, it will
    // be added to the attributes
    @Bean
    public HandshakeInterceptor httpSessionHandshakeInterceptor() {
        return new HandshakeInterceptor() {

            @Override
            public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response,
                    WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
                if (request instanceof ServletServerHttpRequest) {
                    ServletServerHttpRequest servletServerRequest = (ServletServerHttpRequest) request;
                    HttpServletRequest servletRequest = servletServerRequest.getServletRequest();
                    String accessToken = null;
                    Cookie[] cookies = servletRequest.getCookies();

                    if (cookies != null) {
                        for (Cookie cookie : cookies) {
                            if (cookie.getName().equals("accessToken")) {
                                accessToken = cookie.getValue();
                            }
                        }
                    }

                    Boolean isTokenVerified = jwtService.isTokenAuthorized(accessToken, "accessToken");

                    if (isTokenVerified) {
                        attributes.put("accessToken", accessToken);
                    } else {
                        throw new TokenNotFoundException("Invalid Token: token is null or empty.");
                    }
                }
                return true;
            }

            @Override
            public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response,
                    WebSocketHandler wsHandler,
                    Exception exception) {
            }
        };
    }

    // Extracts the auth token from the attributes and further extracts the
    // userdetails from the token to
    // use as the Principal to represent the user
    @Bean
    public DefaultHandshakeHandler handShakeHandler() {
        return new DefaultHandshakeHandler() {

            @Override
            public Principal determineUser(ServerHttpRequest request, WebSocketHandler wsHandler,
                    Map<String, Object> attributes) {
                String accessToken = (String) attributes.get("accessToken");
                if (accessToken != null) {
                    String userEmail = jwtService.extractUsername(accessToken);
                    UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);
                    return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                } else {
                    throw new TokenNotFoundException("Invalid Token: token not found in the attributes.");
                }
            }
        };
    }

    // Validates every incoming connect message on the client-side of the WebSocket
    // communication. Make sure auth token is still valid during communication (not
    // expired or revoked)
    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(new ChannelInterceptor() {

            // Intercept messages from the client to server before they are processed
            // further by the server
            @Override
            public Message<?> preSend(Message<?> message, MessageChannel channel) {
                StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
                // Uncomment for testing
                // log.info("PreSend Message Header");
                // log.info("Command: {}", accessor.getCommand());
                // log.info("Destination: {}", accessor.getDestination());
                // log.info("Session ID: {}", accessor.getSessionId());
                // log.info("Subscription ID: {}", accessor.getSubscriptionId());
                // log.info("Username: {}", accessor.getUser().getName());
                // log.info("Attributes: {} ", accessor.getSessionAttributes().values());
                // log.info("Header: {}", accessor.toNativeHeaderMap());

                if (StompCommand.CONNECT.equals(accessor.getCommand())
                        || StompCommand.SUBSCRIBE.equals(accessor.getCommand())) {

                    String accessToken = (String) accessor.getSessionAttributes().get("accessToken");
                    Boolean isTokenVerified = jwtService.isTokenAuthorized(accessToken, "accessToken");

                    if (isTokenVerified) {
                        // String userEmail = jwtService.extractUsername(accessToken);
                        // UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);
                        // UsernamePasswordAuthenticationToken auth = new
                        // UsernamePasswordAuthenticationToken(userDetails, null,
                        // userDetails.getAuthorities());
                        // accessor.setSessionId(jwtService.extractUsername(accessToken));
                        // accessor.setUser(auth);
                        // accessor.setLeaveMutable(true);

                    } else {
                        StompHeaderAccessor errorHeader = StompHeaderAccessor.create(StompCommand.ERROR);
                        errorHeader.setMessage("Invalid token.");
                        errorHeader.setSessionId(accessor.getSessionId());
                        Message<byte[]> errorMessage = MessageBuilder.createMessage(new byte[0],
                                errorHeader.getMessageHeaders());
                        return errorMessage;
                        // TODO: Handle no tokens; should I disconnect them from the websocket
                        // Or try reconnecting them or check if token expired and if so update the auth
                        // token
                    }
                }
                return message;
            }

            @Override
            public void postSend(Message<?> message, MessageChannel channel, boolean sent) {
                // Uncomment for testing
                // StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
                // log.info("PostSend Message Header");
                // log.info("Command: {}", accessor.getCommand());
                // log.info("Destination: {}", accessor.getDestination());
                // log.info("Session ID: {}", accessor.getSessionId());
                // log.info("Subscription ID: {}", accessor.getSubscriptionId());
                // log.info("Username: {}", accessor.getUser().getName());
                // log.info("Attributes: {} ", accessor.getSessionAttributes().values());
                // log.info("Header: {}", accessor.toNativeHeaderMap());
            }

        });
    }

}
