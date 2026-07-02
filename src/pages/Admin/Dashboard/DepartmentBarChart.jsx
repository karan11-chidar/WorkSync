import React from "react";
import { ArrowUpRight } from "lucide-react";

function DepartmentChart() {
  const deptHeadcounts = [
    { name: "Engineering", count: 42, color: "bg-emerald-500" },
    { name: "Marketing", count: 28, color: "bg-rose-500" },
    { name: "Human Resources", count: 15, color: "bg-amber-500" },
    { name: "Finance", count: 20, color: "bg-sky-500" },
    { name: "Product", count: 35, color: "bg-indigo-500" },
  ];

  const maxHeadcount = Math.max(...deptHeadcounts.map((dept) => dept.count));

  return (
    <div className="bg-white rounded-xl md:rounded-2xl border border-slate-200 shadow-sm p-4 md:p-6 h-full">
      
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-sm sm:text-base md:text-lg font-semibold text-slate-900">
            Employees by Department
          </h2>

          <p className="text-[11px] sm:text-xs text-slate-400 mt-1 leading-5">
            Distribution of active employees across departments.
          </p>
        </div>

        <button
          className="
            flex
            items-center
            gap-1
            text-[11px]
            sm:text-xs
            font-medium
            text-indigo-600
            hover:text-indigo-700
            shrink-0
            group
          "
        >
          Directory
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
      {/* Chart */}
      <div className="space-y-4 mt-5">
        {deptHeadcounts.map((dept) => {
          const percentage = (dept.count / maxHeadcount) * 100;

          return (
            <div key={dept.name}>
              <div className="flex justify-between items-center mb-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`h-2.5 w-2.5 rounded-full shrink-0 ${dept.color}`}
                  ></span>

                  <span className="text-xs sm:text-sm font-medium text-slate-700 truncate">
                    {dept.name}
                  </span>
                </div>

                <span className="text-xs sm:text-sm font-semibold text-slate-900 shrink-0">
                  {dept.count}
                </span>
              </div>

              <div className="w-full h-2 md:h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`${dept.color} h-full rounded-full transition-all duration-700`}
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DepartmentChart;
