import axios from 'axios';

export const authInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1/auth',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const userInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1/user'
});