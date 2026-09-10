import React from "react";
import StateCard from "../components/StateCard";
import AttendanceCardsTable from "../components/AttendanceCardsTable";
import { useAttendanceContext } from "../context/AttendanceContext";
import AttendancePageSkeleton from "../components/AttendancePageSkeleton";

/**
 * Displays the administrator's attendance view for today.
 *
 * @component
 * @returns {JSX.Element} The today-attendance page.
 */
function TodayAttendance() {
  const { stats,isLoading } = useAttendanceContext();
  if (isLoading) {
  return <AttendancePageSkeleton/>
}
  return (
    <div className="space-y-6">
      {/* Dynamic Summary Cards Matrix */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-7">
        <StateCard
          title="Attendance Rate"
          textColor="text-slate-400"
          stats={stats.rate}
        />
        <StateCard
          title="Present"
          textColor="text-emerald-500"
          stats={stats.present}
        />
        <StateCard
          title="Late Arrivals"
          textColor="text-amber-500"
          stats={stats.late}
        />
        <StateCard
          title="Absences"
          textColor="text-rose-500"
          stats={stats.absent}
        />
        <StateCard
          title="Official Leave"
          textColor="text-blue-400"
          stats={stats.leave}
        />
      </div>

      <AttendanceCardsTable />
    </div>
  );
}
export default TodayAttendance;