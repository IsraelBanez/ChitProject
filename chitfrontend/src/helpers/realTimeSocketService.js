
// -------------------Constants ---------------------
const SOCKET_URL = "ws://localhost:8080/ws-realtime"

let wsClient = null;

let pingInterval;
let pingTimeout;

let reconnectAttempts = 0;
const maxReconnectionAttempts = 5;
const reconnectInterval = 1000;

// -------------------Functions ---------------------

// Establish connection to websocket
const connectWSRealTime = () => {
    wsClient = new WebSocket(SOCKET_URL);

    wsClient.onopen = (event) => {
        console.log('Connected to Real Time WebSocket');
        

        // Send 30 second ping intervals to the server
        pingInterval = setInterval(sendPing, 30000);
        sendPing();
    };

    // Error connecting to websocket
    wsClient.onerror = (error) => {
        console.error('WebSocket connection error:', error);
        reconnect();
    };

    // Unexpected disconnects
    wsClient.onclose = (event) => {
        console.log('WebSocket connection closed:', event);
        reconnect();
    };

    // Handle incoming messages
    wsClient.onmessage = (event) => {
        const message = event.data;

        // If pong received, clear the ping timeout
        if (message === "pong") {
            clearTimeout(pingTimeout);
        }
    };
}

const isConnected = () => {
    if (wsClient){
        return true;
    }
    return false;
}

// Attempt to reconnect to the websocket 5 times 
const reconnect = () => {
    // Increment reconnect attempts
    reconnectAttempts++;

    // Clear previous ping interval and timeout
    clearInterval(pingInterval);
    clearTimeout(pingTimeout);

    if (reconnectAttempts <= maxReconnectionAttempts) {
        // Calculate exponential backoff delay
        const delay = Math.pow(2, reconnectAttempts) * reconnectInterval;
        
        setTimeout(connectWSRealTime, delay);
    } else {
        console.error("Maximum reconnect attempts reached.");
        disconnectWSRealTime();
    }
}

// Send ping to server and start 40 second timer
const sendPing = ()=> {
    wsClient.send("ping");

    // After sending ping, set a timer to make sure a pong is received within a set time
    // else we can assume that the server connection is unstable or severed
    pingTimeout = setTimeout(() => {
        console.log("Pong not received within timeout");
    }, 40000);
}

// Disconnect the WebSocket
const disconnectWSRealTime = () => {
    if (wsClient) {
        clearInterval(pingInterval);
        clearTimeout(pingTimeout);

        wsClient.close();
    }
};

export {connectWSRealTime, disconnectWSRealTime, isConnected}; 