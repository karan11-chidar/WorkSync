import React from "react";
import { ClipboardList, Calendar, ArrowUpRight } from "lucide-react";

export default function TaskChecklistPreview() {
  // 1. Static Dummy Data (UI स्क्रॉलर टेस्ट करने के लिए 5 टास्क रखे हैं)
  const myTasks = [
    {
      id: "TSK-01",
      title: "Design Login Screen & Wireframes",
      dueDate: "2026-07-10",
      priority: "High",
      status: "In Progress",
    },
    {
      id: "TSK-02",
      title: "Optimize Analytics Aggregation API",
      dueDate: "2026-07-15",
      priority: "Medium",
      status: "Pending",
    },
    {
      id: "TSK-03",
      title: "Review HR Compliance Document",
      dueDate: "2026-07-04",
      priority: "Low",
      status: "Completed",
    },
    {
      id: "TSK-04",
      title: "Setup Firebase Push Notifications",
      dueDate: "2026-07-18",
      priority: "High",
      status: "Pending",
    },
    {
      id: "TSK-05",
      title: "Fix TaskMaster Elite Grid Bugs",
      dueDate: "2026-07-20",
      priority: "Low",
      status: "In Progress",
    },
  ];

  // प्रायरिटी के हिसाब से डॉट्स/टेक्स्ट कलर का मैप
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "High":
        return "text-rose-600 bg-rose-50 border-rose-100";
      case "Medium":
        return "text-amber-600 bg-amber-50 border-amber-100";
      default:
        return "text-emerald-600 bg-emerald-50 border-emerald-100"; // Low
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-2">
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        {/* Header Container */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 gap-2">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 shrink-0">
            <ClipboardList className="h-4 w-4 text-indigo-500" />
            Task Checklist
          </h3>
          <button
            type="button"
            className="text-xs text-indigo-600 hover:text-indigo-800 font-bold inline-flex items-center gap-0.5 hover:underline transition-all cursor-pointer active:scale-95"
          >
            View All ({myTasks.length})
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {myTasks.length === 0 ? (
          /* Empty State View */
          <div className="text-center py-8 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
            <p className="text-xs text-slate-400 italic">
              🎉 No tasks currently assigned to you.
            </p>
          </div>
        ) : (
          /* FIX: अधिकतम 3 टास्क दिखाने के बाद स्क्रॉल करने के लिए max-h और overflow-y सेट किया है */
          <div className="space-y-3 max-h-72.5 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200">
            {myTasks.map((task) => {
              const priorityClass = getPriorityStyle(task.priority);

              return (
                <div
                  key={task.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-white border border-slate-100 hover:border-slate-200 rounded-xl gap-3 transition-all duration-200 group shadow-xxs mr-0.5"
                >
                  {/* Left: Metadata Titles */}
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <h4 className="font-bold text-slate-800 text-xs sm:text-sm tracking-tight truncate group-hover:text-indigo-600 transition-colors">
                      {task.title}
                    </h4>

                    {/* Sub-labels row */}
                    <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-400 font-medium">
                      <span className="flex items-center gap-1 font-mono">
                        <Calendar className="h-3 w-3 text-slate-400" />
                        {task.dueDate}
                      </span>
                      <span className="text-slate-200">&middot;</span>
                      <span
                        className={`px-1.5 py-0.5 rounded border text-[9px] font-bold ${priorityClass}`}
                      >
                        {task.priority} Priority
                      </span>
                    </div>
                  </div>

                  {/* Right: Status Pill */}
                  <div className="flex items-center sm:justify-end shrink-0">
                    <span
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${
                        task.status === "Completed"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                          : task.status === "In Progress"
                            ? "bg-sky-50 text-sky-700 border-sky-100"
                            : "bg-amber-50 text-amber-700 border-amber-100"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
