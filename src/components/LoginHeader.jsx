import React from "react";
import logo from "../assets/c-logo.png";

function Header() {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-xl text-center flex items-center justify-center flex-col">
      <div className="flex justify-center mb-2">
        <img
          src={logo}
          alt="Workforce Management System Logo"
          className="
     h-20
w-20
sm:h-24
sm:w-24
md:h-28
md:w-28
object-contain
      drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]
      hover:scale-105
      transition-all
      duration-300
    "
        />
      </div>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight text-center px-2">
        Workforce Management System
      </h2>
      <p className="mt-2 text-sm text-slate-400">
        Professional workspace environment for Admin and Employees
      </p>
    </div>
  );
}

export default Header;
