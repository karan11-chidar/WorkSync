import React from 'react'
import { LogOut } from 'lucide-react';
function Footer() {
  return (
    <div className="mt-auto p-4 border-t border-slate-800">
      <div className="mt-4 text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
        Operations Console
      </div>

      <p className="text-[10px] text-slate-400 mt-2">
        Authorized administrator connection logged live.
      </p>
      <div className="p-4 border-t border-slate-800 space-y-3">
        <button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-rose-450 font-bold rounded-lg text-xs active:scale-95">
          <LogOut className="h-3.5 w-3.5" /> Sign Out
        </button>
        <div className="text-[10px] text-slate-500 font-medium text-center">
          Admin Level Logging Live
        </div>
      </div>
    </div>
  );
}

export default Footer
