import {useState} from 'react'
import DepartmentHeader from '../components/DepartmentHeader';
import CreateDepartment from '../components/CreateDepartment';
import DepartmentCards from '../components/DepartmentsCards';
import DepartmentProvider from '../context/DepartmentProvider';
function Departments() {
  const [openEditingModal, setOpenEditingModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const employees = [
    { id: "EMP-001", firstName: "Rahul", lastName: "Sharma" },
    { id: "EMP-002", firstName: "Priya", lastName: "Verma" },
  ];
  const departments = [
    {
      id: "engineering",
      name: "Engineering",
      location: "Block A",
      description:
        "Responsible for product development, backend systems and technical operations.",
      manager: "Rahul Sharma",
      count: 45,
      avgSalary: 850000,
      budget: 5000000,
      color: "emerald",
      topPerformer: {
        name: "Aman Singh",
        rating: 5,
      },
    },

    {
      id: "marketing",
      name: "Marketing",
      location: "Block B",
      description:
        "Handles campaigns, brand growth and customer acquisition strategies.",
      manager: "Priya Verma",
      count: 20,
      avgSalary: 650000,
      budget: 2500000,
      color: "rose",
      topPerformer: {
        name: "Neha Patel",
        rating: 4,
      },
    },

    {
      id: "finance",
      name: "Finance",
      location: "Block C",
      description:
        "Manages financial planning, accounting and company budgets.",
      manager: "Rohit Gupta",
      count: 15,
      avgSalary: 750000,
      budget: 3000000,
      color: "sky",
      topPerformer: null,
    },
  ];

  // 2. अब डिपार्टमेंट सिर्फ नाम नहीं, हेड के साथ ऑब्जेक्ट्स होंगे
  const [availableDepts, setAvailableDepts] = useState([
    { name: "Engineering", head: "Rahul Sharma" },
    { name: "Design", head: "Priya Verma" },
    { name: "HR", head: "No Head Assigned" },
  ]);
  const onDelete = (dep) => {
    console.log('Delete Dep')
  }
  return (
    <div className="space-y-6">
      <DepartmentProvider>
        <DepartmentHeader setOpenCreateModal={setOpenCreateModal} />
        <DepartmentCards
          departments={departments}
          setOpenEditingModal={setOpenEditingModal}
          setEditingDepartment={setEditingDepartment}
          onDelete={onDelete}
        />
        <CreateDepartment
          openEditingModal={openEditingModal}
          setOpenEditingModal={setOpenEditingModal}
          openCreateModal={openCreateModal}
          setIsOpenCreateModal={setOpenCreateModal}
          employees={employees}
        />
      </DepartmentProvider>
    </div>
  );
}

export default Departments
