import {useState} from 'react'
import DepartmentHeader from './DepartmentHeader';
import CreateDepartment from './CreateDepartment';
import DepartmentCards from './DepartmentsCards';
function Departments() {
  const [isDeptOpen, setIsDeptOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
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
      <DepartmentHeader />
      <DepartmentCards departments={departments} setIsEditing={setIsEditing}onDelete={onDelete} />
      <CreateDepartment
        editingDept={isEditing}
        setEditingDept={setIsEditing}
        isDeptOpen={isDeptOpen}
        setIsDeptOpen={setIsDeptOpen}
        availableDepts={availableDepts}
        setAvailableDepts={setAvailableDepts}
        employees={employees} // एम्प्लॉइज़ लिस्ट पास कर दी
      />
    </div>
  );
}

export default Departments
