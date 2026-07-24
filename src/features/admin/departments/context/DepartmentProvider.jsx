import React, { useState } from 'react'
import { DepartmentContext } from './DepartmentContext'

function DepartmentProvider({ children }) {
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // optional but recommended
   const createDepartment = (formData) => {};
   const deleteDepartment = (departmentId) => {};
   const updateDepartment = () => {};
   const getDepartments = () => {};
  return (
    <DepartmentContext.Provider value={isLoading}>
      {children}
    </DepartmentContext.Provider>
  );
}

export default DepartmentProvider
