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
import { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar";
import EmployeesLists from "../components/EmployeesLists";
import AddEmployeeForm from "../components/EmployeeForm";
import EmployeeDetailDrawer from "../components/EmployeeDetailDrawer";
import { useEmployee } from "../context/EmployeeContext";
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
  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setIsAdding(true);
  };
  const handleEditEmployee = (employee) => {
    setSelectedEmployee(null); // Drawer Close
    console.log("Editing employee:", employee);
    setEditingEmployee(employee);
    setIsAdding(true);
  };
  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee);
  };

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
   * Closes the modal and resets the form state.
   *
   * Workflow:
   * 1. Set isAdding to false to close the modal.
   * 2. Reset editingEmployee to null to clear any selected employee.
   */
  const handleCloseModal = () => {
    setIsAdding(false);
    setEditingEmployee(null);
  };

  useEffect(() => {
    getEmployees();
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
