import SockJS from 'sockjs-client';
import { Stomp  } from '@stomp/stompjs';


// -------------------Constants ---------------------
const SOCKET_URL_SOCKJS = 'http://localhost:8080/ws';

let reconnectAttempts = 0;
const maxReconnectionAttempts = 5;
const reconnectInterval = 1000;

let stompClient =  null;

let pingInterval;
let pingTimeout;

// -------------------Functions ---------------------

// Establish connection to websocket
const connectSocket = () => {
    return new Promise((resolve, reject) => {
        const socket = new SockJS(SOCKET_URL_SOCKJS);
        stompClient = Stomp.over(() => socket);
        stompClient.connect({}, () => {
            console.log("Connected to WebSocket.");

            // Reset reconnect attempts on success
            reconnectAttempts = 0;
            
            resolve(); // Resolve the promise when connected
        },
        (error) => {
            console.error('Error connecting to WebSocket:', error);
            if (reconnectAttempts < maxReconnectionAttempts) {
                // Exponential backoff
                const delay = Math.pow(2, reconnectAttempts) * reconnectInterval; 

                // Attempt to reconnect
                setTimeout(() => connectSocket().then(resolve).catch(reject), delay);
                reconnectAttempts++;
            } else {
                // Reached max allowed reconnects so disconnect the socket
                console.error("Maximum reconnect attempts reached. Disconnecting websocket.");
                reject("Maximum reconnect attempts reached.");
            }
        });

        // Handle unexpected disconnects
        socket.onclose = (event) => {
            console.error("WebSocket connection closed unexpectedly:", event);
            // Attempt to reconnect
            setTimeout(() => connectSocket().catch(console.error), reconnectInterval);
        };
    });
};

// Disconnect the client connection
const disconnectSocket = () => {
    if (stompClient && stompClient.connected) {
        clearInterval(pingInterval);
        clearTimeout(pingTimeout);
        stompClient.disconnect(() => {
            console.log("Disconnected from WebSocket.");
        },
        (error) => {
            console.error("Error disconnecting from WebSocket:", error);
        });
    } else {
        console.error("Invalid client connection for disconnect.")
    }
};

// Check if there is a websocket connection
const isWebSocketConnected = () => {
    return stompClient && stompClient.connected;
};

// Check if the available toke is about to expire
const tokenHalfWayCheck = (tokenRefreshCallbackFunction) => { 
    if (stompClient && stompClient.connected){
        const destination = '/user/specific/token-halfway-check';
        stompClient.subscribe(destination, function(message) {
            const parsedMessage = JSON.parse(message.body);
            const tokenRefreshStatus = parsedMessage.headers['tokenRefresh'];

            if (tokenRefreshStatus === true) {
                console.log("Token detected to be expiring.")
                tokenRefreshCallbackFunction(true);
            }
        },
        (error) => {
            console.error("Error subscribing to halfway check:", error);
        });
    } else {
        console.error("Invalid client connection for halfway check:" + stompClient + stompClient.connected);
    }
};

// Keep a heart beat pattern to indicate that the user is active
const pingPongMechanism = () => {
    if (stompClient && stompClient.connected){
        const subDestination = '/user/specific/pong';

        // Establish server communication to receive pong messages 
        stompClient.subscribe(subDestination, function(message) {
            const parsedMessage = message.body;
            console.log("Server replied:", parsedMessage);
            
            // Once pong is received, remove timeout to be reset in sendPing()
            clearTimeout(pingTimeout);
        }, 
        (error) => {
            console.error("Error subscribing to ping pong mechanism:", error);
        });

        // Intialize pings to be sent at 10 second intervals
        pingInterval = setInterval(sendPing, 10000);
        sendPing();
    } else {
        console.error("Invalid client connection for ping pong mechanism.");
    }
};
// Send ping to server and start timer
const sendPing = () => {
    stompClient.send('/app/ping', {}, "ping");

    // After sending ping, set a timer to make sure a pong is received within a set time
    // else we can assume that the server connection is unstable or severed
    pingTimeout = setTimeout(() => {
        console.log("Pong not received within timeout");
    }, 30000);
};

export { connectSocket, disconnectSocket, isWebSocketConnected, tokenHalfWayCheck, pingPongMechanism };