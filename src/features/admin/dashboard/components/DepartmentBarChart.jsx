import React from "react";
import { Building2, ArrowUpRight } from "lucide-react";
import { useDashboardContext } from "../contexts/DashboardContext";
import { useNavigate } from "react-router-dom";

/**
 * Renders an ultra-modern, elite department-level headcount analytics widget.
 *
 * @component
 * @returns {JSX.Element} The premium department bar chart component.
 */
function DepartmentChart() {
  const { departmentHeadcounts = [] } = useDashboardContext();

  const navigate = useNavigate();

  const totalHeadcount = departmentHeadcounts.reduce(
    (acc, curr) => acc + (Number(curr.count) || 0),
    0,
  );

  const maxHeadcount =
    departmentHeadcounts.length > 0
      ? Math.max(...departmentHeadcounts.map((dept) => Number(dept.count) || 0))
      : 1;

  const departmentSkins = [
    {
      bg: "bg-indigo-500",
      gradient: "from-indigo-600 via-indigo-500 to-violet-500",
      lightBg: "bg-indigo-50/60",
      text: "text-indigo-600",
      ring: "ring-indigo-100",
    },
    {
      bg: "bg-sky-500",
      gradient: "from-sky-600 via-sky-500 to-blue-500",
      lightBg: "bg-sky-50/60",
      text: "text-sky-600",
      ring: "ring-sky-100",
    },
    {
      bg: "bg-emerald-500",
      gradient: "from-emerald-600 via-emerald-500 to-teal-500",
      lightBg: "bg-emerald-50/60",
      text: "text-emerald-600",
      ring: "ring-emerald-100",
    },
    {
      bg: "bg-amber-500",
      gradient: "from-amber-600 via-amber-500 to-orange-500",
      lightBg: "bg-amber-50/60",
      text: "text-amber-600",
      ring: "ring-amber-100",
    },
    {
      bg: "bg-rose-500",
      gradient: "from-rose-600 via-rose-500 to-pink-500",
      lightBg: "bg-rose-50/60",
      text: "text-rose-600",
      ring: "ring-rose-100",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-5 md:p-6 h-full flex flex-col justify-between transition-all duration-300 hover:shadow-md">
      {/* Elite Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-50/80 text-indigo-600 shrink-0">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-[0.7rem] sm:text-base md:text-lg font-bold text-slate-900 tracking-tight">
              Departmental Workforce
            </h2>
            <p className="hidden md:block text-[11px] sm:text-xs text-slate-400 mt-0.5">
              Active personnel distribution & proportion metrics.
            </p>
          </div>
        </div>

        <div className="text-center shrink-0 bg-slate-50 border border-slate-100 px-2 py-1 md:px-3 md:py-1.5 rounded-xl ">
          <span className="text-[0.5rem] md:text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
            Total Staff
          </span>
          <span className="text-sm font-mono font-extrabold text-slate-800 ">
            {totalHeadcount}
          </span>
        </div>
      </div>

      {/* Dynamic Content List */}
      <div className="space-y-4 my-auto py-4">
        {departmentHeadcounts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400 text-xs">
            <Building2 className="h-8 w-8 stroke-1 text-slate-300 mb-2" />
            No department allocations found.
          </div>
        ) : (
          departmentHeadcounts.map((dept, index) => {
            const count = Number(dept.count) || 0;
            const percentage =
              maxHeadcount > 0 ? (count / maxHeadcount) * 100 : 0;
            const share =
              totalHeadcount > 0
                ? Math.round((count / totalHeadcount) * 100)
                : 0;
            const skin = departmentSkins[index % departmentSkins.length];

            return (
              <div key={dept.name} className="group space-y-2">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`h-2.5 w-2.5 rounded-full shrink-0 ${skin.bg} shadow-xs ring-4 ${skin.ring}`}
                    />
                    <span className="font-semibold text-slate-700 tracking-tight truncate group-hover:text-slate-900 transition-colors">
                      {dept.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] sm:text-xs font-mono font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                      {share}% share
                    </span>
                    <span className="font-mono font-bold text-slate-900 text-xs sm:text-sm">
                      {count}
                    </span>
                  </div>
                </div>

                <div className="w-full h-3 bg-slate-100/80 rounded-full overflow-hidden p-0.5 border border-slate-100/60 shadow-inner">
                  <div
                    className={`bg-linear-to-r ${skin.gradient} h-full rounded-full transition-all duration-1000 ease-out shadow-xs`}
                    style={{ width: `${Math.max(percentage, 6)}%` }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
        <span>Synced with live employee database</span>
        <span className="text-indigo-600 font-semibold hover:underline cursor-pointer flex items-center gap-0.5">
          <button onClick={() => navigate("/admin/departments")}>
            Analytics <ArrowUpRight className="h-3 w-3" />
          </button>
        </span>
      </div>
    </div>
  );
}

export default DepartmentChart;
