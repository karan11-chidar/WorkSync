import React, { useState } from "react";
import {
  Clock,
  LogIn,
  LogOut,
  Coffee,
  Play,
  CheckCircle2,
  CalendarDays,
} from "lucide-react";

export default function DailyClockCard() {
  const todayDateString = "Sunday, July 5, 2026";

  // स्टेट फ्लो: 'NOT_CLOCKED_IN' -> 'WORKING' -> 'ON_BREAK' -> 'COMPLETED'
  const [clockState, setClockState] = useState("NOT_CLOCKED_IN");

  // टाइमिंग रिकॉर्ड्स
  const [timeLogs, setTimeLogs] = useState({
    checkIn: "--:--",
    checkOut: "--:--",
    breakStart: null,
    totalBreakMins: 0,
  });

  // 1. Clock In Handler
  const handleClockIn = () => {
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setTimeLogs((prev) => ({ ...prev, checkIn: currentTime }));
    setClockState("WORKING");
  };

  // 2. Break Toggle Handler
  const handleBreakToggle = () => {
    if (clockState === "WORKING") {
      setClockState("ON_BREAK");
    } else if (clockState === "ON_BREAK") {
      setTimeLogs((prev) => ({
        ...prev,
        totalBreakMins: prev.totalBreakMins + 15,
      }));
      setClockState("WORKING");
    }
  };

  // 3. Clock Out Handler
  const handleClockOut = () => {
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setTimeLogs((prev) => ({ ...prev, checkOut: currentTime }));
    setClockState("COMPLETED");
  };

  return (
    <div className="w-full max-w-xl mx-auto p-2">
      <div
        className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-5"
        id="today-clock-card"
      >
        {/* Header Section - Mobile Safe flex row */}
        <div className="flex flex-col lg:flex-row items-center justify-between border-b border-slate-100 pb-3.5 gap-2">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 shrink-0">
            <Clock
              className={`h-4 w-4 text-indigo-500 ${clockState === "WORKING" ? "animate-spin [animation-duration:3s]" : ""}`}
            />
            Attendance & Clock Daily
          </h3>
          <span className=" text-[0.625rem] lg:text-[10px] sm:text-[11px]  font-mono text-slate-400 font-bold flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md border border-slate-100/50 truncate">
            <CalendarDays className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            {todayDateString}
          </span>
        </div>

        {/* Status Banner - Stacked on mobile, side-by-side on sm screens */}
        <div className="p-4 bg-slate-50/80 border border-slate-100 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`p-3 rounded-xl transition-all duration-300 shadow-xxs shrink-0 ${
                clockState === "NOT_CLOCKED_IN"
                  ? "bg-indigo-50 text-indigo-600 ring-4 ring-indigo-50/50"
                  : clockState === "WORKING"
                    ? "bg-emerald-50 text-emerald-600 ring-4 ring-emerald-50"
                    : clockState === "ON_BREAK"
                      ? "bg-amber-50 text-amber-600 ring-4 ring-amber-50"
                      : "bg-slate-100 text-slate-600"
              }`}
            >
              {clockState === "ON_BREAK" ? (
                <Coffee className="h-5 w-5" />
              ) : (
                <Clock className="h-5 w-5" />
              )}
            </div>
            <div>
              <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-wider">
                Current Status
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 block mt-0.5">
                {clockState === "NOT_CLOCKED_IN" &&
                  "Absent • Shift Not Started"}
                {clockState === "WORKING" && "Active • On The Clock"}
                {clockState === "ON_BREAK" && "Stepped Out • On Break"}
                {clockState === "COMPLETED" && "Shift Finished • Signed Out"}
              </span>
            </div>
          </div>

          {/* Time logs inside banner - Handled with borders for mobile formatting */}
          {clockState !== "NOT_CLOCKED_IN" && (
            <div className="flex flex-row sm:flex-col justify-start sm:text-right font-mono text-[10px] text-slate-400 gap-3 sm:gap-0.5 pt-2 sm:pt-0 border-t sm:border-t-0 sm:border-l border-slate-200 sm:pl-4">
              <div>
                In:{" "}
                <span className="text-slate-700 font-bold">
                  {timeLogs.checkIn}
                </span>
              </div>
              {timeLogs.totalBreakMins > 0 && (
                <div>
                  Break:{" "}
                  <span className="text-amber-600 font-bold">
                    {timeLogs.totalBreakMins}m
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* INTERACTIVE CONTROLLER BUTTONS */}
        <div className="w-full">
          {clockState === "NOT_CLOCKED_IN" && (
            <button
              type="button"
              onClick={handleClockIn}
              className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 justify-center cursor-pointer shadow-sm transition-all active:scale-[0.99]"
            >
              <LogIn className="h-4 w-4" />
              Clock-In Shift
            </button>
          )}

          {(clockState === "WORKING" || clockState === "ON_BREAK") && (
            /* MOBILE FIX: Vertical layout on mobile (flex-col), Grid on larger screens (sm:grid-cols-2) */
            <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleBreakToggle}
                className={`h-11 font-bold rounded-xl text-xs flex items-center gap-2 justify-center cursor-pointer transition-all active:scale-[0.99] border w-full ${
                  clockState === "ON_BREAK"
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white border-transparent shadow-sm"
                    : "bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-200"
                }`}
              >
                {clockState === "ON_BREAK" ? (
                  <>
                    <Play className="h-4 w-4 fill-white" />
                    Resume Work
                  </>
                ) : (
                  <>
                    <Coffee className="h-4 w-4" />
                    Take a Break
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleClockOut}
                className="h-11 bg-slate-900 hover:bg-slate-950 text-white font-bold rounded-xl text-xs flex items-center gap-2 justify-center cursor-pointer shadow-sm transition-all active:scale-[0.99] w-full"
              >
                <LogOut className="h-4 w-4" />
                Clock-Out End
              </button>
            </div>
          )}

          {clockState === "COMPLETED" && (
            <div className="space-y-3 bg-slate-50/60 p-4 rounded-xl border border-slate-100 shadow-xxs">
              <div className="grid grid-cols-2 text-xs font-mono text-slate-600 divide-x divide-slate-200/60 text-center">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400 font-sans block">
                    SHIFT IN
                  </span>
                  <span className="font-bold text-slate-800 text-xs sm:text-sm">
                    {timeLogs.checkIn}
                  </span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400 font-sans block">
                    SHIFT OUT
                  </span>
                  <span className="font-bold text-slate-800 text-xs sm:text-sm">
                    {timeLogs.checkOut}
                  </span>
                </div>
              </div>
              <div className="text-[10px] text-slate-400 italic text-center border-t border-slate-200/50 pt-2 flex items-center justify-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                All timestamps locked. Splendid work today!
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
