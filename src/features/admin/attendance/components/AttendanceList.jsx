import React from "react";
import { Check, UserX } from "lucide-react";
import { useAttendanceContext } from "../context/AttendanceContext";
import PremiumUniversalLoader from "../../../../shared/components/Animations/PremiumUniversalLoader";
import EmptyState from "../../../../shared/components/EmptyState";

/**
 * Renders the live attendance records available to administrators.
 * Fully integrated with Firestore database and AttendanceProvider state with color-coded status badges
 * and native HTML time pickers for editing check-in and check-out times.
 *
 * @component
 * @returns {JSX.Element} The administrator attendance list.
 */
export default function AttendanceList() {
  const {
    combinedLog,
    isLoading,
    editingId,
    editStatus,
    setEditStatus,
    editCheckIn,
    setEditCheckIn,
    editCheckOut,
    setEditCheckOut,
    startEditing,
    cancelEditing,
    saveAttendance,
  } = useAttendanceContext();

  const getStatusBadgeClass = (status) => {
    const st = String(status).toUpperCase();
    switch (st) {
      case "CLOCK_IN":
      case "COMPLETED":
      case "PRESENT":
      case "ON TIME":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200/80"; // Vibrant Green
      case "LATE":
        return "bg-amber-50 text-amber-700 border border-amber-200/80"; // Warning Yellow/Amber
      case "ON_LEAVE":
      case "ON LEAVE":
      case "LEAVE":
        return "bg-blue-50 text-blue-700 border border-blue-200/80"; // Official Leave Blue
      default:
        return "bg-rose-50 text-rose-700 border border-rose-200/80"; // Absent Red
    }
  };
  return (
    <div className="w-full space-y-4 p-2">
      {combinedLog.length === 0 ? (
        <EmptyState
          title="No Attendance Records Found"
          description="There are no attendance logs registered for this selected date."
        />
      ) : (
        <>
          {/* ----------------------------------------------------------------- */}
          {/* A. MOBILE VIEW CARD LAYOUT */}
          {/* ----------------------------------------------------------------- */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {combinedLog.map(({ employee: emp, record: rec }) => {
              const isEditing = editingId === emp.id;
              const rawName = `${emp.firstName} ${emp.lastName}`.trim();
              const initials =
                rawName
                  .split(" ")
                  .filter(Boolean)
                  .map((n) => n[0])
                  .join("")
                  .substring(0, 2)
                  .toUpperCase() || "ST";

              return (
                <div
                  key={emp.id}
                  className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs space-y-4"
                >
                  {/* Profile Card Header */}
                  <div className="flex items-center gap-3">
                    {emp.avatarUrl ? (
                      <img
                        src={emp.avatarUrl}
                        alt={rawName}
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-indigo-50 shrink-0"
                      />
                    ) : (
                      <div
                        className={`h-10 w-10 rounded-full bg-linear-to-br ${emp.avatarColor} flex items-center justify-center text-white text-xs font-bold uppercase shrink-0`}
                      >
                        {initials}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 truncate">
                        {rawName}
                      </h4>
                      <p className="text-[10px] text-slate-400 truncate">
                        {emp.department} • {emp.role}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded shrink-0">
                      {emp.employeeIdTag}
                    </span>
                  </div>

                  {/* Status & Time Section */}
                  <div className="bg-slate-50 p-3 rounded-xl space-y-2.5 border border-slate-100">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase">
                        Status
                      </span>
                      {isEditing ? (
                        <select
                          value={editStatus}
                          onChange={(e) => setEditStatus(e.target.value)}
                          className="bg-white border border-slate-200 rounded p-1 text-[11px] focus:outline-hidden font-medium text-slate-700"
                        >
                          <option value="COMPLETED">Completed</option>
                          <option value="PRESENT">Present</option>
                          <option value="LATE">Late</option>
                          <option value="ABSENT">Absent</option>
                          <option value="ON LEAVE">On Leave</option>
                        </select>
                      ) : (
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusBadgeClass(
                            rec.status,
                          )}`}
                        >
                          {rec.status}
                        </span>
                      )}
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase">
                        Time Card
                      </span>
                      {isEditing ? (
                        editStatus !== "ABSENT" && editStatus !== "ON LEAVE" ? (
                          <div className="flex items-center gap-1">
                            {/* Native HTML Time Picker for Check-In */}
                            <input
                              type="time"
                              value={editCheckIn}
                              onChange={(e) => setEditCheckIn(e.target.value)}
                              className="border border-slate-200 bg-white rounded px-1.5 py-0.5 text-[10px] font-mono text-center w-22 cursor-pointer outline-hidden"
                            />
                            <span className="text-slate-400 text-[10px]">
                              to
                            </span>
                            {/* Native HTML Time Picker for Check-Out */}
                            <input
                              type="time"
                              value={editCheckOut}
                              onChange={(e) => setEditCheckOut(e.target.value)}
                              className="border border-slate-200 bg-white rounded px-1.5 py-0.5 text-[10px] font-mono text-center w-22 cursor-pointer outline-hidden"
                            />
                          </div>
                        ) : (
                          <span className="text-slate-400 italic text-[11px]">
                            Inactive Status
                          </span>
                        )
                      ) : (
                        <div className="font-mono text-slate-600 font-semibold text-[11px]">
                          {rec.status === "COMPLETED" ||
                          rec.status === "PRESENT" ||
                          rec.status === "LATE" ? (
                            <span>
                              {rec.checkInTime} — {rec.checkOutTime}
                            </span>
                          ) : rec.status === "ON LEAVE" ? (
                            <span className="text-blue-600 italic font-sans font-normal">
                              Leave Approved
                            </span>
                          ) : (
                            <span className="text-rose-500 italic font-sans font-normal">
                              No Record
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end pt-1">
                    {isEditing ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => saveAttendance(emp.id)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1 shadow-2xs cursor-pointer"
                        >
                          <Check className="h-3 w-3" /> Save
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 px-3 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEditing(emp)}
                        className="text-xs text-indigo-600 font-bold border border-indigo-100 hover:bg-indigo-50/50 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                      >
                        Overrule Status
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* B. DESKTOP VIEW TABLE LAYOUT */}
          {/* ----------------------------------------------------------------- */}
          <div
            className="hidden md:block border border-slate-100 rounded-2xl overflow-hidden bg-white shadow-2xs"
            id="attendance-list-hub"
          >
            <table className="w-full text-left font-sans" id="attendance-table">
              <thead>
                <tr className="bg-slate-50/70 text-slate-400 font-bold text-[10px] uppercase tracking-wider border-b border-slate-100">
                  <th className="px-6 py-3.5">Employee</th>
                  <th className="px-6 py-3.5">Marked Status</th>
                  <th className="px-6 py-3.5">Time Card (In / Out)</th>
                  <th className="px-6 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {combinedLog.map(({ employee: emp, record: rec }) => {
                  const isEditing = editingId === emp.id;
                  const rawName = `${emp.firstName} ${emp.lastName}`.trim();
                  const initials =
                    rawName
                      .split(" ")
                      .filter(Boolean)
                      .map((n) => n[0])
                      .join("")
                      .substring(0, 2)
                      .toUpperCase() || "ST";

                  return (
                    <tr
                      key={emp.id}
                      className="hover:bg-slate-50/30 transition-colors"
                    >
                      {/* User Profile Columns */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {emp.avatarUrl ? (
                            <img
                              src={emp.avatarUrl}
                              alt={rawName}
                              className="h-8 w-8 rounded-full object-cover ring-2 ring-indigo-50 shrink-0"
                            />
                          ) : (
                            <div
                              className={`h-8 w-8 rounded-full bg-linear-to-br ${emp.avatarColor} flex items-center justify-center text-white text-[10px] font-bold uppercase shadow-2xs shrink-0`}
                            >
                              {initials}
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="font-semibold text-slate-800 leading-none mb-1 truncate">
                              {rawName}
                            </div>
                            <div className="text-[10px] text-slate-400 leading-none truncate">
                              {emp.department} • {emp.role}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Status Selection Column */}
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <select
                            value={editStatus}
                            onChange={(e) => setEditStatus(e.target.value)}
                            className="bg-white border border-slate-200 rounded p-1 text-[11px] focus:ring-1 focus:ring-indigo-600 outline-hidden font-medium text-slate-700"
                          >
                            <option value="COMPLETED">Completed</option>
                            <option value="PRESENT">Present</option>
                            <option value="LATE">Late</option>
                            <option value="ABSENT">Absent</option>
                            <option value="ON LEAVE">On Leave</option>
                          </select>
                        ) : (
                          <span
                            className={`px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 font-bold text-[10px] uppercase tracking-wider ${getStatusBadgeClass(
                              rec.status,
                            )}`}
                          >
                            {rec.status}
                          </span>
                        )}
                      </td>

                      {/* Check In / Out Indicators Column with Native Time Pickers */}
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <div className="flex items-center gap-1.5">
                            {editStatus !== "ABSENT" &&
                            editStatus !== "ON LEAVE" ? (
                              <>
                                {/* Native HTML Time Picker for Check-In */}
                                <input
                                  type="time"
                                  value={editCheckIn}
                                  onChange={(e) =>
                                    setEditCheckIn(e.target.value)
                                  }
                                  className="border border-slate-200 bg-white rounded px-1.5 py-0.5 text-[10px] font-mono text-center w-26 cursor-pointer outline-hidden"
                                />
                                <span className="text-slate-400 text-[10px]">
                                  to
                                </span>
                                {/* Native HTML Time Picker for Check-Out */}
                                <input
                                  type="time"
                                  value={editCheckOut}
                                  onChange={(e) =>
                                    setEditCheckOut(e.target.value)
                                  }
                                  className="border border-slate-200 bg-white rounded px-1.5 py-0.5 text-[10px] font-mono text-center w-26 cursor-pointer outline-hidden"
                                />
                              </>
                            ) : (
                              <span className="text-slate-400 italic font-medium">
                                Inactive Status
                              </span>
                            )}
                          </div>
                        ) : (
                          <div className="font-mono text-slate-600 font-semibold text-[11px]">
                            {rec.status === "COMPLETED" ||
                            rec.status === "PRESENT" ||
                            rec.status === "LATE" ? (
                              <span>
                                {rec.checkInTime} — {rec.checkOutTime}
                              </span>
                            ) : rec.status === "ON LEAVE" ? (
                              <span className="text-blue-600 italic font-sans font-normal">
                                Day Leave approved
                              </span>
                            ) : (
                              <span className="text-rose-400/90 italic font-sans font-normal">
                                No check-in recorded
                              </span>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Edit Controls Column */}
                      <td className="px-6 py-4 text-right">
                        {isEditing ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => saveAttendance(emp.id)}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white p-1 rounded-md cursor-pointer flex items-center justify-center transition-colors shadow-2xs"
                            >
                              <Check className="h-3 w-3" />
                            </button>
                            <button
                              onClick={cancelEditing}
                              className="bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 p-1 rounded-md cursor-pointer flex items-center justify-center transition-colors"
                            >
                              <UserX className="h-3 w-3" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => startEditing(emp)}
                            className="text-xs text-indigo-600 hover:text-indigo-900 font-bold cursor-pointer hover:underline"
                          >
                            Overrule
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}