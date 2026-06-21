import React from "react";
import Login from "./pages/Login/Login.jsx";
import DashBoard from "./pages/Admin/Dashboard/DashBoard.jsx";
import SideBar from "./components/Sidebar/SideBar.jsx";
function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      <SideBar />
      {/* <Login/> */}
      {/* <DashBoard/> */}
    </div>
  );
}

export default App;
