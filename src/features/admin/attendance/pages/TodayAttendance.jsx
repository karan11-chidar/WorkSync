import React from "react";
import AttendanceCountCards from "../components/AttendanceCountCards";
import AttendanceCardsTable from "../components/AttendanceCardsTable";

function TodayAttendance() {
  return (
    <div className="space-y-6">
      <AttendanceCountCards />
      <AttendanceCardsTable />
    </div>
  );
}

export default TodayAttendance;
