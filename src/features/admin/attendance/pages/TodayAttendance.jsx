import React from "react";
import AttendanceCountCards from "../components/AttendanceCountCards";
import AttendanceCardsTable from "../components/AttendanceCardsTable";

/**
 * Displays the administrator's attendance view for today.
 *
 * @returns {JSX.Element} The today-attendance page.
 */
function TodayAttendance() {
  return (
    <div className="space-y-6">
      <AttendanceCountCards />
      <AttendanceCardsTable />
    </div>
  );
}

export default TodayAttendance;
