import React from "react";
import { Users } from "lucide-react";
import { useDashboardContext } from "../contexts/DashboardContext";

/**
 * Renders pending leave requests for administrator review.
 *
 * @returns {JSX.Element} The leave approval list.
 */
function LeaveApprovalList() {
  const { pendingLeaves } = useDashboardContext();

  return (
    <div className="bg-white rounded-xl md:rounded-2xl border border-slate-200 shadow-sm h-125 flex flex-col">
      <div className="p-4 md:p-6 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-sm sm:text-base md:text-lg font-semibold text-slate-900">
            Leave Approval Queue
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-400 mt-1">
            Pending leave requests awaiting review.
          </p>
        </div>
      </div>

      {pendingLeaves.length === 0 ? (
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
          {pendingLeaves.map((req) => (
            <div
              key={req.id}
              className="bg-slate-50 border border-slate-200 rounded-xl p-4"
            >
              <div className="flex justify-between items-start gap-3">
                <div className="min-w-0">
                  <h3 className="text-sm md:text-base font-semibold text-slate-900 truncate">
                    {req.employeeId || "Staff Member"}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 text-[10px] md:text-xs font-semibold">
                      {req.leaveType || req.type || "Leave"}
                    </span>
                    <span className="text-[11px] md:text-xs text-slate-500">
                      {req.days || 1} Day{(req.days || 1) > 1 ? "s" : ""}
                    </span>
                    <span className="text-[11px] md:text-xs text-slate-500">
                      {req.startDate} - {req.endDate}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 bg-white border border-slate-200 rounded-lg p-3">
                <p className="text-xs md:text-sm italic text-slate-600">
                  "{req.reason || "No reason provided."}"
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LeaveApprovalList;