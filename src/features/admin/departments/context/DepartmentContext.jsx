import React, { createContext, useContext } from 'react'

export  const DepartmentContext = createContext();
DepartmentContext.displayName = "DepartmentContext";

export const useDepartment = () => {
    return useContext(DepartmentContext);
}