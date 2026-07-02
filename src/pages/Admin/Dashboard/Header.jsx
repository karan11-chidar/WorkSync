import React from 'react'

function Header() {
  return (
    <div
      className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs"
      id="dashboard-header-panel"
    >
      <div>
        <h1 className="text-xl md:text-2xl font-semibold text-slate-900 tracking-tight">
          Workplace Overview
        </h1>
        <p className="text-[0.7rem] md:text-sm text-slate-500 mt-1">
          Real-time statistics, departmental health, and quick actions
          checklist.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span className="flex h-3 w-3 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
        <span className=" text-[0.7rem] md:text-xs font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
          System Live: Today
        </span>
      </div>
    </div>
  );
}

export default Header
