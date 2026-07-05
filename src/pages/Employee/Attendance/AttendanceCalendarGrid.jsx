import React, { useState } from "react";
import {
  Clock,
  Calendar,
  ShieldCheck,
  AlertCircle,
  Coffee,
} from "lucide-react";

export default function AttendanceCalendarGrid({
  calendarDays,
  attendanceRecords,
  leaveRequests,
  employeeId,
  todayDateString,
  getFormattedDate,
}) {
  // मोबाइल व्यू में जिस तारीख पर यूजर क्लिक करेगा, उसकी पूरी डिटेल्स नीचे दिखाने के लिए स्टेट
  const [selectedDayDetails, setSelectedDayDetails] = useState(null);

  // स्टेटस के आधार पर रंगों का मैप (प्रीमियम सॉलिड और सॉफ्ट कलर्स)
  const getStatusMeta = (status, isLeave, isWeekend, isToday, isPast) => {
    if (status === "Present") {
      return {
        bg: "bg-emerald-50/80 border-emerald-100 text-emerald-800 hover:bg-emerald-100/70",
        dot: "bg-emerald-500",
        label: "Present",
      };
    }
    if (status === "Late") {
      return {
        bg: "bg-amber-50/80 border-amber-100 text-amber-800 hover:bg-amber-100/60",
        dot: "bg-amber-500",
        label: "Late Clock-in",
      };
    }
    if (status === "Absent") {
      return {
        bg: "bg-rose-50/80 border-rose-100 text-rose-800 hover:bg-rose-100/60",
        dot: "bg-rose-500",
        label: "Absent",
      };
    }
    if (isLeave) {
      return {
        bg: "bg-indigo-50/80 border-indigo-100 text-indigo-800 hover:bg-indigo-100/60",
        dot: "bg-indigo-500",
        label: "Approved Leave",
      };
    }
    if (isToday) {
      return {
        bg: "bg-white border-indigo-600 ring-2 ring-indigo-500/10 text-indigo-900 font-bold",
        dot: "bg-indigo-600",
        label: "Today",
      };
    }
    if (isWeekend) {
      return {
        bg: "bg-slate-50 border-slate-150 text-slate-400/80",
        dot: "bg-slate-300",
        label: "Weekend Off",
      };
    }
    if (isPast) {
      return {
        bg: "bg-rose-50/10 border-rose-100/30 text-slate-400",
        dot: "bg-rose-300/70",
        label: "No Record",
      };
    }
    return {
      bg: "bg-white border-slate-200 text-slate-700 hover:bg-slate-50",
      dot: "bg-transparent",
      label: "Future Day",
    };
  };

  return (
    <div className="p-4 sm:p-6 bg-white space-y-5">
      {/* 1. Week Headers (Mon, Tue...) */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-3 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>

      {/* 2. Hybrid Responsive Grid System */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-3">
        {calendarDays.map((day, idx) => {
          const dateStr = getFormattedDate(day.date);
          const isCurrentMonth = day.isCurrentMonth;

          const att = attendanceRecords.find(
            (a) => a.employeeId === employeeId && a.date === dateStr,
          );
          const isLeave = leaveRequests.find(
            (l) =>
              l.employeeId === employeeId &&
              l.status === "Approved" &&
              dateStr >= l.startDate &&
              dateStr <= l.endDate,
          );

          const isWeekend = day.date.getDay() === 0 || day.date.getDay() === 6;
          const isToday = dateStr === todayDateString;
          const isPast = day.date < new Date(new Date().setHours(0, 0, 0, 0));

          const meta = getStatusMeta(
            att?.status,
            isLeave,
            isWeekend,
            isToday,
            isPast,
          );

          let timeText = "";
          if (att?.checkInTime) {
            timeText =
              att.checkInTime +
              (att.checkOutTime ? ` - ${att.checkOutTime}` : "");
          } else if (isLeave) {
            timeText = isLeave.type;
          }

          // जब यूजर किसी सेल पर क्लिक करे (विशेषकर मोबाइल पर)
          const handleCellClick = () => {
            if (!isCurrentMonth) return;
            setSelectedDayDetails({
              date: dateStr,
              label: meta.label,
              time: timeText || "No active hours recorded",
              status:
                att?.status ||
                (isLeave ? "Leave" : isWeekend ? "Weekend" : "No Log"),
            });
          };

          return (
            <div
              key={idx}
              onClick={handleCellClick}
              className={`relative p-1.5 sm:p-2 border rounded-xl sm:rounded-2xl flex flex-col justify-between transition-all duration-200 cursor-pointer select-none aspect-square sm:aspect-auto sm:min-h-21.35 ${
                !isCurrentMonth
                  ? "bg-slate-50/30 text-slate-200 border-slate-100 pointer-events-none opacity-20"
                  : meta.bg
              }`}
            >
              {/* Date Box Indicator */}
              <div className="flex items-center justify-between w-full">
                <span
                  className={`text-[11px] sm:text-xs font-bold font-mono ${
                    isToday
                      ? "h-5 w-5 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[10px] shadow-sm shadow-indigo-600/20"
                      : ""
                  }`}
                >
                  {day.dayNum}
                </span>

                {/* MOBILE VIEW ONLY DOT: मोबाइल पर टेक्स्ट नहीं सिर्फ यह डॉट दिखेगा */}
                {isCurrentMonth && meta.label !== "Future Day" && (
                  <span
                    className={`h-2 w-2 rounded-full sm:hidden ${meta.dot}`}
                  />
                )}
              </div>

              {/* DESKTOP VIEW ONLY TEXT: सिर्फ बड़ी स्क्रीन पर टेक्स्ट और टाइम दिखेगा */}
              {isCurrentMonth && (
                <div className="hidden sm:block space-y-0.5 mt-2 text-left w-full min-w-0">
                  {meta.label && meta.label !== "Future Day" && (
                    <span className="block text-[9px] font-black uppercase tracking-wide truncate">
                      {meta.label}
                    </span>
                  )}
                  {timeText && (
                    <span className="block text-[8px] text-slate-500 font-mono tracking-tight font-medium truncate">
                      {timeText}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 3. DYNAMIC INTERACTIVE CONSOLE: सिर्फ मोबाइल पर सिलेक्टेड दिन का डेटा दिखाने के लिए */}
      {selectedDayDetails && (
        <div className="sm:hidden bg-slate-50 border border-slate-100 rounded-xl p-3.5 space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex justify-between items-center border-b border-slate-200/60 pb-1.5">
            <span className="text-[10px] font-mono font-bold text-slate-400">
              {selectedDayDetails.date}
            </span>
            <span
              className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider ${
                selectedDayDetails.status === "Present"
                  ? "bg-emerald-150 text-emerald-800"
                  : selectedDayDetails.status === "Late"
                    ? "bg-amber-150 text-amber-800"
                    : selectedDayDetails.status === "Leave"
                      ? "bg-indigo-150 text-indigo-800"
                      : "bg-slate-200 text-slate-600"
              }`}
            >
              {selectedDayDetails.label}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
            <Clock size={13} className="text-slate-400" />
            <span>{selectedDayDetails.time}</span>
          </div>
        </div>
      )}

      {/* 4. Color Legend Row (डैशबोर्ड गाइडलाइंस) */}
      <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap gap-x-4 gap-y-2.5 items-center justify-center text-[10px] font-bold text-slate-400 select-none">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 bg-emerald-500 rounded-full" />
          <span className="text-slate-500">Present</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 bg-amber-500 rounded-full" />
          <span className="text-slate-500">Late Arrivals</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 bg-indigo-500 rounded-full" />
          <span className="text-slate-500">On Leave</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 bg-rose-400 rounded-full" />
          <span className="text-slate-500">Unlogged</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 bg-slate-300 rounded-full" />
          <span className="text-slate-500">Weekend</span>
        </div>
      </div>
    </div>
  );
}
