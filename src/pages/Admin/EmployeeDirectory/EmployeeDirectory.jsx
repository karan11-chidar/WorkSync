import {useState} from 'react'
import FilterBar from './FilterBar'
import EmployeesLists from './EmployeesLists'
import AddEmployeeForm from './AddEmployeeForm'
import EmployeeDetailDrawer from './EmployeeDetailDrawer'
function EmployeeDirectory() {
  const [isAdding, setIsAdding] = useState(false);
 const [editingEmployee, setEditingEmployee] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const handleAddEmployeeClick = () => {
    setEditingEmployee(null);
    setIsAdding(true);
  }
  const handleEditEmployeeClick = (employee) => {
    setSelectedEmployee(null); // Drawer Close
    setEditingEmployee(employee);
    setIsAdding(true);
  }
  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee);
  }
  
  return (
    <div className="space-y-6">
      <FilterBar handleAddEmployee={handleAddEmployeeClick} />
      <EmployeesLists
        handleEditEmployee={handleEditEmployeeClick}
        handleSelectEmployee={handleSelectEmployee}
      />
      <AddEmployeeForm
        isAdding={isAdding}
        editingEmployee={editingEmployee}
        setIsAdding={setIsAdding}
        setEditingEmployee={setEditingEmployee}
      />
      <EmployeeDetailDrawer
        selectedEmployee={selectedEmployee}
        setSelectedEmployee={setSelectedEmployee}
        handleEditEmployee={handleEditEmployeeClick}
      />
    </div>
  );
}

export default EmployeeDirectory
