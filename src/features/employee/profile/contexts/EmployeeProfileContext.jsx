/**
 * Employee profile context used to share the current employee profile state
 * across the employee profile feature tree.
 *
 * This context exposes both the profile data and related updater functions that
 * are consumed by profile pages and nested components.
 *
 * @type {React.Context<Object | undefined>}
 */
import React, { createContext, useContext } from "react";

export const EmployeeProfileContext = createContext();
EmployeeProfileContext.displayName = "EmployeeProfileContext";

/**
 * Returns the employee profile context value.
 *
 * @returns {Object} The employee profile state and actions provided by the nearest
 * profile provider.
 * @throws {Error} If called outside an EmployeeProfileProvider.
 */
export const useEmployeeProfile = () => {
  const context = useContext(EmployeeProfileContext);

  if (!context) {
    throw new Error(
      "useEmployeeProfile must be used within an EmployeeProfileProvider",
    );
  }

  return context;
};

export default EmployeeProfileContext;
