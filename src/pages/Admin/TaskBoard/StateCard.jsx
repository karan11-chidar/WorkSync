import React from 'react'
function StateCard(props) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs lg:gap-0 gap-2 flex items-center justify-between hover:shadow-md transition-all duration-200 hover:scale-[1.01] ">
      <div>
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block">
          {props.title}
        </span>
        <span className="text-3xl font-semibold text-slate-900 block mt-1">0
          {/* {props.stats.total} */}
        </span>
      </div>
      <div className={`p-3 ${props.bgColor} ${props.textColor} rounded-xl hover:scale-105 transition-all duration-200`}>
        <props.icon className=" h-4 w-4 lg:h-6 lg:w-6" />
      </div>
    </div>
  );
}

export default StateCard
