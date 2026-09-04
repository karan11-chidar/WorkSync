import React from 'react'

function StateCard({title,textColor,stats}) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs lg:gap-0 gap-2 flex-col items-center justify-between hover:shadow-md transition-all duration-200 hover:scale-[1.01] ">
      <span className={`text-[10px] uppercase font-bold ${textColor} tracking-wider`}>
        {title}
      </span>
      <div className="text-xl font-bold text-slate-900 mt-1">{stats}</div>
    </div>
  );
}

export default StateCard
