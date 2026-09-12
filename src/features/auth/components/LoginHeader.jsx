import React from "react";
import logo from "../../../../public/icon-512.png";

/**
 * Renders the elite branding header for the login page.
 *
 * @returns {JSX.Element} The login header.
 */
function Header() {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-xl text-center flex items-center justify-center flex-col">
      <div className="relative mb-3 group">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-3xl blur-md opacity-40 group-hover:opacity-75 transition duration-500"></div>
        <img
          src={logo}
          alt="Workforce Management System Logo"
          className="relative rounded-2xl h-16 w-16 sm:h-20 sm:w-20 object-contain bg-slate-900 p-1 border border-slate-700/80 shadow-2xl transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <h2 className="text-[1rem] sm:text-xl md:text-2xl font-bold text-white tracking-tight text-center px-2">
        Workforce Management System
      </h2>
      <p className="mt-1.5 text-xs sm:text-sm text-slate-400 font-medium">
        Professional workspace environment for Admin and Employees
      </p>
    </div>
  );
}

export default Header;
