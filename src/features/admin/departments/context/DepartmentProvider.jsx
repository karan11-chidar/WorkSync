import React, { useState } from 'react'
import { DepartmentContext } from './DepartmentContext'

 export const createDepartment = (formData) => {
    
}
export const deleteDepartment = (departmentId) => {
    
}
export const updateDepartment = () => {
    
}
export const getDepartments = () => {
    
}

function DepartmentProvider({ children }) {

  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <DepartmentContext.Provider value={isLoading} >
      {children}
      </DepartmentContext.Provider>
  )
}

export default DepartmentProvider
