import React from "react";
import { ClipboardList, Calendar, Trash2, Edit2 } from "lucide-react";

 function TaskDashboardGrid(props) {
  const staticTasks = [
    {
      id: "TSK-001",
      title: "Design Login Screen",
      description:
        "Create a modern, responsive login interface using Tailwind CSS and integrate light/dark mode variables.",
      priority: "High",
      status: "In Progress",
      employeeName: "Rahul Sharma",
      employeeId: "EMP-001",
      avatarColor: "from-blue-500 to-cyan-500",
      dueDate: "2026-07-10",
      dateAssigned: "2026-07-04",
    },
    {
      id: "TSK-002",
      title: "Optimize API Endpoints",
      description:
        "Profile and refactor backend service controllers to reduce response times for dashboard analytics aggregations.",
      priority: "Medium",
      status: "Pending",
      employeeName: "Aman Singh",
      employeeId: "EMP-003",
      avatarColor: "from-violet-500 to-indigo-500",
      dueDate: "2026-07-15",
      dateAssigned: "2026-07-03",
    },
    {
      id: "TSK-003",
      title: "Conduct HR Compliance Audit",
      description:
        "Review internal compliance notes, updated retention logs, and verify employee ID credentials.",
      priority: "Low",
      status: "Completed",
      employeeName: "Neha Patel",
      employeeId: "EMP-004",
      avatarColor: "from-emerald-500 to-green-500",
      dueDate: "2026-07-04",
      dateAssigned: "2026-07-01",
    },
  ];

  // Dummy Handler Actions (UI के लिए)
  const handleStatusChange = (id, newStatus) => {
    console.log(`Task ${id} status updated to: ${newStatus}`);
  };

  const handleEditTask = (task) => {
    console.log("Editing task:", task);
  };

  const handleDeleteTask = (id) => {
    if (confirm("Are you sure you want to delete this task?")) {
      console.log(`Deleted task ID: ${id}`);
    }
  };

  return (
    <div className="w-full p-2">
      {staticTasks.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-100 shadow-sm">
          <div className="mx-auto w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 mb-3">
            <ClipboardList className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-slate-800 text-sm">
            No tasks assigned yet
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Try assigning a brand-new deliverable to a registered staff member
            to fill up this workspace.
          </p>
        </div>
      ) : (
        /* Responsive Grid: 1 col on Mobile, 2 on Tablet (md), 3 on Desktop (lg) */
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          id="tasks-cards-grid"
        >
          {staticTasks.map((t) => {
            return (
              <div
                key={t.id}
                className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="space-y-3">
                  {/* Priority & Status header */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        t.priority === "High"
                          ? "bg-rose-50 text-rose-700 border border-rose-100"
                          : t.priority === "Medium"
                            ? "bg-amber-50 text-amber-700 border border-amber-100"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                      }`}
                    >
                      {t.priority} Priority
                    </span>

                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        t.status === "Completed"
                          ? "bg-emerald-100 text-emerald-800"
                          : t.status === "In Progress"
                            ? "bg-sky-100 text-sky-800"
                            : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h4
                      className="text-sm font-bold text-slate-900 leading-snug line-clamp-1"
                      title={t.title}
                    >
                      {t.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-3">
                      {t.description}
                    </p>
                  </div>
                </div>

                {/* Footer section (Employee, Due Date, Controls) */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  {/* Assignee info */}
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`h-7 w-7 rounded-full bg-linear-to-br ${t.avatarColor} text-white font-extrabold text-[10px] flex items-center justify-center uppercase shadow-xs`}
                    >
                      {t.employeeName.charAt(0)}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-800 block leading-tight">
                        {t.employeeName}
                      </span>
                      <span className="text-[9px] text-slate-400 block font-mono">
                        ID: {t.employeeId}
                      </span>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                    <span className="flex items-center gap-1 font-mono">
                      <Calendar className="h-3 w-3 shrink-0 text-slate-400" />{" "}
                      Due: {t.dueDate}
                    </span>
                    <span className="font-mono">
                      Assigned: {t.dateAssigned}
                    </span>
                  </div>

                  {/* Admin State controllers */}
                  <div className="flex gap-2 pt-1 items-center justify-between border-t border-slate-50 mt-1">
                    <div>
                      <select
                        value={t.status}
                        onChange={(e) =>
                          handleStatusChange(t.id, e.target.value)
                        }
                        className="px-2 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md text-[10px] font-bold text-slate-700 focus:outline-none cursor-pointer transition-colors"
                      >
                        <option value="Pending">🕒 Pending</option>
                        <option value="In Progress">⚡ In Progress</option>
                        <option value="Completed">✅ Completed</option>
                      </select>
                    </div>

                    {/* Action Buttons: Edit and Delete */}
                    <div className="flex items-center gap-1.5">
                      {/* EDIT BUTTON */}
                      <button
                        onClick={() => {
                          props.setEditingTask(t)
                          props.setIsOpenTask(true);
                         }}
                        className="p-1.5 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 rounded-lg cursor-pointer transition-colors"
                        title="Edit task"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>

                      {/* DELETE BUTTON */}
                      <button
                        onClick={() => handleDeleteTask(t.id)}
                        className="p-1.5 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg cursor-pointer transition-colors"
                        title="Delete task"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default TaskDashboardGrid;
