import React, { useState,createContext, useContext } from 'react'


export const AuthContext = createContext();
AuthContext.displayName = "AuthContext";
export function useAuth() {
    return useContext(AuthContext);
}

export default AuthContext
