import React from "react";
import Header from "./SideBarHeader";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { X } from "lucide-react";

function SideBar({ navItems, headerTitle, openSidebar, setOpenSidebar }) {
  return (
    <>
      {openSidebar && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm md:hidden transition-opacity duration-300"
          onClick={() => setOpenSidebar(false)}
        />
      )}

      <aside
        className={`fixed md:static top-0 left-0 z-50 flex flex-col w-68 h-screen bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 text-slate-200 border-r border-slate-800/60 shadow-2xl shadow-black/50 transition-all duration-300 ease-in-out
          ${openSidebar ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Mobile Close Button - Positioned elegantly inside the header area */}
        <button
          className="absolute top-5 right-4 md:hidden text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 transition-all duration-200 active:scale-95"
          onClick={() => setOpenSidebar(false)}
          aria-label="Close Sidebar"
        >
          <X size={18} />
        </button>

        {/* Sidebar Header Container */}
        <div className="px-2 pt-2">
          <Header headerTitle={headerTitle} />
        </div>

        {/* Navigation Items - Scrollbar customized for clean look */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 scrollbar-none custom-scrollbar">
          <Navbar navItems={navItems} headerTitle={headerTitle} />
        </div>

        {/* Sidebar Footer Container */}
        <div className="p-4 border-t border-slate-800/60 bg-slate-950/30">
          <Footer headerTitle={headerTitle} />
        </div>
      </aside>
    </>
  );
}

export default SideBar;
