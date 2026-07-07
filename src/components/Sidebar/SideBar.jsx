import React from "react";
import Header from "./SideBarHeader";
import Navbar from "./Navbar";
import Footer from "./Footer";

function SideBar({navItems,headerTitle}) {
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
      <Header headerTitle={headerTitle} />

      <div className="flex-1 overflow-y-auto">
        <Navbar navItems={navItems} headerTitle={headerTitle } />
      </div>

      <Footer headerTitle={ headerTitle} />
    </aside>
  );
}

export default SideBar;