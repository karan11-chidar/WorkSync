import { useState } from "react";
import FilterBar from "../components/FilterBar";
import EmployeesLists from "../components/EmployeesLists";
import AddEmployeeForm from "../components/EmployeeForm";
import EmployeeDetailDrawer from "../components/EmployeeDetailDrawer";
function EmployeeDirectory() {
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
  const handleDeleteEmployee = (employeeId) => {
    // Implement the logic to delete the employee from your data source
    console.log(`Delete employee with ID: ${employeeId}`);
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
  const employees = [
    {
      id: "EMP-001",
      firstName: "Rahul",
      lastName: "Sharma",
      phone: "9876543210",
      email: "rahul@company.com",
      role: "Frontend Developer",
      department: "Engineering",
      status: "Active",
      performanceRating: 5,
      salary: 850000,
      avatarColor: "from-blue-500 to-cyan-500",
      address: "123, Main Street, City, Country",
    },
    {
      id: "EMP-002",
      firstName: "Priya",
      lastName: "Verma",
      phone: "9876543211",
      email: "priya@company.com",
      role: "UI/UX Designer",
      department: "Design",
      status: "On Leave",
      performanceRating: 4,
      salary: 720000,
      address: "456, Oak Avenue, Town, Country",
      avatarColor: "from-pink-500 to-rose-500",
    },
    {
      id: "EMP-003",
      firstName: "Aman",
      lastName: "Singh",
      phone: "9876543212",
      email: "aman@company.com",
      role: "Backend Developer",
      department: "Engineering",
      status: "Active",
      performanceRating: 5,
      salary: 980000,
      avatarColor: "from-violet-500 to-indigo-500",
      address: "789, Pine Lane, Village, Country",
    },
    {
      id: "EMP-004",
      firstName: "Neha",
      lastName: "Patel",
      phone: "9876543213",
      email: "neha@company.com",
      role: "HR Executive",
      department: "Human Resource",
      status: "Inactive",
      performanceRating: 3,
      salary: 560000,
      avatarColor: "from-emerald-500 to-green-500",
      address: "321, Cedar Road, Suburb, Country",
    },
    {
      id: "EMP-005",
      firstName: "Rohit",
      lastName: "Gupta",
      phone: "9876543214",
      email: "rohit@company.com",
      role: "Financial Analyst",
      department: "Finance",
      status: "Active",
      performanceRating: 4,
      salary: 910000,
      avatarColor: "from-orange-500 to-red-500",
      address: "654, Birch Street, Metropolis, Country",
    },
  ];

  return (
    <div className="space-y-6">
      <FilterBar handleAddEmployee={handleAddEmployee} />
      <EmployeesLists
        handleEditEmployee={handleEditEmployee}
        handleSelectEmployee={handleSelectEmployee}
        employees={employees}
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
