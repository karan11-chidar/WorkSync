import React from 'react'
function StateCard(props) {
  return (
    <div
      className="
    bg-white
   p-5
    rounded-2xl
    border
    border-slate-100
    shadow-sm
    flex
    items-center
    justify-between
    hover:-translate-y-1
    hover:shadow-lg
    transition-all
    duration-200
  "
    >
      <div className="space-y-1">
        <span className="md:text-xs   font-medium text-slate-500 uppercase tracking-wider text-[0.7rem]">
          {props.title}
        </span>

        <div className="flex items-baseline gap-2">
          <span className="md:text-3xl font-semibold text-slate-900 text-xl">
0          </span>

          <span className={` text-[0.5rem] md:text-xs ${props.bgColor} ${props.textColor}  md:px-1.5 md:py-0.5 rounded-md font-medium flex items-center gap-0.5 md:text-nowrap`}>
            <props.cardMiniIcon className="h-3 w-3" />
            {props.subTitle}
          </span>
        </div>
      </div>

      <div className={`md:p-3 p-2 mt-3 rounded-xl ${props.bgColor} ${props.textColor}`} >
        <props.cardIcon className="md:h-6 md:w-6 h-5 w-5" />
      </div>
    </div>
  );
}

export default StateCard
