import SockJS from 'sockjs-client';
import { Stomp  } from '@stomp/stompjs';

const SOCKET_URL_SOCKJS = 'http://localhost:8080/ws';
const connectSocket = () => {
    const socket = new SockJS(SOCKET_URL_SOCKJS);
    const stompClient = Stomp.over(() => socket);

    stompClient.connect({}, () => {
        console.log("Connected to WebSocket.");

        tokenHalfWayCheck(stompClient);

        heatBeatCheck(stompClient);
    },
    (error) => {
        console.error("Error connecting to WebSocket:", error);
    });
};

const disconnectSocket = (stompClient) => {
    if (stompClient) {
        stompClient.deactivate();
        console.log("Disconnected from WebSocket");
    } else {
        console.error("Error disconnecting from WebSocket.")
    }
};

// Tell the client that the available toke is about to expire.
const tokenHalfWayCheck = (stompClient) => { 
    const destination = '/user/specific/token-halfway-check';
    stompClient.subscribe(destination, function(message) {
        const parsedMessage = JSON.parse(message.body);
        const payload = parsedMessage.payload;
        const tokenRefreshStatus = parsedMessage.headers['tokenRefresh'];

        console.log("Received token halfway check:", payload);
        console.log("Token refresh status:", tokenRefreshStatus);
    },
    (error) => {
        console.error("Error subscribing to halfway check:", error);
    });
};

// Keep a heart beat pattern to indicate that the user is active
const heatBeatCheck = (stompClient) => {
    const destination = '/user/specific/ping';
    stompClient.subscribe(destination, function(message) {
        const parsedMessage = message.body;
        console.log("Received heatbeat check:", parsedMessage);

        if (parsedMessage === "ping"){
            console.log("Sending pong back.");
            stompClient.send('/app/pong', {}, "pong");
        }
    }, 
    (error) => {
        console.error("Error subscribing to heat beat check:", error);
    });

}

export { connectSocket, disconnectSocket, tokenHalfWayCheck, heatBeatCheck };