import React from "react";
import StateCards from "../components/StateCards";
import AttendanceCalendarHeader from "../components/AttendanceCalendarHeader";
import AttendanceCalendarGrid from "../components/AttendanceCalendarGrid";
import { useAttendanceCalender } from "../context/AttendanceCalenderContext";
import AttendancePageSkeleton from "../components/AttendancePageSkeleton";

/**
 * Displays the authenticated employee's attendance history and calendar matrix.
 *
 * @component
 * @returns {JSX.Element} The employee attendance dashboard page.
 */
export default function EmployeeAttendance() {
  const { isLoading, statsData } = useAttendanceCalender();

  if (isLoading) {
    return <AttendancePageSkeleton/>;
  }

  return (
    <div className="w-full space-y-6 p-1">
      {/* Dynamic Summary Cards Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
        {statsData.map((stat, idx) => (
          <StateCards
            key={idx}
            title={stat.title}
            value={stat.value}
            subTitle={stat.subTitle}
            icon={stat.icon}
            colorTheme={stat.theme}
          />
        ))}
      </div>

      {/* Main Calendar Board */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <AttendanceCalendarHeader />
        <AttendanceCalendarGrid />
      </div>
    </div>
  );
}
