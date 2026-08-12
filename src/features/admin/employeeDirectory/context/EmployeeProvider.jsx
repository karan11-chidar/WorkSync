/**
 * ============================================================================
 * EmployeeProvider.jsx
 * ============================================================================
 *
 * Responsibility:
 * ----------------------------------------------------------------------------
 * Encapsulates employee directory state and provides CRUD actions for admin user
 * workflows in the employee management context.
 *
 * Features:
 * ----------------------------------------------------------------------------
 * - Maintains employee list state.
 * - Tracks loading state for asynchronous operations.
 * - Exposes create, update, delete, and fetch actions.
 *
 * Workflow:
 * ----------------------------------------------------------------------------
 * - Uses authenticated admin context to control employee management flows.
 * - Provides state updates for employee list retrieval and mutation operations.
 *
 * Does NOT Handle:
 * ----------------------------------------------------------------------------
 * - Direct rendering of employee UI components.
 * - Authentication flow or routing logic.
 * - Backend API implementation details.
 *
 * Dependencies:
 * ----------------------------------------------------------------------------
 * - React useState hook.
 * - Auth context from ../../../auth/context/AuthContext.
 * ============================================================================
 */

// React 
import React, { useState } from "react";

// Authentication
import { useAuth } from "../../../auth/context/AuthContext";

// Shared Service
import { toastError } from "../../../../shared/services/toastService";

// Employee Services
import { createEmployeeService, deleteEmployeeService, getEmployeeListService, updateEmployeeService } from "../services/employeeService";

// Employee Context
import { EmployeeContext } from "./EmployeeContext";

/**
 * EmployeeProvider
 *
 * Provides employee directory state and actions for admin workflows.
 * This provider maintains the current employee list and loading state,
 * and exposes methods to create, update, delete, and retrieve employees.
 *
 * @returns {JSX.Element} A provider component for employee management.
 */
function EmployeeProvider({children}) {
  const { user } = useAuth();
  const [employeeList, setEmployeeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * createEmployee
   *
   * Adds a new employee record for the current authenticated admin.
   *
   * @param {Object} employeeData - The new employee payload.
   * @param {Object} user - The authenticated admin user context.
   * @returns {void}
   */
  const createEmployee = async(employeeData) => {
    try {
      setIsLoading(true);
      const createdEmployee = await createEmployeeService(employeeData, user);
      setEmployeeList((prev) => ([...prev, createdEmployee]));
    } catch (error) {
      toastError('Firebase Error' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * updateEmployee
   *
   * Updates an existing employee record by ID.
   *
   * @param {string|number} employeeId - Identifier of the employee to update.
   * @param {Object} updatedData - The partial employee data to update.
   * @returns {void}
   */
  const updateEmployee = async(employeeId, updatedData) => {
    try {
      setIsLoading(true);
      const updatedEmployee = await updateEmployeeService(employeeId, updatedData);
      setEmployeeList(prev => prev.map(emp => {
          return (emp.id === employeeId)
            ? { ...emp, ...updatedEmployee }
            : emp
        }));
    } catch (error) {
          toastError('Firebase Error' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * deleteEmployee
   *
   * Deletes an employee record from the directory by ID.
   *
   * @param {string|number} employeeId - Identifier of the employee to remove.
   * @returns {void}
   */
  const deleteEmployee = async(employeeId) => {
     try {
       setIsLoading(true);
       await deleteEmployeeService(employeeId);
       setEmployeeList(prev => prev.filter(emp => emp.id !== employeeId));
     } catch (error) {
          toastError('Firebase Error' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * getEmployees
   *
   * Loads the full employee list and updates provider state.
   *
   * @returns {void}
   */
  const getEmployees = async() => {
     try {
       setIsLoading(true);
       const employeesData = await getEmployeeListService();
       setEmployeeList(employeesData);
    } catch (error) {
      toastError('Firebase Error' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <EmployeeContext.Provider value={{isLoading,employeeList,createEmployee,updateEmployee,deleteEmployee,getEmployees}}>
      {children}
    </EmployeeContext.Provider>
  );
}

export default EmployeeProvider;
