import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({ navItems, headerTitle }) {
  const isRoutingAdmin = headerTitle?.toLowerCase().includes("admin");
  const basePath = isRoutingAdmin ? "/admin" : "/employee";
  return (
    <div>
      {/* Sidebar Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id} // 1. Key ekdum opening tag ke andar aayi
              id={`nav-${item.id}`}
              to={`${basePath}/${item.id}`}
              // 3. True Function Syntax: Pura className hi ek function hai
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-150 cursor-pointer ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-xs font-bold"
                    : "hover:bg-slate-800/60 hover:text-white text-slate-400"
                }`
              }
            >
              {/* 4. Children elements parameters */}
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}

export default Navbar;
