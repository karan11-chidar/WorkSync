import React from "react";
import AdminDashBoard from "./pages/Admin/Dashboard/DashBoard.jsx";
import SideBar from "./components/Sidebar/SideBar.jsx";
import MobileHeader from "./components/MobileHeader.jsx";
import EmployeeDirectory from "./pages/Admin/EmployeeDirectory/EmployeeDirectory.jsx";
import TaskBoard from "./pages/Admin/TaskBoard/TaskBoard.jsx";
import Departments from "./pages/Admin/Departments/Departments.jsx";
import TodayAttendance from "./pages/Admin/Attendance/TodayAttendance.jsx";
import LeaveLedger from "./pages/Admin/LeaveLedger/LeaveLedger.jsx";
import EmployeeDashBoard from "./pages/Employee/DashBoard/DashBoard.jsx"
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
  Menu,
  X,
} from "lucide-react";
import EmployeeAttendance from "./pages/Employee/Attendance/EmployeeAttendance.jsx";
import LeaveDashboardView from "./pages/Employee/Leaves/LeaveDashboardView.jsx";
import EmployeeTaskList from "./pages/Employee/Tasks/AssignedTasksPortal.jsx";
import EmployeeProfile from "./pages/Employee/Profile/EmployeeProfileView.jsx";
function App() {
  // Admin nav
  const navItemsAdmin = [
      { id: "home", label: "Company Overview", icon: LayoutDashboard },
      { id: "employees", label: "Employee Directory", icon: Users },
      { id: "departments", label: "Departments", icon: Briefcase },
      { id: "tasks", label: "Tasks Board", icon: ListTodo },
      { id: "attendance", label: "Today's Attendance", icon: Clock },
      { id: "leaves", label: "Leave Ledger", icon: CalendarClock },
      { id: "settings", label: "Console & Backup", icon: Settings },
  ];
  // Employee nav
  const navItemsEmployee = [
    { id: "Home", label: "Home", icon: Home },
    {
      id: "Attendance & Calendar",
      label: "Attendance & Calendar",
      icon: CalendarCheck,
    },
    { id: "Time-Off / Leaves", label: "Time-Off / Leaves", icon: FileText },
    { id: "My Tasks", label: "My Tasks", icon: CheckSquare },
    { id: "Profile", label: "Profile", icon: User },
  ];
  return (
    <div className="h-screen ">
      {/* Admin Portal */}
      {/* Mobile Header */}
      {/* <div className="md:hidden">
        <MobileHeader />
      </div> */}

      {/* Desktop Layout */}
      {/* <div className="flex h-full">
        <SideBar /> */}

      {/* <main className="flex-1 md:overflow-y-auto"> */}
      {/* <DashBoard /> */}
      {/* <EmployeeDirectory/> */}
      {/* <Departments/> */}
      {/* <TaskBoard /> */}
      {/* <TodayAttendance/> */}
      {/* <LeaveLedger/> */}

      {/* </main> */}
      {/* </div> */}

      {/* Employee Portal */}
      <div className="md:hidden">
        <MobileHeader headerTitle="Employee Portal" />
      </div> 
      <div className="flex h-full">
        <SideBar navItems={navItemsEmployee} headerTitle="Employee Portal" />
        <main className="flex-1 md:overflow-y-auto">
          {/* <EmployeeDashBoard/> */}
          {/* <EmployeeAttendance/> */}
          {/* <LeaveDashboardView/> */}
          {/* <EmployeeTaskList/> */}
          <EmployeeProfile/>
        </main>
      </div>
    </div>
  );
}

export default App;
