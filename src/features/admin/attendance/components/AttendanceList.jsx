import React, { useState } from "react";
import {
  Check,
  UserX,
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

export default function AttendanceList() {
  // 1. Static Dummy Data (UI रेंडर करने के लिए)
  const combinedLog = [
    {
      employee: {
        id: "EMP-001",
        firstName: "Rahul",
        lastName: "Sharma",
        department: "Engineering",
        role: "Frontend Dev",
        avatarColor: "from-blue-500 to-cyan-500",
      },
      record: {
        status: "Present",
        checkInTime: "09:15 AM",
        checkOutTime: "06:00 PM",
      },
    },
    {
      employee: {
        id: "EMP-002",
        firstName: "Priya",
        lastName: "Verma",
        department: "Design",
        role: "UI/UX Designer",
        avatarColor: "from-pink-500 to-rose-500",
      },
      record: {
        status: "Late",
        checkInTime: "10:45 AM",
        checkOutTime: "05:30 PM",
      },
    },
    {
      employee: {
        id: "EMP-003",
        firstName: "Aman",
        lastName: "Singh",
        department: "Engineering",
        role: "Backend Dev",
        avatarColor: "from-violet-500 to-indigo-500",
      },
      record: {
        status: "On Leave",
        checkInTime: "",
        checkOutTime: "",
      },
    },
  ];

  // UI टेस्ट करने के लिए EMP-002 को एडिटिंग मोड में रखा है
  const editingId = "EMP-002";
  const statusVal = "Late";
  const checkIn = "10:45 AM";
  const checkOut = "05:30 PM";

  // स्टेटस के अनुसार बैज कलर निकालने का फ़ंक्शन
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Present":
        return "bg-emerald-50 text-emerald-700 border border-emerald-100/60";
      case "Late":
        return "bg-amber-50 text-amber-700 border border-amber-100/60";
      case "On Leave":
        return "bg-slate-100 text-slate-600 border border-slate-200";
      default:
        return "bg-rose-50 text-rose-700 border border-rose-100/60"; // Absent
    }
  };

  return (
    <div className="w-full space-y-4 p-2">
      {/* ----------------------------------------------------------------- */}
      {/* A. MOBILE VIEW: सिर्फ छोटी स्क्रीन्स पर दिखेगा (hidden md:grid) */}
      {/* ----------------------------------------------------------------- */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {combinedLog.map(({ employee: emp, record: rec }) => {
          const isEditing = editingId === emp.id;
          const initials = `${emp.firstName[0]}${emp.lastName[0]}`;

          return (
            <div
              key={emp.id}
              className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-4"
            >
              {/* Profile Card Header */}
              <div className="flex items-center gap-3">
                <div
                  className={`h-10 w-10 rounded-full bg-linear-to-br ${emp.avatarColor} flex items-center justify-center text-white text-xs font-bold uppercase`}
                >
                  {initials}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-900">
                    {emp.firstName} {emp.lastName}
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    {emp.department} • {emp.role}
                  </p>
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded">
                  {emp.id}
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
                      value={statusVal}
                      disabled
                      className="bg-white border border-slate-200 rounded p-1 text-[11px] focus:outline-none font-medium text-slate-700"
                    >
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                      <option value="Late">Late</option>
                      <option value="On Leave">On Leave</option>
                    </select>
                  ) : (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusBadgeClass(rec.status)}`}
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
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        value={checkIn}
                        disabled
                        className="border border-slate-200 bg-white rounded px-1.5 py-0.5 text-[10px] font-mono text-center w-16"
                      />
                      <span className="text-slate-400 text-[10px]">to</span>
                      <input
                        type="text"
                        value={checkOut}
                        disabled
                        className="border border-slate-200 bg-white rounded px-1.5 py-0.5 text-[10px] font-mono text-center w-16"
                      />
                    </div>
                  ) : (
                    <div className="font-mono text-slate-600 font-semibold text-[11px]">
                      {rec.status === "Present" || rec.status === "Late" ? (
                        <span>
                          {rec.checkInTime} — {rec.checkOutTime}
                        </span>
                      ) : rec.status === "On Leave" ? (
                        <span className="text-slate-400 italic font-sans font-normal">
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
                    <button className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1 shadow-sm">
                      <Check className="h-3 w-3" /> Save
                    </button>
                    <button className="bg-slate-100 text-slate-600 border border-slate-200 px-3 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1">
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button className="text-xs text-indigo-600 font-bold border border-indigo-100 hover:bg-indigo-50/50 px-3 py-1.5 rounded-xl transition-all">
                    Overrule Status
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* B. DESKTOP VIEW: सिर्फ बड़ी स्क्रीन्स पर दिखेगा (hidden md:block) */}
      {/* ----------------------------------------------------------------- */}
      <div
        className="hidden md:block border border-slate-100 rounded-2xl overflow-hidden bg-white shadow-sm"
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
              const initials = `${emp.firstName[0]}${emp.lastName[0]}`;

              return (
                <tr
                  key={emp.id}
                  className="hover:bg-slate-50/30 transition-colors"
                >
                  {/* User Profile Columns */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-8 w-8 rounded-full bg-linear-to-br ${emp.avatarColor} flex items-center justify-center text-white text-[10px] font-bold uppercase shadow-xs`}
                      >
                        {initials}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800 leading-none mb-1">
                          {emp.firstName} {emp.lastName}
                        </div>
                        <div className="text-[10px] text-slate-400 leading-none">
                          {emp.department} • {emp.role}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Status Selection Column */}
                  <td className="px-6 py-4">
                    {isEditing ? (
                      <select
                        value={statusVal}
                        disabled
                        className="bg-white border border-slate-200 rounded p-1 text-[11px] focus:ring-1 focus:ring-indigo-600 outline-none font-medium text-slate-700"
                      >
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                        <option value="Late">Late</option>
                        <option value="On Leave">On Leave</option>
                      </select>
                    ) : (
                      <span
                        className={`px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 font-bold text-[10px] uppercase tracking-wider ${getStatusBadgeClass(rec.status)}`}
                      >
                        {rec.status}
                      </span>
                    )}
                  </td>

                  {/* Check In / Out Indicators Column */}
                  <td className="px-6 py-4">
                    {isEditing ? (
                      <div className="flex items-center gap-1.5">
                        {statusVal !== "Absent" && statusVal !== "On Leave" ? (
                          <>
                            <input
                              type="text"
                              value={checkIn}
                              disabled
                              className="border border-slate-200 bg-white rounded px-1.5 py-0.5 text-[10px] font-mono text-center w-20 outline-none"
                            />
                            <span className="text-slate-400 text-[10px]">
                              to
                            </span>
                            <input
                              type="text"
                              value={checkOut}
                              disabled
                              className="border border-slate-200 bg-white rounded px-1.5 py-0.5 text-[10px] font-mono text-center w-20 outline-none"
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
                        {rec.status === "Present" || rec.status === "Late" ? (
                          <span>
                            {rec.checkInTime} — {rec.checkOutTime}
                          </span>
                        ) : rec.status === "On Leave" ? (
                          <span className="text-slate-400 italic font-sans font-normal">
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
                        <button className="bg-emerald-600 hover:bg-emerald-700 text-white p-1 rounded-md cursor-pointer flex items-center justify-center transition-colors shadow-xs">
                          <Check className="h-3 w-3" />
                        </button>
                        <button className="bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 p-1 rounded-md cursor-pointer flex items-center justify-center transition-colors">
                          <UserX className="h-3 w-3" />
                        </button>
                      </div>
                    ) : (
                      <button className="text-xs text-indigo-600 hover:text-indigo-900 font-bold cursor-pointer hover:underline">
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
    </div>
  );
}
