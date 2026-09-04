import React from "react";
import {
  Calendar,
  Info,
  Play,
  XCircle,
  Pause,
  Check,
  RotateCcw,
} from "lucide-react";

export default function TaskItemRow({ task, onUpdateStatus, onTriggerReject }) {
  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 ${
        task.status === "Completed"
          ? "bg-slate-50/40 border-slate-100 border-l-slate-300 opacity-75"
          : task.status === "Rejected"
            ? "bg-rose-50/10 border-slate-100 border-l-rose-600"
            : task.priority === "High"
              ? "bg-rose-50/5 border-slate-100 border-l-rose-500"
              : task.priority === "Medium"
                ? "bg-amber-50/5 border-slate-100 border-l-amber-500"
                : "bg-emerald-50/5 border-slate-100 border-l-emerald-500"
      }`}
    >
      {/* Left Area: Metadata & Context */}
      <div className="space-y-2 flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider border ${
              task.priority === "High"
                ? "bg-rose-50 text-rose-700 border-rose-100"
                : task.priority === "Medium"
                  ? "bg-amber-50 text-amber-700 border-amber-100"
                  : "bg-emerald-50 text-emerald-700 border-emerald-100"
            }`}
          >
            {task.priority} Priority
          </span>

          <span
            className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${
              task.status === "Completed"
                ? "bg-emerald-100 text-emerald-800"
                : task.status === "Rejected"
                  ? "bg-rose-100 text-rose-800"
                  : task.status === "In Progress"
                    ? "bg-sky-100 text-sky-800"
                    : "bg-amber-100 text-amber-800"
            }`}
          >
            {task.status}
          </span>

          <span className="text-[10px] text-slate-400 font-bold font-mono flex items-center gap-1 ml-1">
            <Calendar size={11} className="text-slate-300" /> Due:{" "}
            {task.dueDate}
          </span>
        </div>

        <h4
          className={`text-xs sm:text-sm font-bold tracking-tight ${task.status === "Completed" ? "text-slate-400 line-through" : "text-slate-900"}`}
        >
          {task.title}
        </h4>
        <p
          className={`text-xs leading-relaxed max-w-2xl ${task.status === "Completed" ? "text-slate-400" : "text-slate-500"}`}
        >
          {task.description}
        </p>

        {/* If Rejected - Show written reason container */}
        {task.status === "Rejected" && task.rejectReason && (
          <div className="text-[11px] p-2.5 bg-rose-50 border border-rose-100/50 text-rose-700 rounded-xl italic font-medium max-w-xl">
            <strong>Decline Reason:</strong> "{task.rejectReason}"
          </div>
        )}

        <div className="text-[9px] text-slate-400 font-mono flex items-center gap-1 pt-1">
          <Info size={10} className="text-slate-300" /> Assigned on:{" "}
          {task.dateAssigned}
        </div>
      </div>

      {/* Right Area: Controls panel depending on status matrix */}
      <div className="flex flex-row sm:flex-col gap-2 shrink-0 self-end sm:self-center w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
        {task.status === "Pending" && (
          <>
            <button
              type="button"
              onClick={() => onUpdateStatus(task.id, "In Progress")}
              className="flex-1 sm:w-28 py-2 bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-700 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors"
            >
              <Play className="h-3 w-3 fill-sky-700 text-transparent" /> Start
              Task
            </button>
            <button
              type="button"
              onClick={() => onTriggerReject(task.id)}
              className="flex-1 sm:w-28 py-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors"
            >
              <XCircle className="h-3 w-3" /> Decline
            </button>
          </>
        )}

        {task.status === "In Progress" && (
          <>
            <button
              type="button"
              onClick={() => onUpdateStatus(task.id, "Pending")}
              className="flex-1 sm:w-28 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-700 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors"
            >
              <Pause className="h-3 w-3 fill-amber-700 text-transparent" /> Hold
            </button>
            <button
              type="button"
              onClick={() => onUpdateStatus(task.id, "Completed")}
              className="flex-1 sm:w-28 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-xs"
            >
              <Check className="h-3 w-3 stroke-3" /> Complete
            </button>
          </>
        )}

        {(task.status === "Completed" || task.status === "Rejected") && (
          <button
            type="button"
            onClick={() => onUpdateStatus(task.id, "In Progress")}
            className="w-full sm:w-28 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors"
          >
            <RotateCcw className="h-3 w-3" /> Reopen Task
          </button>
        )}
      </div>
    </div>
  );
}
