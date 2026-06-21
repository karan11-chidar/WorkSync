import React from 'react'
import logo from "../../assets/c-logo.png";

function Header() {
  return (
      <div
              className="h-16 flex items-center  border-b border-slate-800  "
            >
              <div className="flex justify-center  ">
                      <img
                        src={logo}
                        alt="Workforce Management System Logo"
                        className="
             h-10
              w-10
              sm:h-15
              sm:w-10
              md:h-20
              md:w-20
              object-contain
                    drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]
                    hover:scale-105
                    transition-all
                    duration-300
                  "
                      />
                    </div>
              <div>
                <h1 className="text-sm font-bold text-white tracking-wider uppercase font-sans">
                  HR Horizon
                </h1>
                <span className="text-[10px] text-slate-500 font-mono tracking-tight font-semibold block text-nowrap">
                  Enterprise Workspace
                </span>
              </div>
            </div>
  )
}

export default Header
