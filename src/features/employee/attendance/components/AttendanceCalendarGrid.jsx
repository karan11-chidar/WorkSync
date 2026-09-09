import React, { useState } from "react";
import { Coffee, LogIn, LogOut, X, Calendar, Clock } from "lucide-react";
import { useAttendanceCalender } from "../context/AttendanceCalenderContext";

/**
 * Attendance Calendar Grid Component.
 *
 * Renders an interactive calendar matrix mapping Firestore attendance records.
 * Provides a responsive modal layout with special highlighting for active working status.
 *
 * @component
 * @returns {JSX.Element} The rendered attendance grid canvas.
 */
export default function AttendanceCalendarGrid() {
  const {
    calendarDays,
    attendanceRecords,
    employeeId,
    getFormattedDate,
    formatTimeFromStamp,
  } = useAttendanceCalender();

  const [selectedDayModal, setSelectedDayModal] = useState(null);
  const todayDateString = getFormattedDate(new Date());

  /**
   * Status ke according visual styling aur colors resolve karta hai.
   */
  const getStatusMeta = (
    status,
    isWeekend,
    isToday,
    isPast,
    hasRecord,
    checkIn,
    checkOut,
  ) => {
    const st = String(status || "").toUpperCase();

    // Check if employee is currently working (Clocked in but not checked out)
    const isWorkingNow =
      checkIn && (!checkOut || checkOut === "Active Working");

    if (isWorkingNow || st === "WORKING" || st === "ACTIVE WORKING") {
      return {
        bg: "bg-amber-100/90 border-amber-300 text-amber-900 hover:bg-amber-200/80 active:bg-amber-300/60",
        dot: "bg-amber-500 animate-ping",
        label: "Working Now",
        themeType: "working",
      };
    }
    if (st === "COMPLETED" || st === "PRESENT" || st === "ON TIME") {
      return {
        bg: "bg-emerald-50/90 border-emerald-100 text-emerald-800 hover:bg-emerald-100/80 active:bg-emerald-200/60",
        dot: "bg-emerald-500",
        label: "Present",
        themeType: "present",
      };
    }
    if (st === "LATE") {
      return {
        bg: "bg-amber-50/90 border-amber-100 text-amber-800 hover:bg-amber-100/80 active:bg-amber-200/60",
        dot: "bg-amber-500",
        label: "Late Clock-in",
        themeType: "late",
      };
    }
    if (isToday) {
      return {
        bg: "bg-white border-indigo-600 ring-2 ring-indigo-500/20 text-indigo-900 font-bold",
        dot: "bg-indigo-600 animate-pulse",
        label: hasRecord ? status : "Today",
        themeType: "today",
      };
    }
    if (isWeekend) {
      return {
        bg: "bg-slate-50/80 border-slate-100 text-slate-400",
        dot: "bg-slate-300",
        label: "Weekend Off",
        themeType: "weekend",
      };
    }
    if (isPast && !hasRecord) {
      return {
        bg: "bg-indigo-50/70 border-indigo-100 text-indigo-800 hover:bg-indigo-100/70 active:bg-indigo-200/60",
        dot: "bg-indigo-500",
        label: "On Leave / Absent",
        themeType: "absent",
      };
    }
    return {
      bg: "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 active:bg-slate-100",
      dot: "bg-transparent",
      label: "Future Day",
      themeType: "future",
    };
  };

  return (
    <div className="p-3 sm:p-6 bg-white space-y-4 sm:space-y-6 relative">
      {/* 1. Weekday Names Header */}
      <div className="grid grid-cols-7 gap-1 sm:gap-3 text-center text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-wider font-mono">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>

      {/* 2. Calendar Grid Cells */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-3">
        {calendarDays.map((day, idx) => {
          const dateStr = getFormattedDate(day.date);
          const isCurrentMonth = day.isCurrentMonth;

          const att = attendanceRecords.find(
            (a) =>
              (a.employeeId === employeeId || a.uid === employeeId) &&
              a.date === dateStr,
          );

          const isWeekend = day.date.getDay() === 0 || day.date.getDay() === 6;
          const isToday = dateStr === todayDateString;
          const todayObj = new Date();
          todayObj.setHours(0, 0, 0, 0);
          const isPast = day.date < todayObj;
          const hasRecord = Boolean(att);

          const checkInTime = att?.checkIn
            ? formatTimeFromStamp(att.checkIn)
            : null;
          const checkOutTime = att?.checkOut
            ? formatTimeFromStamp(att.checkOut)
            : null;
          const breakMinutes = att?.totalBreakMinutes ?? 0;

          const meta = getStatusMeta(
            att?.status,
            isWeekend,
            isToday,
            isPast,
            hasRecord,
            checkInTime,
            checkOutTime,
          );

          let summaryTimeText = "";
          if (checkInTime) {
            summaryTimeText =
              checkInTime +
              (checkOutTime ? ` - ${checkOutTime}` : " (Working)");
          } else if (isPast && !isWeekend && !hasRecord) {
            summaryTimeText = "No Record Logged";
          }

          const dayData = {
            date: dateStr,
            dayNum: day.dayNum,
            label: meta.label,
            checkIn: checkInTime || "Not Clocked In",
            checkOut:
              checkOutTime ||
              (att?.checkIn ? "Active Working" : "Not Clocked Out"),
            breakMinutes: breakMinutes,
            hasRecord: hasRecord,
            themeType: meta.themeType,
          };

          const handleCellClick = () => {
            if (isCurrentMonth) {
              setSelectedDayModal(dayData);
            }
          };

          return (
            <div
              key={idx}
              onClick={handleCellClick}
              className={`p-1.5 sm:p-2.5 border rounded-2xl flex flex-col justify-between transition-all duration-150 cursor-pointer select-none min-h-14 sm:min-h-20 shadow-2xs active:scale-95 ${
                !isCurrentMonth
                  ? "bg-slate-50/20 text-slate-200 border-slate-100 pointer-events-none opacity-20"
                  : meta.bg
              }`}
            >
              {/* Day Number Box */}
              <div className="flex items-center justify-between w-full">
                <span
                  className={`text-[11px] sm:text-xs font-bold font-mono ${
                    isToday
                      ? "h-5 w-5 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[10px] shadow-xs"
                      : ""
                  }`}
                >
                  {day.dayNum}
                </span>

                {/* Mobile View Indicator Dot */}
                {isCurrentMonth && meta.label !== "Future Day" && (
                  <span
                    className={`h-2 w-2 rounded-full sm:hidden ${meta.dot}`}
                  />
                )}
              </div>

              {/* Desktop View Detailed Text */}
              {isCurrentMonth && (
                <div className="hidden sm:block space-y-0.5 mt-2 text-left w-full min-w-0">
                  {meta.label && meta.label !== "Future Day" && (
                    <span className="block text-[9px] font-black uppercase tracking-wide truncate">
                      {meta.label}
                    </span>
                  )}
                  {summaryTimeText && (
                    <span className="block text-[8px] opacity-80 font-mono tracking-tight font-semibold truncate">
                      {summaryTimeText}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 3. RESPONSIVE MODAL (Mobile Bottom Sheet / Desktop Centered Dialog) */}
      {selectedDayModal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/70 backdrop-blur-xs p-0 sm:p-4 transition-all duration-200"
          onClick={() => setSelectedDayModal(null)}
        >
          <div
            className="w-full sm:max-w-xs bg-slate-900 text-white p-5 sm:p-6 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-800 space-y-4 sm:space-y-5 animate-in slide-in-from-bottom-5 sm:zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Visual Drag Handle */}
            <div className="w-12 h-1 bg-slate-700/80 rounded-full mx-auto sm:hidden -mt-1 mb-2" />

            {/* Header: Date & Status Badge */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 sm:pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
                  <Calendar size={18} />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-slate-300 block">
                    {selectedDayModal.date}
                  </span>
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">
                    Day {selectedDayModal.dayNum} Details
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider ${
                    selectedDayModal.themeType === "working"
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      : selectedDayModal.hasRecord
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-slate-800 text-slate-400 border border-slate-700"
                  }`}
                >
                  {selectedDayModal.label}
                </span>

                <button
                  type="button"
                  onClick={() => setSelectedDayModal(null)}
                  className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl transition-colors cursor-pointer active:scale-90"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Content Cards */}
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-3 bg-slate-800/40 rounded-2xl border border-slate-800/80">
                <span className="flex items-center gap-2.5 text-slate-300 font-semibold">
                  <LogIn size={16} className="text-emerald-400 shrink-0" />
                  Clock In
                </span>
                <span className="font-mono font-bold text-white text-xs sm:text-sm">
                  {selectedDayModal.checkIn}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-800/40 rounded-2xl border border-slate-800/80">
                <span className="flex items-center gap-2.5 text-slate-300 font-semibold">
                  <LogOut size={16} className="text-amber-400 shrink-0" />
                  Clock Out
                </span>
                <span className="font-mono font-bold text-white text-xs sm:text-sm">
                  {selectedDayModal.checkOut}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-800/40 rounded-2xl border border-slate-800/80">
                <span className="flex items-center gap-2.5 text-slate-300 font-semibold">
                  <Coffee size={16} className="text-sky-400 shrink-0" />
                  Total Break
                </span>
                <span className="font-mono font-bold text-sky-300 text-xs sm:text-sm">
                  {selectedDayModal.breakMinutes} Mins
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Color Legend Row */}
      <div className="mt-4 sm:mt-6 pt-4 sm:pt-5 border-t border-slate-100 flex flex-wrap gap-x-4 gap-y-2 items-center justify-center text-[10px] sm:text-xs font-bold text-slate-400 select-none">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 bg-amber-400 rounded-full animate-pulse" />
          <span className="text-slate-600">Working Now</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 bg-emerald-500 rounded-full" />
          <span className="text-slate-600">Present</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 bg-amber-600 rounded-full" />
          <span className="text-slate-600">Late</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 bg-indigo-500 rounded-full" />
          <span className="text-slate-600">On Leave / Absent</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 bg-slate-300 rounded-full" />
          <span className="text-slate-600">Weekend Off</span>
        </div>
      </div>
    </div>
  );
}
