import React from "react";
import { Clock3, Calendar, Trash2, Edit2, AlertCircle } from "lucide-react";
import { useTaskBoard } from "../contexts/TaskBoardContext";
import EmptyState from "../../../../shared/components/EmptyState";
import PremiumUniversalLoader from "../../../../shared/components/Animations/PremiumUniversalLoader";
import getRandomColor from "../constants/taskCardAvatarColor";
import formatTimeStamp from "../../../../shared/utils/formatTimeStamp";

/**
 * TaskDashboardGrid Component
 *
 * Renders all assigned tasks in a clean grid card format for the Admin dashboard.
 * Includes status tags, assignee details, rejection reason highlights, and management controls.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Function} props.handleDeleteTask - Callback to delete a task.
 * @param {Function} props.handleStatusChange - Callback to change task status.
 * @param {Function} props.handleEditTask - Callback to open task edit modal.
 * @returns {JSX.Element} Grid layout of task cards.
 */
function TaskDashboardGrid({
  handleDeleteTask,
  handleStatusChange,
  handleEditTask,
}) {
  const {
    taskList,
    isLoading,
    employeeList = [],
    displayTaskList = [],
  } = useTaskBoard();

  if (isLoading) {
    return <PremiumUniversalLoader variant="card" gridCount={4} />;
  }

  if (!taskList || taskList.length === 0) {
    return (
      <EmptyState
        title="No tasks assigned yet"
        description="Try assigning a brand-new deliverable to a registered staff member to fill up this workspace."
      />
    );
  }

  if (displayTaskList.length === 0 && taskList.length > 0) {
    return (
      <EmptyState
        title="No tasks match the current filters"
        description="Try adjusting your filter criteria to see more tasks."
      />
    );
  }

  return (
    <div className="w-full p-2">
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        id="tasks-cards-grid"
      >
        {displayTaskList.map((t) => {
          const targetId =
            t.assignEmployee || t.assigneEmpId || t.assignedTo || t.employeeId;

          // Search employee record in context list
          const employee = employeeList.find((emp) => {
            if (!targetId) return false;
            const target = String(targetId).trim().toLowerCase();
            return (
              (emp.employeeId &&
                String(emp.employeeId).trim().toLowerCase() === target) ||
              (emp.uid && String(emp.uid).trim().toLowerCase() === target) ||
              (emp.id && String(emp.id).trim().toLowerCase() === target)
            );
          });

          // Priority Order: Task direct avatar -> Matched Employee Avatar
          const employeePhoto =
            t?.avatarUrl ||
            employee?.avatarUrl ||
            employee?.photoURL ||
            employee?.avatar ||
            null;

          const firstNameInitial = employee?.firstName?.[0] || "";
          const lastNameInitial = employee?.lastName?.[0] || "";
          const initials = `${firstNameInitial}${lastNameInitial}` || "E";

          const assignedFormattedDate =
            formatTimeStamp(t?.dateAssigned)?.[0] || "-";

          const currentStatus = String(t.status || "").toLowerCase();
          const currentPriority = String(t.priority || "").toLowerCase();

          return (
            <div
              key={t.id}
              className={`bg-white border rounded-2xl p-5 shadow-xs space-y-4 flex flex-col justify-between hover:-translate-y-0.5 transition-all duration-200 ${
                currentStatus === "rejected"
                  ? "border-rose-200 bg-rose-50/10"
                  : "border-slate-100"
              }`}
            >
              <div className="space-y-3">
                {/* Priority & Status header */}
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      currentPriority === "high"
                        ? "bg-rose-50 text-rose-700 border border-rose-100"
                        : currentPriority === "medium"
                          ? "bg-amber-50 text-amber-700 border border-amber-100"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                    }`}
                  >
                    {t.priority} Priority
                  </span>

                  {/* Dynamic Status Badge (Includes Rejected Status) */}
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      currentStatus === "completed"
                        ? "bg-emerald-100 text-emerald-800"
                        : currentStatus === "rejected"
                          ? "bg-rose-100 text-rose-800 border border-rose-200"
                          : currentStatus === "progress" ||
                              currentStatus === "in progress"
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
                    title={t.taskTitle}
                  >
                    {t.taskTitle}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-3">
                    {t.description}
                  </p>
                </div>

                {/* Rejection Justification Highlight Box for Admin */}
                {currentStatus === "rejected" && t.rejectReason && (
                  <div className="text-[11px] p-2.5 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl font-medium leading-relaxed">
                    <div className="flex items-center gap-1.5 font-bold mb-0.5">
                      <AlertCircle
                        size={13}
                        className="shrink-0 text-rose-600"
                      />
                      <span>Employee Declined Reason:</span>
                    </div>
                    <p className="italic text-rose-800">"{t.rejectReason}"</p>
                  </div>
                )}
              </div>

              {/* Footer section (Employee Avatar/Photo, Due Date, Controls) */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                {/* Assignee Info with Multi-Field Avatar Support */}
                <div className="flex items-center gap-2.5">
                  {employeePhoto ? (
                    <img
                      src={employeePhoto}
                      alt={`${employee?.firstName || "Employee"} Avatar`}
                      className="h-8 w-8 rounded-full object-cover ring-2 ring-slate-100 shadow-2xs shrink-0 bg-slate-100"
                    />
                  ) : (
                    <div
                      className={`h-8 w-8 rounded-full bg-linear-to-br ${
                        employee?.avatarColor || getRandomColor()
                      } text-white font-extrabold text-[10px] flex items-center justify-center uppercase shadow-2xs shrink-0`}
                    >
                      {initials}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-semibold text-slate-800 block leading-tight truncate">
                      {employee
                        ? `${employee.firstName || ""} ${employee.lastName || ""}`.trim()
                        : "Unassigned"}
                    </span>
                    <span className="text-[9px] text-slate-400 block font-mono truncate">
                      ID: {employee?.employeeId || targetId || "N/A"}
                    </span>
                  </div>

                  <div className="ml-auto flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1.5 shrink-0">
                    <Clock3 className="h-3.5 w-3.5 text-indigo-500" />
                    <span className="text-xs font-bold text-indigo-700">
                      {t.estimateHour || 0} H
                    </span>
                  </div>
                </div>

                {/* Dates */}
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                  <span className="flex items-center gap-1 font-mono">
                    <Calendar className="h-3 w-3 shrink-0 text-slate-400" />
                    Due: {t.dueDate || "-"}
                  </span>
                  <span className="font-mono">
                    Assigned: {assignedFormattedDate}
                  </span>
                </div>

                {/* Admin State controllers */}
                <div className="flex gap-2 pt-1 items-center justify-between border-t border-slate-50 mt-1">
                  <div>
                    <select
                      value={currentStatus}
                      onChange={(e) =>
                        handleStatusChange(t.id, e.target.value, t)
                      }
                      className="px-2 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md text-[10px] font-bold text-slate-700 focus:outline-none cursor-pointer transition-colors"
                    >
                      <option value="pending">🕒 Pending</option>
                      <option value="progress">⚡ In Progress</option>
                      <option value="completed">✅ Completed</option>
                      <option value="rejected">❌ Rejected / Declined</option>
                    </select>
                  </div>

                  {/* Action Buttons: Edit and Delete */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleEditTask(t)}
                      className="p-1.5 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 rounded-lg cursor-pointer transition-colors"
                      title="Edit task"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>

                    <button
                      type="button"
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
    </div>
  );
}

export default TaskDashboardGrid;
