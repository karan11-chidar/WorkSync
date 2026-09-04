import React from "react";

function StateCards({ title, value, subTitle, icon: Icon, colorTheme }) {
  // थीम्स का प्रीमियम कॉन्फ़िगरेशन मैप
  const themeMap = {
    emerald: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      border: "hover:border-emerald-200",
    },
    amber: {
      bg: "bg-amber-50",
      text: "text-amber-600",
      border: "hover:border-amber-200",
    },
    sky: {
      bg: "bg-sky-50",
      text: "text-sky-600",
      border: "hover:border-sky-200",
    },
    rose: {
      bg: "bg-rose-50",
      text: "text-rose-600",
      border: "hover:border-rose-200",
    },
    indigo: {
      bg: "bg-indigo-50",
      text: "text-indigo-600",
      border: "hover:border-indigo-200",
    },
  };

  const currentTheme = themeMap[colorTheme] || themeMap.indigo;

  return (
    <div
      className={`bg-white border border-slate-100 rounded-2xl p-4 shadow-sm transition-all duration-200 flex flex-col justify-between items-center text-center group ${currentTheme.border}`}
    >
      {/* Top Section: Icon and Title */}
      <div className="flex  items-center space-y-1.5 w-full gap-0 lg:gap-4">
        <span className="text-[0.6rem] text-slate-400 font-bold uppercase tracking-wider block">
          {title}
        </span>
        {Icon && (
          <div
            className={`p-2 rounded-xl ${currentTheme.bg} ${currentTheme.text} transition-transform group-hover:scale-105 duration-200`}
          >
            <Icon size={16} />
          </div>
        )}
      </div>

      {/* Middle Section: Big Dynamic Value */}
      <h2
        className={`text-[0.725rem] md:text-2xl font-black block mt-2 tracking-tight ${currentTheme.text}`}
      >
        {value}
      </h2>

      {/* Bottom Section: Subtitle Context */}
      <span className="text-[0.525rem] font-medium text-slate-400 block mt-1 leading-tight">
        {subTitle}
      </span>
    </div>
  );
}

export default StateCards;
