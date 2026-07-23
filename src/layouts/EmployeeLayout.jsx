import { useEffect, useState } from "react";
import { Form, Outlet } from "react-router-dom";
import SideBar from "../shared/components/Sidebar/SideBar";
import MobileHeader from "../shared/components/MobileHeader";
import LinearProgressStream from "../shared/components/Animations/LinearProgressStream";
import { Home, CalendarCheck, FileText, CheckSquare, User } from "lucide-react";
import { useAuth } from "../features/auth/context/AuthContext";
function EmployeeLayout() {
  const { hideLoader } = useAuth();
  useEffect(() => {
    hideLoader();
  }, []);
  // 🔥 EMPLOYEE NAVIGATION MATRIX (Clean CamelCase & Symbol-Free IDs)
  const navItemsEmployee = [
    { id: "dashboard", label: "Home", icon: Home },
    { id: "attendance", label: "Attendance & Calendar", icon: CalendarCheck },
    { id: "leaves", label: "Time-Off / Leaves", icon: FileText },
    { id: "tasks", label: "My Tasks", icon: CheckSquare },
    { id: "profile", label: "Profile", icon: User },
  ];
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div className="h-screen flex flex-col md:flex-row">
      <LinearProgressStream />

      <div className="md:hidden">
        <MobileHeader
          headerTitle="Employee Portal"
          setOpenSidebar={setOpenSidebar}
        />
      </div>
      <div className="flex h-full w-full">
        <SideBar
          navItems={navItemsEmployee}
          headerTitle="Employee Portal"
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

export default EmployeeLayout;
