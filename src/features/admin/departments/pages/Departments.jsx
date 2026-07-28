import {useEffect, useState} from 'react'
import DepartmentHeader from '../components/DepartmentHeader';
import CreateDepartment from '../components/DepartmentForm';
import DepartmentCards from '../components/DepartmentsCards';
import { useDepartment } from '../context/DepartmentContext';
function Departments() {
  const { getDepartments,deleteDepartment } = useDepartment();
  const [editingDept, setEditingDept] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const employees = [
    { id: "EMP-001", firstName: "Rahul", lastName: "Sharma" },
    { id: "EMP-002", firstName: "Priya", lastName: "Verma" },
  ];
  const handleEditOpen = (dept) => {
    setEditingDept(dept);
    setModalOpen(true);
  };
  const handleOpenDept = () => {
    setEditingDept(null);
    setModalOpen(true);
  };
  const handleClose = () => {
    setEditingDept(null);
    setModalOpen(false);
  };
  const onDelete = (id,name) => {
    alert('❌ Delete Department :'+name);
    deleteDepartment(id);
  };
  useEffect(() => {
    getDepartments();
  }, []);
  return (
    <div className="space-y-6">
      <DepartmentHeader handleOpenDept={handleOpenDept} />
      <DepartmentCards handleEditOpen={handleEditOpen} onDelete={onDelete} />
      {modalOpen && (
        <CreateDepartment
          editingDept={editingDept}
          handleClose={handleClose}
          employees={employees}
        />
      )}
    </div>
  );
}

export default Departments
