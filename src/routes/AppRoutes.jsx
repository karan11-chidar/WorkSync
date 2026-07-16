import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
// Pages Imports
import AdminLayout from '../layouts/AdminLayout';
import EmployeeLayout from '../layouts/EmployeeLayout';
import AdminDashBoard from "./../pages/Admin/Dashboard/DashBoard.jsx";
import EmployeeDirectory from "./../pages/Admin/EmployeeDirectory/EmployeeDirectory.jsx";
import TaskBoard from "./../pages/Admin/TaskBoard/TaskBoard.jsx";
import Departments from "./../pages/Admin/Departments/Departments.jsx";
import TodayAttendance from "./../pages/Admin/Attendance/TodayAttendance.jsx";
import LeaveLedger from "./../pages/Admin/LeaveLedger/LeaveLedger.jsx";
import EmployeeDashBoard from "./../pages/Employee/DashBoard/DashBoard.jsx";
import Login from "./../pages/Login/Login.jsx";
import EmployeeAttendance from "./../pages/Employee/Attendance/EmployeeAttendance.jsx";
import LeaveDashboardView from "./../pages/Employee/Leaves/LeaveDashboardView.jsx";
import EmployeeTaskList from "./../pages/Employee/Tasks/AssignedTasksPortal.jsx";
import EmployeeProfile from "./../pages/Employee/Profile/EmployeeProfileView.jsx";
import NotFoundPage from "./../pages/NotFoundPage.jsx";
import LinearProgressStream from '../components/Animations/LinearProgressStream.jsx';
function AppRoutes() {
  const [isLoading, setIsLoading] = useState(false);
  const MIN_ROUTE_LOADER_TIME = 1000;
  const location = useLocation();
  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, MIN_ROUTE_LOADER_TIME);

    return () => clearTimeout(timer);
  }, [location.pathname]);
  return (
    <>
      <LinearProgressStream isLoading={isLoading}/>
      <Routes>
        {/* 🎬 Login Entrance */}
        <Route path="/" element={<Login />} />

        {/* 👑 Admin Portal Layout Wrapper */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashBoard />} />
          <Route path="departments" element={<Departments />} />
          <Route path="tasks" element={<TaskBoard />} />
          <Route path="attendance" element={<TodayAttendance />} />
          <Route path="leaves" element={<LeaveLedger />} />
          <Route path="employees" element={<EmployeeDirectory />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* 🧑‍💻 Employee Portal Layout Wrapper */}
        <Route path="/employee" element={<EmployeeLayout />}>
          <Route path="dashboard" element={<EmployeeDashBoard />} />
          <Route path="leaves" element={<LeaveDashboardView />} />
          <Route path="attendance" element={<EmployeeAttendance />} />
          <Route path="tasks" element={<EmployeeTaskList />} />
          <Route path="profile" element={<EmployeeProfile />} />
          <Route path="profile/:employeeId" element={<EmployeeProfile />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default AppRoutes
