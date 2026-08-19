/**
 * ============================================================================
 * DepartmentProvider.jsx
 * ============================================================================
 *
 * Responsibility:
 * ----------------------------------------------------------------------------
 * Encapsulates department management state and provides CRUD actions for
 * administrative department workflows. Acts as the central state container
 * for all department-related operations across the application.
 *
 * Features:
 * ----------------------------------------------------------------------------
 * - Maintains department list state
 * - Tracks loading state for asynchronous operations
 * - Exposes create, update, delete, and fetch actions for departments
 * - Handles error display through toast notifications
 * - Integrates with Firebase Firestore service layer
 *
 * Context Provider:
 * - Provides DepartmentContext to all child components
 * - Centralizes department data and operations
 * - Eliminates prop drilling for department management
 *
 * Dependencies:
 * ----------------------------------------------------------------------------
 * - React: Core React library with hooks
 * - DepartmentContext: Context object for providing department data
 * - Department Services: Firestore CRUD operations
 * - AuthContext: User authentication context
 * - Toast Service: Error notification display
 * ============================================================================
 */

/**
 * Imports for DepartmentProvider Component
 *
 * - React: Core React library and useState hook for state management
 * - DepartmentContext: Context object for providing department state
 * - Department Services: Functions for Firestore CRUD operations
 *   - createDepartmentService: Create new departments
 *   - deleteDepartmentService: Remove departments
 *   - getDepartmentsService: Fetch all departments
 *   - updateDepartmentService: Update existing departments
 * - useAuth: Hook to access authenticated user context
 * - toastError: Service for displaying error notifications to users
 */
import React, { useState } from "react";
import { DepartmentContext } from "./DepartmentContext";
import {
  createDepartmentService,
  deleteDepartmentService,
  getDepartmentsService,
  updateDepartmentService,
  getEmployeeService
} from "../services/departmentService";
import { useAuth } from "../../../auth/context/AuthContext";
import { toastError } from "../../../../shared/services/toastService";

/**
 * DepartmentProvider Component
 *
 * A context provider that manages the department directory state and provides
 * CRUD operations for administrative department management workflows.
 *
 * Key Responsibilities:
 * - Maintains departments array state
 * - Manages loading state for async operations
 * - Provides methods to create, update, delete, and fetch departments
 * - Displays error notifications for failed operations
 * - Wraps child components with DepartmentContext
 *
 * State Management:
 * - departments: Array of all department objects
 * - loading: Boolean flag for async operation status
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap with context
 * @returns {JSX.Element} Context provider wrapping child components
 */
function DepartmentProvider({ children }) {
  const { user } = useAuth();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  /**
   * createDepartment
   *
   * Creates a new department record and adds it to the local state.
   * Sets loading state during the operation and displays errors via toast notifications.
   *
   * Workflow:
   * 1. Sets loading state to true
   * 2. Calls Firebase service to create department
   * 3. Adds created department to state array
   * 4. Handles errors and displays toast message
   * 5. Sets loading state to false on completion
   *
   * @async
   * @param {Object} formData - Department form data to create
   * @param {string} formData.name - Department name (required)
   * @param {string} [formData.description] - Department description (optional)
   * @param {number} [formData.budget] - Department budget (optional)
   * @returns {Promise<void>} Resolves when department is created and state updated
   */
  const createDepartment = async (formData) => {
    try {
      setLoading(true);
      const departmentData = await createDepartmentService(formData, user);
      setDepartments((prev) => [...prev, departmentData]);
    } catch (error) {
      toastError("Firebase Error :" + error.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * deleteDepartment
   *
   * Removes a department from the database and updates local state.
   * Displays error notification if deletion fails.
   *
   * Workflow:
   * 1. Calls Firebase service to delete department record
   * 2. Removes department from local state array
   * 3. Filters out deleted department by ID
   * 4. Handles errors and displays toast message
   *
   * Note: Loading state not managed for delete to allow UI continuity
   *
   * @async
   * @param {string} departmentId - Unique ID of department to delete
   * @returns {Promise<void>} Resolves when department is deleted from state
   */
  const deleteDepartment = async (departmentId) => {
    try {
      await deleteDepartmentService(departmentId);
      setDepartments((prev) => prev.filter((dep) => dep.id !== departmentId));
    } catch (error) {
      toastError("Firebase Error :" + error.message);
    }
  };

  /**
   * updateDepartment
   *
   * Updates an existing department record with new data and reflects changes in state.
   * Performs partial update - only specified fields are modified.
   * Displays error notification if update fails.
   *
   * Workflow:
   * 1. Calls Firebase service to update department
   * 2. Maps through departments array to find matching ID
   * 3. Merges updated data with existing department
   * 4. Returns unchanged departments for non-matching IDs
   * 5. Handles errors and displays toast message
   *
   * Note: Loading state not managed for update to allow UI continuity
   *
   * @async
   * @param {string} departmentId - Unique ID of department to update
   * @param {Object} updatedData - Fields to update in the department
   * @param {string} [updatedData.name] - Updated department name
   * @param {string} [updatedData.description] - Updated description
   * @param {string} [updatedData.managerId] - Updated manager ID
   * @param {string} [updatedData.status] - Updated status
   * @returns {Promise<void>} Resolves when department state is updated
   */
  const updateDepartment = async (departmentId, updatedData) => {
    try {
      const departmentData = await updateDepartmentService(
        departmentId,
        updatedData,
      );
      setDepartments((prev) =>
        prev.map((dep) => {
          return dep.id === departmentId ? { ...dep, ...updatedData } : dep;
        }),
      );
    } catch (error) {
      toastError("Firebase Error :" + error.message);
    }
  };

  /**
   * getDepartments
   *
   * Fetches all departments from the database and updates local state.
   * Sets loading state during the fetch operation.
   * Displays error notification if fetch fails.
   *
   * Workflow:
   * 1. Sets loading state to true
   * 2. Calls Firebase service to fetch all departments
   * 3. Updates state with fetched department array
   * 4. Handles errors and displays toast message
   * 5. Sets loading state to false on completion
   *
   * Usage:
   * - Call on component mount to initialize departments
   * - Call on page refresh or data reload
   * - Used by parent components to populate department lists
   *
   * @async
   * @returns {Promise<void>} Resolves when departments are fetched and state updated
   */
  const getDepartments = async () => {
    try {
      setLoading(true);
      const departmentData = await getDepartmentsService();
      setDepartments(departmentData);
    } catch (error) {
      toastError("Firebase Error :" + error.message);
    } finally {
      setLoading(false);
    }
  };
  const getEmployeeList = async () => {
    try {
      const employeeData = await getEmployeeService();
      console.log('provider employee data : ', employeeData);
      setEmployeeList(employeeData);
    } catch (error) {
      toastError("Firebase Error :" + error.message);
    }
  };
  return (
    <DepartmentContext.Provider
      value={{
        departments,
        loading,
        employeeList,
        createDepartment,
        deleteDepartment,
        updateDepartment,
        getDepartments,
        getEmployeeList
      }}
    >
      {children}
    </DepartmentContext.Provider>
  );
}

export default DepartmentProvider;
