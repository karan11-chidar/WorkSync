import React from "react";
import {
  Smile,
  Clock,
  CheckCircle2,
  XCircle,
  Calendar,
  CalendarDays,
  Inbox,
} from "lucide-react";

export default function ListLeaves() {
  const staticRequests = [
    {
      id: "REQ-01",
      employeeId: "EMP-001",
      employeeName: "Rahul Sharma",
      avatarColor: "from-blue-500 to-cyan-500",
      type: "Sick Leave",
      days: 3,
      startDate: "2026-07-06",
      endDate: "2026-07-09",
      reason:
        "Recovering from viral fever. Doctor advised absolute bed rest for three days.",
      status: "Pending",
    },
    {
      id: "REQ-02",
      employeeId: "EMP-002",
      employeeName: "Priya Verma",
      avatarColor: "from-pink-500 to-rose-500",
      type: "Casual Leave",
      days: 1,
      startDate: "2026-07-12",
      endDate: "2026-07-13",
      reason: "Need to attend an urgent family function back in my hometown.",
      status: "Approved",
    },
    {
      id: "REQ-03",
      employeeId: "EMP-004",
      employeeName: "Neha Patel",
      avatarColor: "from-emerald-500 to-green-500",
      type: "Maternity Leave",
      days: 45,
      startDate: "2026-08-01",
      endDate: "2026-09-15",
      reason:
        "Logging routine legal maternity leave parameters as approved by management.",
      status: "Rejected",
    },
  ];

  // Dummy Actions (UI क्लिक्स के लिए)
  const handleApprove = (id) => console.log(`Approved request: ${id}`);
  const handleReject = (id) => console.log(`Rejected request: ${id}`);

  // स्टेटस के अनुसार स्टाइलिंग और आइकॉन का मैप
  const getStatusConfig = (status) => {
    switch (status) {
      case "Approved":
        return {
          cardAccent: "border-l-emerald-500",
          badgeStyle:
            "bg-emerald-50 text-emerald-700 border border-emerald-100",
          icon: <CheckCircle2 className="h-3.5 w-3.5" />,
        };
      case "Rejected":
        return {
          cardAccent: "border-l-rose-500",
          badgeStyle: "bg-rose-50 text-rose-700 border border-rose-100",
          icon: <XCircle className="h-3.5 w-3.5" />,
        };
      default: // Pending
        return {
          cardAccent: "border-l-amber-500",
          badgeStyle: "bg-amber-50 text-amber-700 border border-amber-100",
          icon: <Clock className="h-3.5 w-3.5" />,
        };
    }
  };

  return (
    <div className=" w-full p-2">
      {staticRequests.length === 0 ? (
        /* Empty State Layout */
        <div
          className="bg-white p-16 rounded-2xl border border-slate-100 shadow-sm text-center flex flex-col items-center justify-center space-y-3"
          id="empty-requests"
        >
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Smile className="h-7 w-7" />
          </div>
          <h3 className="font-bold text-slate-800 text-sm">
            Clear Records Archive
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
            There are no leave requests registered under this status criteria
            right now.
          </p>
        </div>
      ) : (
        /* Responsive Layout Grid: 1 Column on Mobile, 2 Columns on Large Screens */
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          id="filtered-requests-feed"
        >
          {staticRequests.map((req) => {
            const initials = req.employeeName
              ? `${req.employeeName.split(" ")[0][0]}${req.employeeName.split(" ")[1]?.[0] || ""}`
              : "EE";

            const config = getStatusConfig(req.status);

            return (
              <div
                key={req.id}
                className={`bg-white rounded-2xl border border-slate-100 border-l-4 ${config.cardAccent} shadow-sm p-5 space-y-4 flex flex-col justify-between hover:shadow-md transition-all duration-200`}
                id={`req-card-${req.id}`}
              >
                <div className="space-y-3.5">
                  {/* Card Head Metadata */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-9 w-9 rounded-full bg-linear-to-br ${req.avatarColor || "from-slate-500 to-slate-600"} text-white flex items-center justify-center text-xs font-bold uppercase shadow-xs`}
                      >
                        {initials}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 leading-tight">
                          {req.employeeName}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                          ID: {req.employeeId}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 font-bold text-[10px] uppercase tracking-wider ${config.badgeStyle}`}
                    >
                      {config.icon} {req.status}
                    </span>
                  </div>

                  {/* Core Leave Details Row */}
                  <div
                    className="grid grid-cols-3 gap-2 bg-slate-50/70 p-3.5 rounded-xl border border-slate-100 text-[11px] font-medium"
                    id="leave-specs"
                  >
                    <div>
                      <span className="text-slate-400 block font-bold text-[9px] uppercase tracking-wider">
                        Category
                      </span>
                      <span className="text-indigo-700 font-bold bg-indigo-50 border border-indigo-100 rounded-lg px-2 py-0.5 inline-block mt-1">
                        {req.type}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-bold text-[9px] uppercase tracking-wider">
                        Duration
                      </span>
                      <span className="text-slate-800 font-bold  mt-1.5 flex items-center gap-1">
                        <Inbox className="h-3 w-3 text-slate-400 shrink-0" />
                        {req.days} Days
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 block font-bold text-[9px] uppercase tracking-wider">
                        Dates Period
                      </span>
                      <span className="text-slate-700 font-mono font-bold block mt-1.5 text-[10px] leading-tight">
                        {req.startDate}{" "}
                        <span className="text-slate-300 font-sans block text-[9px]">
                          to {req.endDate}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Reason Text Area */}
                  <div
                    className="text-xs leading-relaxed text-slate-600 italic border-l-2 border-slate-200 pl-3 py-0.5 bg-slate-50/30 rounded-r-lg"
                    id="req-reason-box"
                  >
                    "{req.reason || "No written excuse was submitted."}"
                  </div>
                </div>

                {/* Action Controls Panel (Only if Pending) */}
                {req.status === "Pending" && (
                  <div
                    className="pt-3 border-t border-slate-100 flex justify-end gap-2 text-xs"
                    id="actions-panel"
                  >
                    <button
                      type="button"
                      onClick={() => handleReject(req.id)}
                      className="px-3.5 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl font-semibold transition-colors cursor-pointer active:scale-95 text-xs"
                      id={`reject-board-${req.id}`}
                    >
                      Reject
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApprove(req.id)}
                      className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-xs transition-colors cursor-pointer active:scale-95 text-xs flex items-center gap-1"
                      id={`approve-board-${req.id}`}
                    >
                      Approve Request
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
