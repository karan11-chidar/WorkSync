import React from "react";
import DashBoard from "./pages/Admin/Dashboard/DashBoard.jsx";
import SideBar from "./components/Sidebar/SideBar.jsx";
import MobileHeader from "./components/MobileHeader.jsx";
import EmployeeDirectory from "./pages/Admin/EmployeeDirectory/EmployeeDirectory.jsx";
import TaskBoard from "./pages/Admin/TaskBoard/TaskBoard.jsx";
import Departments from "./pages/Admin/Departments/Departments.jsx";
import TodayAttendance from "./pages/Admin/Attendance/TodayAttendance.jsx";

function App() {
  return (
    <div className="h-screen ">
      {/* Mobile Header */}
      <div className="md:hidden">
        <MobileHeader />
      </div>

      {/* Desktop Layout */}
      <div className="flex h-full">
        <SideBar />

        <main className="flex-1 md:overflow-y-auto">
          {/* <DashBoard /> */}
          {/* <EmployeeDirectory/> */}
          {/* <Departments/> */}
          {/* <TaskBoard /> */}
          {/* <TodayAttendance/> */}
        </main>
      </div>
    </div>
  );
}

export default App;
