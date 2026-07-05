import React from 'react'

function Header() {
  return (
    <div className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-2 lg:gap-4">
      <div>
        <h2 className="text-[1rem] lg:text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
          Welcome back, Karan! 👋
        </h2>
        <p className="text-xs md:text-sm text-slate-500 mt-1 hidden lg:block">
          Select any hub page below to clock-in, track your month attendance,
          file a time-off or manage assignments.
        </p>
      </div>

      <div className="flex items-center text-nowrap bg-indigo-50 border border-indigo-100 rounded-xl px-2 py-2 lg:px-4 lg:py-2.5 text-indigo-900 text-[0.625rem] lg:text-xs font-bold font-mono">
        Employee ID: EMP:12
      </div>
    </div>
  );
}

export default Header
