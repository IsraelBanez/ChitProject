

// -------------------Constants ---------------------
const SOCKET_URL = "ws://localhost:8080/wbsk"

let wsClient = null;

// -------------------Functions ---------------------

const connectPlainSocket = () => {
    wsClient = new WebSocket(SOCKET_URL);

    wsClient.onopen = (event) => {
        console.log('Connected to WebSocket', event);
        
    };

    wsClient.onerror = (error) => {
        console.error('WebSocket connection error:', error);
    };
}

export {connectPlainSocket}; 