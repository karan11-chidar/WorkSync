/**
 * EmployeeDirectory.jsx
 *
 * Page component for the admin employee directory section.
 * This component orchestrates the employee list, filtering, add/edit
 * workflow, and employee detail drawer.
 *
 * Responsibilities:
 * - Fetch and display the employee directory
 * - Manage the add/edit modal state
 * - Handle employee selection and deletion actions
 */

// React hooks
// - `useEffect`: for running side-effects on component mount/update
// - `useState`: for local component state
import { useEffect, useState } from "react";

// UI components used by the directory page

// - `FilterBar`: top controls for filtering and adding employees
import FilterBar from "../components/FilterBar";

// - `EmployeesLists`: lists/grid showing employees
import EmployeesLists from "../components/EmployeesLists";

// - `AddEmployeeForm`: modal/form for adding or editing an employee
import AddEmployeeForm from "../components/EmployeeForm";

// - `EmployeeDetailDrawer`: drawer that shows employee details
import EmployeeDetailDrawer from "../components/EmployeeDetailDrawer";

// Employee context hook
// - `useEmployee` provides data fetching and mutation helpers
import { useEmployee } from "../context/EmployeeContext";

// Toast helpers for user notifications
import {
  toastError,
  toastSuccess,
} from "../../../../shared/services/toastService";

/**
 * EmployeeDirectory
 *
 * @returns {JSX.Element}
 */
function EmployeeDirectory() {
  const { getEmployees, deleteEmployee } = useEmployee();
  const [isAdding, setIsAdding] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  /**
   * Opens the add employee modal and clears any editing state.
   * @returns {void}
   */
  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setIsAdding(true);
  };

  /**
   * Prepare an employee for editing by opening the form modal.
   * Also ensures the detail drawer is closed.
   * @param {Object} employee - Employee object to edit
   * @returns {void}
   */
  const handleEditEmployee = (employee) => {
    setSelectedEmployee(null); // Drawer Close
    console.log("Editing employee:", employee);
    setEditingEmployee(employee);
    setIsAdding(true);
  };

  /**
   * Selects an employee to open the detail drawer.
   * @param {Object} employee - Employee object that was selected
   * @returns {void}
   */
  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee);
  };

  /**
   * Deletes an employee using the context-provided `deleteEmployee`.
   * Shows success or error toasts based on the result.
   * @param {string} employeeId - ID of the employee to delete
   * @returns {Promise<void>}
   */
  const handleDeleteEmployee = async (employeeId) => {
    // Implement the logic to delete the employee from your data source
    console.log(`Delete employee with ID: ${employeeId}`);
    try {
      await deleteEmployee(employeeId);
      toastSuccess(`Delete employee with ID: ${employeeId}`);
    } catch (error) {
      toastError("Firebase Error" + error.message);
    }
  };

  /**
   * Closes the add/edit modal and resets editing state.
   * @returns {void}
   */
  const handleCloseModal = () => {
    setIsAdding(false);
    setEditingEmployee(null);
  };

  /**
   * Fetch employees when the component mounts.
   *
   * This effect runs once on mount (empty dependency array) to load the
   * employee directory via the `getEmployees` method provided by
   * `useEmployee` context. Keep the dependency array empty to avoid
   * refetching unless the component is remounted.
   *
   * Cleanup:
   * When the component unmounts, reset local UI state (close modal,
   * clear editing and selection) to avoid leaving transient UI state
   * around if the page is navigated away while operations are pending.
   *
   * @returns {void}
   */
  useEffect(() => {
    getEmployees();
    return () => {
      // Reset local UI state on unmount to avoid stale selection/modal state
      setIsAdding(false);
      setEditingEmployee(null);
      setSelectedEmployee(null);
    };
  }, []);
  return (
    <div className="space-y-6">
      <FilterBar handleAddEmployee={handleAddEmployee} />
      <EmployeesLists
        handleEditEmployee={handleEditEmployee}
        handleSelectEmployee={handleSelectEmployee}
      />
      {isAdding && (
        <AddEmployeeForm
          isAdding={isAdding}
          editingEmployee={editingEmployee}
          setIsAdding={setIsAdding}
          setEditingEmployee={setEditingEmployee}
          handleCloseModal={handleCloseModal}
        />
      )}
      <EmployeeDetailDrawer
        selectedEmployee={selectedEmployee}
        setSelectedEmployee={setSelectedEmployee}
        handleEditEmployee={handleEditEmployee}
        handleDeleteEmployee={handleDeleteEmployee}
      />
    </div>
  );
}

export default EmployeeDirectory;
