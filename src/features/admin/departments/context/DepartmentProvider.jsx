import React, { useState } from 'react'
import { DepartmentContext } from './DepartmentContext'
import { createDepartmentService, deleteDepartmentService, getDepartmentsService, updateDepartmentService } from '../services/departmentService';
import { useAuth } from '../../../auth/context/AuthContext'
import { toastError } from '../../../../shared/services/toastService';
function DepartmentProvider({ children }) {
  const { user } = useAuth();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const createDepartment = async (formData) => {
    try {
      setLoading(true);
      const departmentData = await createDepartmentService(formData,user);
      setDepartments(prev => [...prev,departmentData]);
      } catch (error) {
      toastError("Firebase Error :" + error.message);
    } finally {
      setLoading(false);
        }
   };
  const deleteDepartment = async(departmentId) => {
    try {
      await deleteDepartmentService(departmentId);
      setDepartments(prev => prev.filter(dep => dep.id !== departmentId));
    } catch (error) {
      toastError("Firebase Error :" + error.message);
     }
   };
  const updateDepartment = async (departmentId,updatedData) => {
    try {
      const departmentData = await updateDepartmentService(departmentId, updatedData);
      setDepartments(prev => prev.map(dep => {
       return (dep.id === departmentId)
          ? { ...dep, ...updatedData }
          : dep;
      }))
    } catch (error) {
        toastError("Firebase Error :" + error.message);
     }
   };
  const getDepartments = async() => {
    try {
      setLoading(true);
      const departmentData = await getDepartmentsService();
      setDepartments(departmentData);
     } catch (error) {
      toastError('Firebase Error :' + error.message);
    } finally {
      setLoading(false);
     }
   };
  return (
    <DepartmentContext.Provider value={{departments,loading,createDepartment,deleteDepartment,updateDepartment,getDepartments}}>
      {children}
    </DepartmentContext.Provider>
  );
}

export default DepartmentProvider
