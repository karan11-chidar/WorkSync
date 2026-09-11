/**
 * @fileoverview Application Route Configuration Module
 *
 * Centralizes all route definitions for the WorkSync application, organizing
 * routes into two distinct role-based portals (Admin and Employee). Implements
 * role-based access control through ProtectedRoute components and manages
 * route transitions with a consistent loading indicator.
 *
 * @module app/routes/AppRoutes
 * @requires react
 * @requires react-router-dom
 * @requires Layouts (AdminLayout, EmployeeLayout)
 * @requires Features (Admin & Employee portal pages)
 * @requires Providers (Feature-scoped context providers)
 */

import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// ============================================================================
// Layout Shells
// ============================================================================
// Portal layout shells used by the nested admin and employee route trees.
import AdminLayout from "../../layouts/AdminLayout.jsx";
import EmployeeLayout from "../../layouts/EmployeeLayout.jsx";

// ============================================================================
// Admin Portal Routes
// ============================================================================
// Admin portal page components and their respective data providers.
import AdminDashBoard from "../../features/admin/dashboard/pages/DashBoard.jsx";
import EmployeeDirectory from "../../features/admin/employeeDirectory/pages/EmployeeDirectory.jsx";
import TaskBoard from "../../features/admin/taskboard/pages/TaskBoard.jsx";
import Departments from "../../features/admin/departments/pages/Departments.jsx";
import TodayAttendance from "../../features/admin/attendance/pages/TodayAttendance.jsx";
import LeaveLedger from "../../features/admin/leaves/pages/LeaveLedger.jsx";

// ============================================================================
// Employee Portal & Auth Routes
// ============================================================================
// Employee portal page components and the public authentication entry point.
import EmployeeDashBoard from "../../features/employee/dashboard/pages/DashBoard.jsx";
import Login from "../../features/auth/pages/Login.jsx";
import EmployeeAttendance from "../../features/employee/attendance/pages/EmployeeAttendance.jsx";
import LeaveDashboardView from "../../features/employee/leaves/pages/LeaveDashboardView.jsx";
import EmployeeTaskList from "../../features/employee/tasks/pages/AssignedTasksPortal.jsx";
import EmployeeProfile from "../../features/employee/profile/pages/EmployeeProfileView.jsx";

// ============================================================================
// Shared Infrastructure
// ============================================================================
// Shared route infrastructure, context providers, and UI components.
import NotFoundPage from "../../shared/pages/NotFoundPage.jsx";
import LinearProgressStream from "../../shared/components/Animations/LinearProgressStream.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import DepartmentProvider from "../../features/admin/departments/context/DepartmentProvider.jsx";
import EmployeeProvider from "../../features/admin/employeeDirectory/context/EmployeeProvider.jsx";
import TaskBoardProvider from "../../features/admin/taskboard/contexts/TaskBoardProvider.jsx";
import DashBoardProvider from "../../features/employee/dashboard/contexts/DashboardProvider.jsx";
import EmployeeProfileProvider from "../../features/employee/profile/contexts/EmployeeProfileProvider.jsx";
import AttendanceCalenderProvider from "../../features/employee/attendance/context/AttendanceCalenderProvider.jsx";
import TaskBoardEmployeeProvider from "../../features/employee/tasks/context/TaskBoardEmployeeProvider.jsx";
import LeaveProvider from "../../features/employee/leaves/context/LeaveProvider.jsx";
import AdminLeaveProvider from "../../features/admin/leaves/context/AdminLeaveProvider.jsx";
import AttendanceProvider from "../../features/admin/attendance/context/AttendanceProvider.jsx";
import DashboardProvider from "../../features/admin/dashboard/contexts/DashboardProvider.jsx";

// ============================================================================
// Constants
// ============================================================================

/**
 * Minimum visible duration for route transition loading indicator (milliseconds).
 * Prevents the loading bar from flickering on fast route changes while still
 * providing visual feedback on slower navigation transitions.
 *
 * @type {number}
 * @constant
 */
const MIN_ROUTE_LOADER_TIME = 1000;

// ============================================================================
// Component Definition
// ============================================================================

/**
 * AppRoutes Component
 *
 * Defines the complete routing hierarchy for the WorkSync application with
 * support for two role-based portals: Admin and Employee. Implements:
 *
 * - **Authentication**: Public login route for all users
 * - **Admin Portal**: Protected routes for administrative functions (dashboard,
 *   employee directory, task management, department management, attendance tracking,
 *   leave management)
 * - **Employee Portal**: Protected routes for employee self-service (dashboard,
 *   attendance, leave requests, task assignments, profile management)
 * - **Route Protection**: All portal routes guarded by role-based ProtectedRoute component
 * - **Feature Providers**: Context providers mounted at route boundaries for feature-scoped
 *   state management
 * - **Route Transitions**: Visual loading indicator shown on every route change for
 *   consistent UX feedback
 *
 * @component
 * @returns {React.ReactElement} The application route tree with transition indicator
 *
 * @example
 * // Typical usage in App.jsx with React Router
 * <BrowserRouter>
 *   <AppRoutes />
 * </BrowserRouter>
 */
