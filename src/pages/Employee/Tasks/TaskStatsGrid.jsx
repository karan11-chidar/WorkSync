import React from "react";
import { Layers, Clock, CheckCircle, XCircle } from "lucide-react";

export default function TaskStatsGrid({
  total,
  inProgress,
  completed,
  rejected,
}) {
  const cards = [
    {
      title: "Total Tasks",
      value: total,
      label: "Matrix",
      icon: Layers,
      theme: "hover:border-indigo-200 bg-indigo-50 text-indigo-600",
    },
    {
      title: "In Progress",
      value: inProgress,
      label: "Active",
      icon: Clock,
      theme: "hover:border-sky-200 bg-sky-50 text-sky-600",
    },
    {
      title: "Completed",
      value: completed,
      label: "Done",
      icon: CheckCircle,
      theme: "hover:border-emerald-200 bg-emerald-50 text-emerald-600",
    },
    {
      title: "Declined Tasks",
      value: rejected,
      label: "Items",
      icon: XCircle,
      theme: "hover:border-rose-200 bg-rose-50 text-rose-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
      {cards.map((c, idx) => {
        const Icon = c.icon;
        return (
          <div
            key={idx}
            className={`bg-white border border-slate-100 p-4 rounded-2xl shadow-sm flex items-center justify-between group transition-all duration-200`}
          >
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                {c.title}
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-800 font-mono">
                {c.value} {c.label}
              </h3>
            </div>
            <div className={`p-2 rounded-xl ${c.theme}`}>
              <Icon size={16} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
