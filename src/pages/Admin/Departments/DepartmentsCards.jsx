import React from "react";
import {
  Users,
  Briefcase,
  TrendingUp,
  Percent,
  Edit3,
  Trash2,
  Star,
} from "lucide-react";

function DepartmentCards({ departments, setIsEditing, onDelete }) {
  const totalBudget = departments.reduce((sum, d) => sum + d.budget, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-2">
      {departments.map((dept) => {
        const percentage =
          totalBudget > 0 ? Math.round((dept.budget / totalBudget) * 100) : 0;

        return (
          <div
            key={dept.id}
            className={`bg-white rounded-2xl border border-slate-100 border-l-4 ${
              dept.color === "emerald"
                ? "border-l-emerald-500"
                : dept.color === "rose"
                  ? "border-l-rose-500"
                  : "border-l-sky-500"
            } shadow-sm p-5 space-y-5 hover:-translate-y-1 transition-all duration-300`}
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-bold text-slate-900">
                  {dept.name}
                </h3>
                <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded-md">
                  {dept.location}
                </span>
              </div>

              <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-2">
                {dept.description ||
                  "No description provided for this department."}
              </p>
            </div>

            {/* Details */}
            <div className="space-y-3 border-t border-slate-100 pt-4">
              <div className="flex justify-between text-xs">
                <span className="flex gap-1 text-slate-400 items-center">
                  <Users size={14} /> Leader
                </span>
                <b className="text-slate-700">{dept.manager}</b>
              </div>

              <div className="flex justify-between text-xs">
                <span className="flex gap-1 text-slate-400 items-center">
                  <Briefcase size={14} /> Staff
                </span>
                <b className="text-slate-700">{dept.count} Members</b>
              </div>

              <div className="flex justify-between text-xs">
                <span className="flex gap-1 text-slate-400 items-center">
                  <TrendingUp size={14} /> Avg Salary
                </span>
                <b className="text-slate-700">
                  ₹{dept.avgSalary?.toLocaleString("en-IN")}
                </b>
              </div>
            </div>

            {/* Budget Sec */}
            <div className="bg-slate-50 rounded-xl p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-slate-500 flex gap-1 items-center">
                  <Percent size={13} /> Budget
                </span>
                {/* EDIT BUTTON - इस पर क्लिक करते ही पूरा कार्ड एडिट मोड में जाएगा */}
                <button
                  type="button"
                  onClick={() => setIsEditing(dept)}
                  className="text-indigo-600 hover:bg-indigo-100 p-1 rounded-lg cursor-pointer transition-colors"
                >
                  <Edit3 size={15} />
                </button>
              </div>

              <div className="flex justify-between items-end">
                <h2 className="font-bold text-lg text-slate-900">
                  ₹{dept.budget?.toLocaleString("en-IN")}
                </h2>
                <span className="text-[10px] bg-white px-2 py-1 rounded-md text-slate-400 font-bold shadow-xxs">
                  {percentage}%
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
              {dept.topPerformer ? (
                <div>
                  <p className="text-[10px] text-slate-400">Top Performer</p>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    {dept.topPerformer.name}
                    <span className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-0.5 rounded text-[10px]">
                      <Star
                        size={11}
                        className="fill-amber-500 text-amber-500"
                      />
                      {dept.topPerformer.rating}.0
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-xs italic text-slate-400">
                  No Staff assigned
                </p>
              )}

              {/* DELETE BUTTON */}
              <button
                type="button"
                onClick={() => onDelete && onDelete(dept.id, dept.name)}
                className="text-rose-500 hover:bg-rose-50 p-1.5 rounded-lg cursor-pointer transition-colors"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DepartmentCards;
