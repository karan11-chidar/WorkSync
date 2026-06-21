import React,{useState} from 'react'
import {
  LayoutDashboard, Users, Briefcase, Clock,CalendarClock,Settings} from 'lucide-react';
function Navbar() {
  // / Render navigation lists
  const navItems = [
    { id: "home", label: "Company Overview", icon: LayoutDashboard },
    { id: "employees", label: "Employee Directory", icon: Users },
    { id: "attendance", label: "Today's Attendance", icon: Clock },
    { id: "leaves", label: "Leave Ledger", icon: CalendarClock },
    { id: "settings", label: "Console & Backup", icon: Settings },
  ]; // 1. Core States loaded with fallback LocalStorage persistence
  const [activeTab, setActiveTab] = useState('Home')
   
  return (
    <div>
      {/* Sidebar Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1.5" id="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-150 cursor-pointer ${
                isActive
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "hover:bg-slate-800/60 hover:text-white text-slate-400"
              }`}
              id={`nav-${item.id}`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default Navbar
