import SockJS from 'sockjs-client';
import { Stomp  } from '@stomp/stompjs';


// -------------------Constants ---------------------
const SOCKET_URL_SOCKJS = 'http://localhost:8080/ws';

let reconnectAttempts = 0;
const maxReconnectionAttempts = 5;
const reconnectInterval = 1000;

let stompClient =  null;

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
    });
};

// Disconnect the client connection
const disconnectSocket = () => {
    if (stompClient && stompClient.connected) {
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
            const payload = parsedMessage.payload;
            const tokenRefreshStatus = parsedMessage.headers['tokenRefresh'];

            console.log("Received token halfway check:", payload);
            console.log("Token refresh status:", tokenRefreshStatus);
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
const heartBeatCheck = () => {
    if (stompClient && stompClient.connected){
        const destination = '/user/specific/ping';
        stompClient.subscribe(destination, function(message) {
            const parsedMessage = message.body;
            console.log("Received heart beat check:", parsedMessage);

            if (parsedMessage === "ping"){
                console.log("Sending pong back.");
                stompClient.send('/app/pong', {}, "pong");
            }
        }, 
        (error) => {
            console.error("Error subscribing to heat beat check:", error);
        });
    } else {
        console.error("Invalid client connection for heart beat check.");
    }

}

// need to implment logic for unexpected isdisconnects

export { connectSocket, disconnectSocket, isWebSocketConnected, tokenHalfWayCheck, heartBeatCheck };