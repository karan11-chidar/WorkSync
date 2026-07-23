import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../shared/components/Sidebar/SideBar";
import MobileHeader from "../shared/components/MobileHeader";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  ListTodo,
  Clock,
  CalendarClock,
} from "lucide-react";
import LinearProgressStream from "../shared/components/Animations/LinearProgressStream";
import { useAuth } from "../features/auth/context/AuthContext";
import { toastSuccess } from "../shared/services/toastService";
function AdminLayout() {
  const { hideLoader } = useAuth();
  useEffect(() => {
    hideLoader();
          toastSuccess("login successfully ");

  }, []);
  // 🔥 ADMIN NAVIGATION MATRIX (100% Lowercase & Space-Free IDs)
  const navItemsAdmin = [
    { id: "dashboard", label: "Company Overview", icon: LayoutDashboard },
    { id: "employees", label: "Employee Directory", icon: Users },
    { id: "departments", label: "Departments", icon: Briefcase },
    { id: "tasks", label: "Tasks Board", icon: ListTodo },
    { id: "attendance", label: "Today's Attendance", icon: Clock },
    { id: "leaves", label: "Leave Ledger", icon: CalendarClock },
  ];
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div className="h-screen flex flex-col md:flex-row">
      <LinearProgressStream />
      {/* Mobile Header */}
      <div className="md:hidden">
        <MobileHeader
          headerTitle="Admin Portal"
          setOpenSidebar={setOpenSidebar}
        />
      </div>
      {/* Desktop Layout */}
      <div className="flex h-full w-full">
        <SideBar
          navItems={navItemsAdmin}
          headerTitle="Admin Portal"
          openSidebar={openSidebar}
          setOpenSidebar={setOpenSidebar}
        />
        <main className="flex-1 md:overflow-y-auto bg-slate-50 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
