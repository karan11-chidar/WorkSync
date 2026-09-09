import React from "react";
import { FileText } from "lucide-react";
import { useLeaveContext } from "../context/LeaveContext";
import PremiumUniversalLoader from "../../../../shared/components/Animations/PremiumUniversalLoader";
import EmptyState from "../../../../shared/components/EmptyState";
import LeavePageSkeleton from "./LeavePageSkeleton";

/**
 * Renders the employee's submitted leave history from Firestore.
 * Includes Custom Employee ID column mapping.
 *
 * @component
 * @returns {JSX.Element} The leave history table.
 */
export default function LeaveHistoryTable() {
  const { leaves, isLoading } = useLeaveContext();

  const getStatusStyle = (status = "") => {
    const st = String(status).toLowerCase();
    switch (st) {
      case "approved":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "rejected":
        return "bg-rose-50 text-rose-700 border-rose-100";
      default:
        return "bg-amber-50 text-amber-700 border-amber-100"; // Pending
    }
  };

  if (isLoading) {
    return <LeavePageSkeleton/>;
  }

  return (
    <div
      className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-2xs space-y-4"
      id="my-leaves-history"
    >
      <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <FileText className="h-4 w-4 text-indigo-500" />
          My Filed Leave Requests
        </h3>
        <span className="text-[11px] font-bold text-slate-400 font-mono bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
          Total requested: {leaves.length}
        </span>
      </div>

      {leaves.length === 0 ? (
        <div className="py-8">
          <EmptyState
            title="No Leave Requests Found"
            description="You have not submitted any leave applications yet. Fill out the application form on the left to submit a new time-off request."
          />
        </div>
      ) : (
        <>
          {/* Mobile View Card Layout */}
          <div className="flex flex-col gap-3 md:hidden max-h-140 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-100">
            {leaves.map((r) => (
              <div
                key={r.id}
                className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 space-y-3 shadow-2xs mr-0.5"
              >
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-900 block">
                      {r.leaveType || "Leave Request"}
                    </span>
                    <span className="text-[9px] font-mono text-indigo-600 font-bold block">
                      ID: {r.employeeId || "-"}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${getStatusStyle(
                      r.status,
                    )}`}
                  >
                    {r.status || "Pending"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500 font-medium">
                  <div className="space-y-0.5">
                    <span className="text-slate-400 block font-bold">
                      DURATION
                    </span>
                    <span className="font-mono text-slate-700 font-bold">
                      {r.startDate} to {r.endDate}
                    </span>
                  </div>
                  <div className="space-y-0.5 text-right">
                    <span className="text-slate-400 block font-bold">
                      TOTAL DAYS
                    </span>
                    <span className="font-mono text-slate-700 font-bold">
                      {r.days || 1} Days
                    </span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-600 bg-white p-2 rounded-lg border border-slate-100 italic truncate">
                  "{r.reason}"
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View Table Layout */}
          <div
            className="hidden md:block overflow-x-auto border border-slate-100 rounded-xl max-h-68.75 overflow-y-auto"
            id="leaves-history-table"
          >
            <table className="w-full text-xs text-left text-slate-500">
              <thead className="text-[10px] text-slate-400 uppercase bg-slate-50/90 font-bold font-mono border-b border-slate-100 sticky top-0 backdrop-blur-xs z-10">
                <tr>
                  <th className="px-5 py-3.5">Emp ID</th>
                  <th className="px-5 py-3.5">Type</th>
                  <th className="px-5 py-3.5">Dates Matrix</th>
                  <th className="px-5 py-3.5">Span</th>
                  <th className="px-5 py-3.5">Reason Statement</th>
                  <th className="px-5 py-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {leaves.map((r) => (
                  <tr
                    key={r.id}
                    className="hover:bg-slate-50/40 transition-colors"
                  >
                    <td className="px-5 py-3.5 font-mono font-bold text-indigo-600">
                      {r.employeeId || "-"}
                    </td>
                    <td className="px-5 py-3.5 text-slate-900 font-bold">
                      {r.leaveType || "Leave Request"}
                    </td>
                    <td className="px-5 py-3.5 text-slate-500">
                      <span className="font-mono font-semibold">
                        {r.startDate}
                      </span>{" "}
                      <span className="text-slate-300 mx-0.5">to</span>{" "}
                      <span className="font-mono font-semibold">
                        {r.endDate}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-slate-800 font-bold">
                      {r.days || 1} Days
                    </td>
                    <td
                      className="px-5 py-3.5 max-w-45 truncate text-slate-600"
                      title={r.reason}
                    >
                      {r.reason}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${getStatusStyle(
                          r.status,
                        )}`}
                      >
                        {r.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
