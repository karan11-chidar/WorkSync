import React from "react";
import Header from "./SideBarHeader";
import Navbar from "./Navbar";
import Footer from "./Footer";

function SideBar() {
  return (
    <aside
      className="
        hidden
        md:flex
        flex-col
        w-64
        h-screen
        bg-slate-900
        border-r
        border-slate-800
        shrink-0
      "
    >
      <Header />

      <div className="flex-1 overflow-y-auto">
        <Navbar />
      </div>

      <Footer />
    </aside>
  );
}

export default SideBar;