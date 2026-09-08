import React from "react";
import {
  Calendar,
  Info,
  Play,
  XCircle,
  Pause,
  Check,
  RotateCcw,
  Briefcase,
  Clock,
} from "lucide-react";

/**
 * Renders an individual task row with priority tags, metadata, status badges, and action buttons.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.task - Task record entity.
 * @param {Function} props.onUpdateStatus - Handler function to trigger status change.
 * @param {Function} props.onTriggerReject - Handler function to open rejection modal flow.
 * @returns {JSX.Element} Rendered task item row.
 */
export default function TaskItemRow({ task, onUpdateStatus, onTriggerReject }) {
  const currentStatus = String(task?.status || "").toLowerCase();
  const currentPriority = String(task?.priority || "").toLowerCase();

  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 ${
        currentStatus === "completed"
          ? "bg-slate-50/40 border-slate-100 border-l-slate-300 opacity-75"
          : currentStatus === "rejected"
            ? "bg-rose-50/10 border-slate-100 border-l-rose-600"
            : currentPriority === "high"
              ? "bg-rose-50/5 border-slate-100 border-l-rose-500"
              : currentPriority === "medium"
                ? "bg-amber-50/5 border-slate-100 border-l-amber-500"
                : "bg-emerald-50/5 border-slate-100 border-l-emerald-500"
      }`}
    >
      {/* Left Area: Metadata & Context */}
      <div className="space-y-2 flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          {/* Priority Tag */}
          <span
            className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider border ${
              currentPriority === "high"
                ? "bg-rose-50 text-rose-700 border-rose-100"
                : currentPriority === "medium"
                  ? "bg-amber-50 text-amber-700 border-amber-100"
                  : "bg-emerald-50 text-emerald-700 border-emerald-100"
            }`}
          >
            {task.priority} Priority
          </span>

          {/* Status Tag */}
          <span
            className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${
              currentStatus === "completed"
                ? "bg-emerald-100 text-emerald-800"
                : currentStatus === "rejected"
                  ? "bg-rose-100 text-rose-800"
                  : currentStatus === "in progress" ||
                      currentStatus === "progress"
                    ? "bg-sky-100 text-sky-800"
                    : "bg-amber-100 text-amber-800"
            }`}
          >
            {task.status}
          </span>

          {/* Due Date */}
          <span className="text-[10px] text-slate-400 font-bold font-mono flex items-center gap-1 ml-1">
            <Calendar size={11} className="text-slate-300" /> Due:{" "}
            {task.dueDate || "-"}
          </span>
        </div>

        {/* Task Title */}
        <h4
          className={`text-xs sm:text-sm font-bold tracking-tight ${
            currentStatus === "completed"
              ? "text-slate-400 line-through"
              : "text-slate-900"
          }`}
        >
          {task.title}
        </h4>

        {/* Task Description */}
        <p
          className={`text-xs leading-relaxed max-w-2xl ${
            currentStatus === "completed" ? "text-slate-400" : "text-slate-500"
          }`}
        >
          {task.description}
        </p>

        {/* If Rejected - Show written reason container */}
        {currentStatus === "rejected" && task.rejectReason && (
          <div className="text-[11px] p-2.5 bg-rose-50 border border-rose-100/50 text-rose-700 rounded-xl italic font-medium max-w-xl">
            <strong>Decline Reason:</strong> "{task.rejectReason}"
          </div>
        )}

        {/* Bottom Metadata Info Row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[9px] text-slate-400 font-mono pt-1">
          <span className="flex items-center gap-1">
            <Info size={10} className="text-slate-300" /> Assigned:{" "}
            {task.dateAssigned || "-"}
          </span>

          {task.workingProject && (
            <span className="flex items-center gap-1 text-slate-500 font-semibold">
              <Briefcase size={10} className="text-indigo-400" /> Project:{" "}
              {task.workingProject}
            </span>
          )}

          {task.estimateHour && task.estimateHour !== "0" && (
            <span className="flex items-center gap-1 text-slate-500 font-semibold">
              <Clock size={10} className="text-amber-500" /> Est:{" "}
              {task.estimateHour} hrs
            </span>
          )}
        </div>
      </div>

      {/* Right Area: Controls panel depending on status matrix */}
      <div className="flex flex-row sm:flex-col gap-2 shrink-0 self-end sm:self-center w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
        {currentStatus === "pending" && (
          <>
            <button
              type="button"
              onClick={() => onUpdateStatus(task.id, "In Progress")}
              className="flex-1 sm:w-28 py-2 bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-700 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors active:scale-95"
            >
              <Play className="h-3 w-3 fill-sky-700 text-transparent" /> Start
              Task
            </button>
            <button
              type="button"
              onClick={() => onTriggerReject(task.id)}
              className="flex-1 sm:w-28 py-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors active:scale-95"
            >
              <XCircle className="h-3 w-3" /> Decline
            </button>
          </>
        )}

        {(currentStatus === "in progress" || currentStatus === "progress") && (
          <>
            <button
              type="button"
              onClick={() => onUpdateStatus(task.id, "Pending")}
              className="flex-1 sm:w-28 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-700 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors active:scale-95"
            >
              <Pause className="h-3 w-3 fill-amber-700 text-transparent" /> Hold
            </button>
            <button
              type="button"
              onClick={() => onUpdateStatus(task.id, "Completed")}
              className="flex-1 sm:w-28 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-xs active:scale-95"
            >
              <Check className="h-3 w-3 stroke-3" /> Complete
            </button>
          </>
        )}

        {(currentStatus === "completed" || currentStatus === "rejected") && (
          <button
            type="button"
            onClick={() => onUpdateStatus(task.id, "In Progress")}
            className="w-full sm:w-28 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors active:scale-95"
          >
            <RotateCcw className="h-3 w-3" /> Reopen Task
          </button>
        )}
      </div>
    </div>
  );
}