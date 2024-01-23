import { createContext, useContext, useEffect, useState } from "react";

import {signIn, signUp, forgotPassword, resetPassword} from './authService.js';

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