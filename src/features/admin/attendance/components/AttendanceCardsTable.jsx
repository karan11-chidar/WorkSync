import React from "react";
import ListHeader from "../components/ListHeader";
import AttendanceList from "../components/AttendanceList";

/**
 * Renders attendance records in the administrator table layout.
 *
 * @component
 * @returns {JSX.Element} The attendance table.
 */
function AttendanceCardsTable() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs p-5 space-y-4">
      <ListHeader />
      <AttendanceList />
    </div>
  );
}
export default AttendanceCardsTable;
