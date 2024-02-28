import { createContext, useContext, useEffect, useState, useRef } from "react";

import {signIn, signUp, logOut, refreshToken, checkUser, forgotPassword, resetPassword} from './authService.js';
import {connectSocket, disconnectSocket, isWebSocketConnected, tokenHalfWayCheck} from './stompSocketService.js';
import {connectWSRealTime, disconnectWSRealTime, isConnected} from './realTimeSocketService.js';
const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [isTokenExpired, setIsTokenExpired] = useState(false);

    // Sign in users
    const signInUser = async (credentials) => {
        try {
            const data = await signIn(credentials);
            setAuthenticated(true);

            // Establish realt time websocket
            connectWSRealTime();

            // Establish stomp websocket
            await connectSocket();
            tokenHalfWayCheck(handleTokenRefresh);
        } catch (error) {
            throw error;
        }
    };

    // Sign up users 
    const signUpUser = async (credentials) => {
        try {
            const data = await signUp(credentials);
          
        } catch (error) {
            throw error;
        }
    };

    // Handle senario where users forget their password
    const forgotPasswordHandler = async (credentials) => {
        try {
            const data = await forgotPassword(credentials);
        } catch (error) {
            throw error;
        }
    };

    // Handle password reset request
    const resetPasswordHandler = async (credentials) => {
        try {
            const data = await resetPassword(credentials);
        } catch (error) {
            throw error;
        }
    };
  
    // Log users out
    const logOutUser = async () => {
        try {
            const data = await logOut();
            
            setAuthenticated(false);
            setIsTokenExpired(false);
            
            // Disconnect websockets
            disconnectWSRealTime();
            disconnectSocket();
        } catch (error) {
            throw error;
        }
    };

    // Handle refresh token when token expires
    const refreshTokenHandler = async () => {
        try {
            console.log("We about to reset this token")
            const data = await refreshToken();
            
            setIsTokenExpired(false);
            
        } catch (error) {
            throw error;
        }
    };
    // Updates the token status
    const handleTokenRefresh = (status) => {
        setIsTokenExpired(status);
        console.log("handleTokenRefresh is called", isTokenExpired);
    }
    // Manages when token is about to expire and initiates refresh
    useEffect(() => {
        if (isTokenExpired) {
            refreshTokenHandler();
        }
    }, [isTokenExpired]);

    // Checks to see if a user is still logged in
    // **Note**: Invokes the unexpected sign outs (aka Token Error) in terminal
    const checkLoggedInStatus = async () => {
        try {
            const result = await checkUser(); 
            console.log(result);
            if (result.status === 200){
                setAuthenticated(true);
                
                // Check if real time websocket is already connected
                if (!isConnected()){
                    connectWSRealTime();
                }
                
                // Check if stomp webSocket is already connected
                if (!isWebSocketConnected()) {
                    await connectSocket();
                    tokenHalfWayCheck(handleTokenRefresh);
                }

            } else{
                console.error("Error checking user status:", result.status);
                logOutUser();
            }
        } catch (error) {
            console.error("Error checking user status:", error);
            logOutUser();
        }
    };
    // Manages maintaining the user's identity on the client
    useEffect(() => {
        // Check initially when the component mounts if a user is logged in
        // checkLoggedInStatus();

        // // Set up interval to check every 5 minutes
        // const intervalId = setInterval(() => {
        //     checkLoggedInStatus();
        // }, 1 * 30 * 1000); // 5 minutes in milliseconds

        // // Listen for page refresh events
        // const handlePageRefresh = () => {
        //     checkLoggedInStatus();
        // };

        // window.addEventListener('beforeunload', handlePageRefresh);

        // // Clean up the interval and event listener when the component unmounts
        // return () => {
        //     clearInterval(intervalId);
        //     window.removeEventListener('beforeunload', handlePageRefresh);
        //     console.log("cleaned");
        // };

    }, []);

    const contextValue = {
        authenticated,
        signInUser, 
        signUpUser,
        forgotPasswordHandler,
        resetPasswordHandler,
        logOutUser
    }
  
    return (
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    );
};
  
export const useAuth = () => {
    return useContext(AuthContext);
};