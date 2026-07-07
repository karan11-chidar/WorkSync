import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages Imports
import AdminDashBoard from "./pages/Admin/Dashboard/DashBoard.jsx";
import SideBar from "./components/Sidebar/SideBar.jsx";
import MobileHeader from "./components/MobileHeader.jsx";
import EmployeeDirectory from "./pages/Admin/EmployeeDirectory/EmployeeDirectory.jsx";
import TaskBoard from "./pages/Admin/TaskBoard/TaskBoard.jsx";
import Departments from "./pages/Admin/Departments/Departments.jsx";
import TodayAttendance from "./pages/Admin/Attendance/TodayAttendance.jsx";
import LeaveLedger from "./pages/Admin/LeaveLedger/LeaveLedger.jsx";
import EmployeeDashBoard from "./pages/Employee/DashBoard/DashBoard.jsx";
import Login from "./pages/Login/Login.jsx";
import EmployeeAttendance from "./pages/Employee/Attendance/EmployeeAttendance.jsx";
import LeaveDashboardView from "./pages/Employee/Leaves/LeaveDashboardView.jsx";
import EmployeeTaskList from "./pages/Employee/Tasks/AssignedTasksPortal.jsx";
import EmployeeProfile from "./pages/Employee/Profile/EmployeeProfileView.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

import {
  LayoutDashboard,
  Users,
  Briefcase,
  Clock,
  CalendarClock,
  Settings,
  ListTodo,
  Home,
  CalendarCheck,
  FileText,
  CheckSquare,
  User,
} from "lucide-react";
import LinearProgressStream from "./components/LinearProgressStream.jsx";

function App() {
  // 🔥 ADMIN NAVIGATION MATRIX (100% Lowercase & Space-Free IDs)
  const navItemsAdmin = [
    { id: "dashboard", label: "Company Overview", icon: LayoutDashboard },
    { id: "employees", label: "Employee Directory", icon: Users },
    { id: "departments", label: "Departments", icon: Briefcase },
    { id: "tasks", label: "Tasks Board", icon: ListTodo },
    { id: "attendance", label: "Today's Attendance", icon: Clock },
    { id: "leaves", label: "Leave Ledger", icon: CalendarClock },
  ];

  // 🔥 EMPLOYEE NAVIGATION MATRIX (Clean CamelCase & Symbol-Free IDs)
  const navItemsEmployee = [
    { id: "dashboard", label: "Home", icon: Home },
    { id: "attendance", label: "Attendance & Calendar", icon: CalendarCheck },
    { id: "leaves", label: "Time-Off / Leaves", icon: FileText },
    { id: "tasks", label: "My Tasks", icon: CheckSquare },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <Routes>
      {/* 🎬 Login Entrance */}
      <Route path="/" element={<Login />} />

      {/* 👑 Admin Portal Layout Wrapper */}
      <Route
        path="/admin/*"
        element={
          <div className="h-screen flex flex-col md:flex-row">
            {/* Mobile Header */}
            <div className="md:hidden">
              <MobileHeader headerTitle="Admin Portal" />
            </div>
            {/* Desktop Layout */}
            <div className="flex h-full w-full">
              <SideBar navItems={navItemsAdmin} headerTitle="Admin Portal" />
              <main className="flex-1 md:overflow-y-auto bg-slate-50 p-4 md:p-6 lg:p-8">
                <Routes>
                  <Route path="dashboard" element={<AdminDashBoard />} />
                  <Route path="departments" element={<Departments />} />
                  <Route path="tasks" element={<TaskBoard />} />
                  <Route path="attendance" element={<TodayAttendance />} />
                  <Route path="leaves" element={<LeaveLedger />} />
                  <Route path="employees" element={<EmployeeDirectory />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
            </div>
          </div>
        }
      />

      {/* 🧑‍💻 Employee Portal Layout Wrapper */}
      <Route
        path="/employee/*"
        element={
          <div className="h-screen flex flex-col md:flex-row">
            <div className="md:hidden">
              <MobileHeader headerTitle="Employee Portal" />
            </div>
            <div className="flex h-full w-full">
              <SideBar
                navItems={navItemsEmployee}
                headerTitle="Employee Portal"
              />
              <main className="flex-1 md:overflow-y-auto bg-slate-50 p-4 md:p-6 lg:p-8">
                <Routes>
                  <Route path="dashboard" element={<EmployeeDashBoard />} />
                  <Route path="leaves" element={<LeaveDashboardView />} />
                  <Route path="attendance" element={<EmployeeAttendance />} />
                  <Route path="tasks" element={<EmployeeTaskList />} />
                  <Route path="profile" element={<EmployeeProfile />} />
                  <Route path="profile/:employeeId" element={<EmployeeProfile />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
            </div>
          </div>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
