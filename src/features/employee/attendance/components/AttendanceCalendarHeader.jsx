import React from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

export default function AttendanceCalendarHeader({
  currentMonth,
  monthNames,
  handlePrevMonth,
  handleNextMonth,
  onResetToday,
}) {
  return (
    <div className="bg-slate-900 text-white p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      {/* Title Details */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-600 rounded-xl shrink-0 shadow-md shadow-indigo-600/10">
          <CalendarDays className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-xs sm:text-sm font-bold tracking-wider uppercase">
            Attendance Calendar
          </h3>
          <p className="text-[10px] text-indigo-300 font-mono font-bold mt-0.5 uppercase tracking-wide">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </p>
        </div>
      </div>

      {/* Control Navigation Buttons */}
      <div className="flex items-center gap-1.5 self-end sm:self-auto">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="p-2 hover:bg-slate-800 text-white rounded-xl transition-all border border-slate-800 cursor-pointer active:scale-95"
          title="Previous Month"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onResetToday}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-[11px] font-bold rounded-xl transition-all border border-slate-700 cursor-pointer active:scale-95 text-slate-200"
        >
          Today
        </button>
        <button
          type="button"
          onClick={handleNextMonth}
          className="p-2 hover:bg-slate-800 text-white rounded-xl transition-all border border-slate-800 cursor-pointer active:scale-95"
          title="Next Month"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
