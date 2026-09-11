import React from "react";

/**
 * Displays one administrator dashboard metric card with compact and balanced typography.
 *
 * @param {Object} props - Metric card properties.
 * @returns {JSX.Element} The metric card.
 */
function StateCard(props) {
  return (
    <div
      className="
        bg-white 
        p-4 
        sm:p-4.5 
        rounded-2xl 
        border 
        border-slate-100 
        shadow-sm 
        flex 
        items-center 
        justify-between 
        gap-3 
        hover:-translate-y-0.5 
        hover:shadow-md 
        transition-all 
        duration-200 
        min-w-0
      "
    >
      {/* Left Text and Stats Container */}
      <div className="space-y-1 min-w-0 flex-1">
        <span className="font-semibold text-slate-400 uppercase tracking-wider text-[0.5rem] md:text-[10px] block whitespace-nowrap">
          {props.title}
        </span>

        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 min-w-0">
          <span className="text-base sm:text-lg md:text-xl font-bold text-slate-900 tracking-tight truncate">
            {props.statsValue || "0"}
          </span>

          <span
            className={`
              text-[9px] 
              ${props.bgColor || "bg-slate-50"} 
              ${props.textColor || "text-slate-600"} 
              px-1.5 
              py-0.2 
              rounded-md 
              font-medium 
              inline-flex 
              items-center 
              gap-0.5 
              shrink-0
            `}
          >
            {props.cardMiniIcon && (
              <props.cardMiniIcon className="h-2.5 w-2.5 shrink-0" />
            )}
            <span className="truncate">{props.subTitle}</span>
          </span>
        </div>
      </div>

      {/* Right Icon Container */}
      <div
        className={`
          p-1.4
          md:p-2.5 
          rounded-xl 
          ${props.bgColor || "bg-slate-50"} 
          ${props.textColor || "text-slate-600"} 
          shrink-0 
          flex 
          items-center 
          justify-center
        `}
      >
        {props.cardIcon && <props.cardIcon className="h-5 w-5" />}
      </div>
    </div>
  );
}

export default StateCard;
