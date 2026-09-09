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

/**
 * Imports for EmployeeProvider Component
 *
 * - React: Core React library with hooks for state management
 * - useState: Hook for managing component state
 * - useEffect: Hook for side effects and filter application
 * - useAuth: Custom hook to access authenticated user context
 * - toastError: Service for displaying error notifications
 * - Employee Services: CRUD operations for employee management
 * - EmployeeContext: Context object for providing employee data
 */

// React
import React, { useState, useEffect } from "react";

// Authentication
import { useAuth } from "../../../auth/context/AuthContext";

// Shared Service
import { toastError } from "../../../../shared/services/toastService";

// Employee Services
import {
  createEmployeeService,
  deleteEmployeeService,
  getEmployeeListService,
  updateEmployeeService,
  getDepartmentsListService,
} from "../services/employeeService";

// Employee Context
import { EmployeeContext } from "./EmployeeContext";

/**
 * EmployeeProvider Component
 *
 * A context provider that manages the employee directory state and provides
 * CRUD operations for administrative employee management workflows.
 *
 * Key Responsibilities:
 * - Maintains employee list and filtered results state
 * - Manages loading state for asynchronous operations
 * - Provides methods to create, update, delete, and fetch employees
 * - Applies real-time filtering based on search, department, status, and sorting criteria
 * - Manages department list for filter dropdowns
 *
 * State Management:
 * - employeeList: Full list of all employees
 * - filteredEmployeeList: Employees matching current filter criteria
 * - filterState: Current filter configuration (search, department, status, sort)
 * - departmentList: Available departments for filtering
 * - isLoading: Loading state for async operations
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped by provider
 * @returns {JSX.Element} Provider component wrapping EmployeeContext
 */