function AppRoutes() {
  // =========================================================================
  // State Management
  // =========================================================================

  /**
   * Loading state for route transition indicator.
   * Set to true when route pathname changes, then reset after MIN_ROUTE_LOADER_TIME.
   *
   * @type {[boolean, Function]}
   */
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Current location in the application.
   * Used to trigger loading indicator on pathname changes.
   *
   * @type {Location}
   */
  const location = useLocation();

  // =========================================================================
  // Effects
  // =========================================================================

  /**
   * Effect: Route Transition Loading Indicator
   *
   * Displays a loading indicator whenever the pathname changes to provide
   * visual feedback to users during route transitions. The loading state
   * is maintained for a minimum duration (MIN_ROUTE_LOADER_TIME) to prevent
   * flickering on fast transitions.
   *
   * Cleanup: Clears the timeout timer on component unmount or dependency change.
   */
  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, MIN_ROUTE_LOADER_TIME);

    return () => clearTimeout(timer);
  }, [location.pathname]);
  return (
    <>
      {/* Route transition loading indicator */}
      <LinearProgressStream isLoading={isLoading} />

      <Routes>
        {/* ===================================================================
            PUBLIC ROUTES (No authentication required)
            =================================================================== */}

        {/* Login page - Entry point for all users */}
        <Route path="/" element={<Login />} />

        {/* ===================================================================
            ADMIN PORTAL (Role: admin)
            Protected routes for administrative operations
            =================================================================== */}

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            {/* Dashboard - High-level admin overview and analytics */}
            <Route
              path="dashboard"
              element={
                <DashboardProvider>
                  <AdminDashBoard />
                </DashboardProvider>
              }
            />

            {/* Department Management - Create, update, delete departments */}
            <Route
              path="departments"
              element={
                <>
                  <DepartmentProvider>
                    <Departments />
                  </DepartmentProvider>
                </>
              }
            />

            {/* Employee Directory - Manage employee records and information */}
            <Route
              path="employees"
              element={
                <>
                  <EmployeeProvider>
                    <EmployeeDirectory />
                  </EmployeeProvider>
                </>
              }
            />

            {/* Task Management - Create and manage organizational tasks */}
            <Route
              path="tasks"
              element={
                <TaskBoardProvider>
                  <TaskBoard />
                </TaskBoardProvider>
              }
            />

            {/* Attendance Tracking - View today's attendance records */}
            <Route
              path="attendance"
              element={
                <AttendanceProvider>
                  <TodayAttendance />
                </AttendanceProvider>
              }
            />

            {/* Leave Management - Approve and manage leave requests */}
            <Route
              path="leaves"
              element={
                <AdminLeaveProvider>
                  <LeaveLedger />
                </AdminLeaveProvider>
              }
            />

            {/* Catch-all for undefined admin routes */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Route>

        {/* ===================================================================
            EMPLOYEE PORTAL (Role: employee)
            Protected routes for employee self-service functions
            =================================================================== */}

        <Route element={<ProtectedRoute allowedRoles={["employee"]} />}>
          <Route path="/employee" element={<EmployeeLayout />}>
            {/* Dashboard - Employee overview and key metrics */}
            <Route
              path="dashboard"
              element={
                <DashBoardProvider>
                  <EmployeeDashBoard />
                </DashBoardProvider>
              }
            />

            {/* Leave Management - Submit and track leave requests */}
            <Route
              path="leaves"
              element={
                <LeaveProvider>
                  <LeaveDashboardView />
                </LeaveProvider>
              }
            />

            {/* Attendance - View personal attendance records */}
            <Route
              path="attendance"
              element={
                <AttendanceCalenderProvider>
                  <EmployeeAttendance />
                </AttendanceCalenderProvider>
              }
            />

            {/* Task List - View assigned tasks and updates */}
            <Route
              path="tasks"
              element={
                <TaskBoardEmployeeProvider>
                  <EmployeeTaskList />
                </TaskBoardEmployeeProvider>
              }
            />

            {/* Profile - View and edit personal profile information
            <Route
              path="profile"
              element={
                <EmployeeProfileProvider>
                  <EmployeeProfile />
                </EmployeeProfileProvider>
              }
            /> */}

            {/* View another employee's profile by ID */}
            <Route
              path="profile/:employeeId"
              element={
                <EmployeeProfileProvider>
                  <EmployeeProfile />
                </EmployeeProfileProvider>
              }
            />

            {/* Catch-all for undefined employee routes */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Route>

        {/* ===================================================================
            FALLBACK ROUTE (Undefined paths)
            =================================================================== */}

        {/* Global catch-all for any undefined routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
