import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";
function SideBar() {
  return (
    <div>
      <aside className="min-h-screen hidden md:flex flex-col w-64 bg-slate-900 text-slate-300 border-r border-slate-800 shrink-0 select-none">
        <Header />
        <Navbar />
        <Footer />
      </aside>
    </div>
  );
}

export default SideBar;
