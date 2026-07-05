import React from 'react'
import logo from "../assets/c-logo.png";
import { Menu } from "lucide-react";
function MobileHeader({headerTitle}) {
  return (
    <div className="md:hidden lg:hidden h-16 flex items-center bg-slate-900 justify-between border-b border-slate-800 px-4">
      <div className="flex items-center gap-2">
        <img
          src={logo}
          alt="HR Horizon Logo"
          className="
        h-14
        w-14
        object-contain
        drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]
      "
        />

        <div>
          <h1 className="text-sm font-bold text-white tracking-wider uppercase">
            {headerTitle}
          </h1>

          <span className="text-[10px] text-slate-500 font-semibold block">
            Enterprise Workspace
          </span>
        </div>
      </div>

      <button
        // onClick={}
        className="md:hidden p-1.5 text-slate-400 hover:text-white">
        <Menu className="h-5 w-5" />
      </button>
    </div>
  );
}

export default MobileHeader
