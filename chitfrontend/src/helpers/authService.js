import axios from 'axios';

// Path Starters
const authInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1/auth',
    headers: {
        'Content-Type': 'application/json',
    },
});

const forgotPasswordInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1/forgot-password',
    headers: {
        'Content-Type' : 'application/json',
    },
});

const userInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1/user'
});

// API Calls
const signIn = async (credentials) => {
    try {
        const response = await authInstance.post('/sign-in', credentials);
        return response; 
    } catch (error) {
        throw error;
    }
};

const signUp = async (credentials) => {
    try{
        const response = await authInstance.post('/sign-up', credentials);
        return response;
    } catch (error) {
        throw error;
    }
};

const forgotPassword = async (credentials) => {
    try{
        console.log(credentials);
        const response = await forgotPasswordInstance.post('', credentials);
        return response; 
    } catch (error) {
        throw error;
    }
}

const extractResetTokenFromURL = () => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('token') || "";
};
const resetPassword = async (credentials) => {
    const resetToken = extractResetTokenFromURL();

    try {
        const response = await forgotPasswordInstance.patch(`/reset-password?token=${resetToken}`,  credentials);
        return response;
    } catch (error) {
        throw error;
    }
};
export { authInstance, userInstance, signIn, signUp, forgotPassword, resetPassword};