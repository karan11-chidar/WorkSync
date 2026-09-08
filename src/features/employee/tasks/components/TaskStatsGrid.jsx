import React from "react";
import { Layers, Clock, CheckCircle, XCircle } from "lucide-react";

/**
 * Displays aggregate task status counts and metrics for an employee workspace.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {number} [props.total=0] - Total assigned tasks.
 * @param {number} [props.inProgress=0] - Tasks currently in execution/progress.
 * @param {number} [props.completed=0] - Successfully completed tasks.
 * @param {number} [props.rejected=0] - Declined/rejected tasks count.
 * @returns {JSX.Element} Rendered grid of summary metric cards.
 */
export default function TaskStatsGrid({
  total = 0,
  inProgress = 0,
  completed = 0,
  rejected = 0,
}) {
  const cards = [
    {
      title: "Total Tasks",
      value: total,
      label: "Items",
      icon: Layers,
      bg: "bg-indigo-50 text-indigo-600",
      hoverBorder: "hover:border-indigo-200",
    },
    {
      title: "In Progress",
      value: inProgress,
      label: "Active",
      icon: Clock,
      bg: "bg-sky-50 text-sky-600",
      hoverBorder: "hover:border-sky-200",
    },
    {
      title: "Completed",
      value: completed,
      label: "Done",
      icon: CheckCircle,
      bg: "bg-emerald-50 text-emerald-600",
      hoverBorder: "hover:border-emerald-200",
    },
    {
      title: "Declined Tasks",
      value: rejected,
      label: "Items",
      icon: XCircle,
      bg: "bg-rose-50 text-rose-600",
      hoverBorder: "hover:border-rose-200",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`bg-white border border-slate-100 p-4 rounded-2xl shadow-2xs flex items-center justify-between group transition-all duration-200 ${card.hoverBorder}`}
          >
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                {card.title}
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-800 font-mono tracking-tight">
                {card.value}{" "}
                <span className="text-xs text-slate-400 font-medium">
                  {card.label}
                </span>
              </h3>
            </div>

            <div
              className={`p-2.5 rounded-xl ${card.bg} transition-transform duration-200 group-hover:scale-105 shrink-0`}
            >
              <Icon size={16} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

