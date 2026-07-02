import React from "react";
import { Users } from "lucide-react";

function LeaveApprovalList() {
  const pendingLeaveRequests = [
    {
      id: "LR-101",
      employeeName: "Rahul Sharma",
      type: "Casual Leave",
      days: 2,
      startDate: "12 Jul",
      endDate: "13 Jul",
      reason: "Family function in hometown.",
    },
    {
      id: "LR-102",
      employeeName: "Priya Verma",
      type: "Sick Leave",
      days: 3,
      startDate: "15 Jul",
      endDate: "17 Jul",
      reason: "Recovering from viral fever.",
    },
    {
      id: "LR-103",
      employeeName: "Aman Singh",
      type: "Annual Leave",
      days: 5,
      startDate: "20 Jul",
      endDate: "24 Jul",
      reason: "Vacation with family.",
    },
    {
      id: "LR-104",
      employeeName: "Neha Patel",
      type: "Work From Home",
      days: 1,
      startDate: "22 Jul",
      endDate: "22 Jul",
      reason: "Electricity maintenance at home.",
    },
    {
      id: "LR-105",
      employeeName: "Rohit Kumar",
      type: "Emergency Leave",
      days: 2,
      startDate: "25 Jul",
      endDate: "26 Jul",
      reason: "Medical emergency in family.",
    },
  ];

  return (
    <div className="bg-white rounded-xl md:rounded-2xl border border-slate-200 shadow-sm h-125 flex flex-col">
      {/* Header */}

      <div className="p-4 md:p-6 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-sm sm:text-base md:text-lg font-semibold text-slate-900">
            Leave Approval Queue
          </h2>

          <p className="text-[11px] sm:text-xs text-slate-400 mt-1">
            Pending leave requests awaiting review.
          </p>
        </div>

        <button className="text-xs md:text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
          Manage
        </button>
      </div>

      {/* Scrollable Content */}

      {pendingLeaveRequests.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="p-3 rounded-full bg-emerald-100 text-emerald-600">
            <Users className="h-5 w-5" />
          </div>

          <h3 className="mt-3 text-sm font-semibold text-slate-800">
            No Pending Requests
          </h3>

          <p className="text-xs text-slate-400 mt-1">
            You're all caught up for today.
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4 md:p-6 pt-4 space-y-4 custom-scroll">
          {pendingLeaveRequests.map((req) => (
            <div
              key={req.id}
              className="bg-slate-50 border border-slate-200 rounded-xl p-4"
            >
              {/* Top */}

              <div className="flex justify-between items-start gap-3">
                <div className="min-w-0">
                  <h3 className="text-sm md:text-base font-semibold text-slate-900 truncate">
                    {req.employeeName}
                  </h3>

                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 text-[10px] md:text-xs font-semibold">
                      {req.type}
                    </span>

                    <span className="text-[11px] md:text-xs text-slate-500">
                      {req.days} Day{req.days > 1 ? "s" : ""}
                    </span>

                    <span className="text-[11px] md:text-xs text-slate-500">
                      {req.startDate} - {req.endDate}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] md:text-xs bg-white border border-slate-200 rounded-full px-2 py-1 text-slate-500 shrink-0">
                  {req.id}
                </span>
              </div>

              {/* Reason */}

              <div className="mt-4 bg-white border border-slate-200 rounded-lg p-3">
                <p className="text-xs md:text-sm italic text-slate-600">
                  "{req.reason}"
                </p>
              </div>

              {/* Buttons */}

              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="
                    px-4
                    py-2
                    rounded-lg
                    border
                    border-slate-300
                    text-slate-700
                    text-xs
                    md:text-sm
                    font-medium
                    hover:bg-slate-100
                    transition-all
                  "
                >
                  Reject
                </button>

                <button
                  className="
                    px-4
                    py-2
                    rounded-lg
                    bg-emerald-600
                    text-white
                    text-xs
                    md:text-sm
                    font-medium
                    hover:bg-emerald-700
                    transition-all
                  "
                >
                  Approve
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LeaveApprovalList;
