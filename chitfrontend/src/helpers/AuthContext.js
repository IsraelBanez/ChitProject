import { createContext, useContext, useEffect, useState } from "react";

import {signIn, signUp, checkUser, forgotPassword, resetPassword} from './authService.js';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [authenticated, setAuthenticated] = useState(false);

    const signInUser = async (credentials) => {
        try {
            const data = await signIn(credentials);
            setAuthenticated(true);
        } catch (error) {
            throw error;
        };
    };

    const signUpUser = async (credentials) => {
        try {
            const data = await signUp(credentials);
            setAuthenticated(true);
        } catch (error) {
            throw error;
        };
    };

    const forgotPasswordHandler = async (credentials) => {
        try {
            const data = await forgotPassword(credentials);
        } catch (error) {
            throw error;
        };
    };

    const resetPasswordHandler = async (credentials) => {
        try {
            const data = await resetPassword(credentials);
        } catch (error) {
            throw error;
        };
    };
  
    const logOutUser = () => {
        setAuthenticated(false);
    };

    const checkLoggedInStatus = async () => {
        try {
            const result = await checkUser(); 
            console.log(result);
            if (result.status === 200){
                setAuthenticated(true);
            } else{
                setAuthenticated(false);
            }
        } catch (error) {
            // logout user for  InvalidTokenException, UserNotFoundException
            // try refreh token for ExpiredToken else logout if fails
            console.log(error);
            setAuthenticated(false);
        }
    };
    useEffect(() => {
        // Check initially when the component mounts if a user is logged in
        checkLoggedInStatus();

        // Set up interval to check every 5 minutes
        const intervalId = setInterval(() => {
            checkLoggedInStatus();
        }, 1 * 60 * 1000); // 5 minutes in milliseconds

        // Listen for page refresh events
        const handlePageRefresh = () => {
            checkLoggedInStatus();
        };

        window.addEventListener('beforeunload', handlePageRefresh);

        // Clean up the interval and event listener when the component unmounts
        return () => {
            clearInterval(intervalId);
            window.removeEventListener('beforeunload', handlePageRefresh);
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