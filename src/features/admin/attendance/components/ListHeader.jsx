import React from "react";
import { Calendar, Search } from "lucide-react";
import { useAttendanceContext } from "../context/AttendanceContext";

/**
 * Renders the heading and controls for the attendance list with dynamic date and search.
 *
 * @returns {JSX.Element} The attendance list header.
 */
function ListHeader() {
  const { selectedDate, setSelectedDate, searchTerm, setSearchTerm } =
    useAttendanceContext();

  // Format date nicely (e.g., "September 5, 2026")
  const formattedDisplayDate = new Date(selectedDate).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  );

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-3">
          <h2 className="text-[0.9rem] lg:text-[1.125rem] font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-indigo-600" />
            Day Sheet: {formattedDisplayDate}
          </h2>
          {/* Date Picker Input for Admins */}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-2 py-1 bg-slate-50 font-mono font-bold text-slate-700 cursor-pointer"
          />
        </div>
        <p className="text-[0.725rem] lg:text-[0.88rem] text-slate-400 mt-1.5">
          Override logins, mark delays, and log absences for operational
          members.
        </p>
      </div>

      <div className="relative max-w-xs w-full sm:w-auto">
        <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter by staff name..."
          className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-hidden focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 w-full"
        />
      </div>
    </div>
  );
}
export default ListHeader;
