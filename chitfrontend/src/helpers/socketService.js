import SockJS from 'sockjs-client';
import { Stomp  } from '@stomp/stompjs';

const SOCKET_URL_SOCKJS = 'http://localhost:8080/ws';
const connectSocket = () => {
    const socket = new SockJS(SOCKET_URL_SOCKJS);
    const stompClient = Stomp.over(() => socket);

    stompClient.connect({}, () => {
        console.log('Connected to WebSocket');
        subscribeToHalfwayPoint(stompClient);
    });
};

const disconnectSocket = () => {
    if (stompClient) {
        stompClient.deactivate();
        console.log('Disconnected from WebSocket');
    }
};

const subscribeToHalfwayPoint = (stompClient) => { 
    const topic = '/user/specific/token-halfway-check';
    stompClient.subscribe(topic, function(message) {
        const parsedMessage = JSON.parse(message.body);
        const payload = parsedMessage.payload;
        const tokenRefreshStatus = parsedMessage.headers['tokenRefresh'];

        console.log('Received halfway check notification:', payload);
        console.log('Token refresh status:', tokenRefreshStatus);
    },
    (error) => {
        console.error('Error subscribing to WebSocket:', error);
    });
};

export { connectSocket, disconnectSocket, subscribeToHalfwayPoint };