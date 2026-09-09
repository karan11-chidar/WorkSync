import React, { useState, createContext, useContext } from "react";

export const AuthContext = createContext();
AuthContext.displayName = "AuthContext";
/**
 * Returns the authentication state from the nearest auth provider.
 *
 * @returns {Object} Authentication state and actions.
 */
export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
