import React, { createContext, useContext } from "react";

export const DepartmentContext = createContext();
DepartmentContext.displayName = "DepartmentContext";

/**
 * Returns the department context exposed by the nearest provider.
 *
 * @returns {Object} Department state and actions.
 */
export const useDepartment = () => {
  return useContext(DepartmentContext);
};