function EmployeeProvider({ children }) {
  const { user } = useAuth();
  const [employeeList, setEmployeeList] = useState([]);
  const [filteredEmployeeList, setFilteredEmployeeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [departmentList, setDepartmentList] = useState([]);
  /**
   * Filter state management
   * Tracks the current filter and search criteria
   *
   * @type {Object}
   * @property {string} sortBy - Sorting criteria (e.g., 'name', 'date')
   * @property {string} department - Selected department filter
   * @property {string} status - Selected employee status filter
   * @property {string} search - Search query for employee name/ID
   */
  const [filterState, setFilterState] = useState({
    sortBy: "select order",
    department: "all departments",
    status: "all status",
    search: "",
  });
  //----------------------------------------------------------
  // Derived State
  //----------------------------------------------------------

  const isFilterActive =
    filterState.search !== "" ||
    filterState.department !== "all departments" ||
    filterState.status !== "all status" ||
    filterState.sortBy !== "select order";
  const displayEmployeeList = isFilterActive
    ? filteredEmployeeList
    : employeeList;

  /**
   * createEmployee
   *
   * Adds a new employee record for the current authenticated admin.
   *
   * @param {Object} employeeData - The new employee payload.
   * @param {Object} user - The authenticated admin user context.
   * @returns {void}
   */
  const createEmployee = async (employeeData) => {
    try {
      /**
       * FIX 2: Selected Department ke base par location find karna
       */
      const selectedDept = (departmentList||[]).find(
        (dept) =>
          dept.name?.toLowerCase() === employeeData.department?.toLowerCase() ||
          dept.id === employeeData.department,
      );

      // Selected department ki location attach karna
      const payload = {
        ...employeeData,
        officeLocation: selectedDept?.location || "",
      };
      setIsLoading(true);
      const createdEmployee = await createEmployeeService(payload, user);
      setEmployeeList((prev) => [...prev, createdEmployee]);
    } catch (error) {
      toastError("Firebase Error" + error.message);
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
  const updateEmployee = async (employeeId, updatedData) => {
    try {
      setIsLoading(true);
      const updatedEmployee = await updateEmployeeService(
        employeeId,
        updatedData,
      );
      setEmployeeList((prev) =>
        prev.map((emp) => {
          return emp.id === employeeId ? { ...emp, ...updatedEmployee } : emp;
        }),
      );
    } catch (error) {
      toastError("Firebase Error" + error.message);
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
  const deleteEmployee = async (employeeId) => {
    try {
      setIsLoading(true);
      await deleteEmployeeService(employeeId);
      setEmployeeList((prev) => prev.filter((emp) => emp.id !== employeeId));
    } catch (error) {
      toastError("Firebase Error" + error.message);
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
  const getEmployees = async () => {
    try {
      setIsLoading(true);
      const employeesData = await getEmployeeListService();
      setEmployeeList(employeesData);
    } catch (error) {
      toastError("Firebase Error" + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * applyEmployeeFilters
   *
   * Filters the existing employee list using the current search and filter criteria.
   * The original employee list remains unchanged, while the filtered result
   * is stored separately for UI rendering.
   *
   * @returns {void}
   */
  const applyEmployeeFilters = () => {
    const searchValue = filterState.search?.toLowerCase();
    const departmentValue = filterState.department.toLowerCase();
    const statusValue = filterState.status.toLowerCase();
    const sortValue = filterState.sortBy.toLowerCase();
    const filteredEmployee = employeeList
      .filter((emp) => {
        const firstName = emp.firstName?.toLowerCase() || "";
        const lastName = emp.lastName?.toLowerCase() || "";
        const emailId = emp.email?.toLowerCase() || "";
        const empId = emp.employeeId?.toLowerCase() || "";
        const department = emp.department?.toLowerCase() || "";
        const employeeStatus = emp.employmentStatus?.toLowerCase() || "";
        const matchSearch =
          firstName.includes(searchValue) ||
          lastName.includes(searchValue) ||
          emailId.includes(searchValue) ||
          empId.includes(searchValue);
        const matchDepartment =
          departmentValue === "all departments" ||
          department === departmentValue;

        const matchStatus =
          statusValue === "all status" || employeeStatus === statusValue;
        return matchSearch && matchDepartment && matchStatus;
      })
      .sort((emp1, emp2) => {
        if (sortValue === "name-az")
          return emp1.firstName?.localeCompare(emp2?.firstName);
        else if (sortValue === "name-za")
          return emp2.firstName?.localeCompare(emp1?.firstName);
        else if (sortValue === "salary-desc") return emp2.salary - emp1.salary;
        else if (sortValue === "salary-asc") return emp1.salary - emp2.salary;
        else if (sortValue === "date-joined-new")
          return emp2.joiningDate?.toMillis() - emp1.joiningDate?.toMillis();
        else if (sortValue === "date-joined-old")
          return emp1.joiningDate?.toMillis() - emp2.joiningDate?.toMillis();
        return 0
      });
    setFilteredEmployeeList(filteredEmployee);
  };

  /**
   * getDepartmentsLists
   *
   * Fetches the complete list of available departments from the backend
   * and updates the department list state. Used to populate department
   * filter dropdown options in the employee directory.
   *
   * Error Handling:
   * - Catches Firebase errors and displays toast notification
   * - Continues gracefully if fetch fails
   *
   * @async
   * @returns {Promise<void>}
   */
  const getDepartmentsLists = async () => {
    try {
      const departmentData = await getDepartmentsListService();
      setDepartmentList(departmentData);
    } catch (error) {
      toastError("Firebase Error" + error.message);
    }
  };

  /**
   * Effect: Apply Employee Filters
   *
   * Automatically applies filtering and sorting to the employee list whenever
   * the filterState or employeeList changes. This ensures the filtered employee
   * list stays in sync with user-selected filter criteria (department, status,
   * search query, and sorting preference).
   *
   * Filter Operations:
   * - Search: Matches against firstName, lastName, email, and employeeId
   * - Department: Filters by selected department or shows all
   * - Status: Filters by employment status or shows all
   * - Sorting: Applies sorting by name (A-Z, Z-A), salary (asc, desc), or date joined
   *
   * @effect Applies filters whenever filterState or employeeList changes
   * @dependency {Object} filterState - Current filter configuration object
   * @dependency {Array} employeeList - Complete list of employees to filter
   */
  useEffect(() => {
    applyEmployeeFilters();
  }, [filterState, employeeList]);

  return (
    <EmployeeContext.Provider
      value={{
        isLoading,
        employeeList,
        filteredEmployeeList,
        filterState,
        setFilterState,
        displayEmployeeList,
        departmentList,
        getDepartmentsLists,
        createEmployee,
        updateEmployee,
        deleteEmployee,
        getEmployees,
        applyEmployeeFilters,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

export default EmployeeProvider;
