import { createContext, useContext, useEffect, useState, useRef } from "react";

import {signIn, signUp, logOut, refreshToken, checkUser, forgotPassword, resetPassword} from './authService.js';
import {connectSocket, disconnectSocket, isWebSocketConnected, tokenHalfWayCheck, heartBeatCheck} from './socketService.js';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [isTokenExpired, setIsTokenExpired] = useState(false);

    const signInUser = async (credentials) => {
        try {
            const data = await signIn(credentials);
            setAuthenticated(true);

            // Establishe websocket 
            await connectSocket();

            tokenHalfWayCheck(handleTokenRefresh);
            heartBeatCheck();
        } catch (error) {
            throw error;
        }
    };

    const signUpUser = async (credentials) => {
        try {
            const data = await signUp(credentials);
          
        } catch (error) {
            throw error;
        }
    };

    const forgotPasswordHandler = async (credentials) => {
        try {
            const data = await forgotPassword(credentials);
        } catch (error) {
            throw error;
        }
    };

    const resetPasswordHandler = async (credentials) => {
        try {
            const data = await resetPassword(credentials);
        } catch (error) {
            throw error;
        }
    };
  
    const logOutUser = async () => {
        try {
            const data = await logOut();
            
            setAuthenticated(false);
            setIsTokenExpired(false);
            
            disconnectSocket();
        } catch (error) {
            throw error;
        }
    };

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

    useEffect(() => {
        console.log("Token change detected", isTokenExpired);
        if (isTokenExpired) {
            refreshTokenHandler();
        }
    }, [isTokenExpired]);

    // Checks to see if a user is still logged in
    const checkLoggedInStatus = async () => {
        try {
            const result = await checkUser(); 
            console.log(result);
            if (result.status === 200){
                setAuthenticated(true);
                
                // Check if WebSocket is already connected
                if (!isWebSocketConnected()) {
                    // Establish WebSocket connection if not already connected
                    await connectSocket();
                    tokenHalfWayCheck(handleTokenRefresh);
                    heartBeatCheck();
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
        checkLoggedInStatus();

        // Set up interval to check every 5 minutes
        const intervalId = setInterval(() => {
            checkLoggedInStatus();
        }, 1 * 30 * 1000); // 5 minutes in milliseconds

        // Listen for page refresh events
        const handlePageRefresh = () => {
            checkLoggedInStatus();
        };

        window.addEventListener('beforeunload', handlePageRefresh);

        // Clean up the interval and event listener when the component unmounts
        return () => {
            clearInterval(intervalId);
            window.removeEventListener('beforeunload', handlePageRefresh);
            console.log("cleaned");
        };

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