import React from "react";
import { CreditCard, Briefcase, IndianRupee ,Plus} from "lucide-react";

function DepartmentHeader({setOpenCreateModal}) {
  return (
    <div
      className="
      bg-white
      p-4
      sm:p-6
      rounded-2xl
      border
      border-slate-100
      shadow-xs
      flex
      flex-col
      lg:flex-row
      lg:items-center
      justify-between
      gap-4
      "
    >
      {/* Left Content */}

      <div>
        <h1
          className="
          text-base
          sm:text-lg
          lg:text-xl
          font-bold
          text-slate-900
          "
        >
          Department Directories
        </h1>

        <p
          className="
          text-[11px]
          sm:text-xs
          text-slate-400
          mt-1
          max-w-xl
          leading-relaxed
          "
        >
          Manage departmental hubs, staff count weights, and financial budget
          distributions.
        </p>
      </div>
      <button
        onClick={() => setOpenCreateModal(true)}
        className="px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all h-11.5 "
      >
        <Plus className="h-4 w-4" /> Add Department
      </button>

      {/* Stats */}

      <div
        className="
        grid
        grid-cols-2
        gap-3
        w-full
        lg:w-auto
        "
      >
        {/* Department Card */}

        <div
          className="
          bg-slate-50
          border
          border-slate-100
          rounded-xl
          p-3
          flex
          items-center
          gap-3
          "
        >
          <div
            className="
            p-2
            bg-indigo-50
            text-indigo-600
            rounded-lg
            shrink-0
            "
          >
            <Briefcase className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <span
              className="
              text-[9px]
              sm:text-[10px]
              font-bold
              uppercase
              text-slate-400
              tracking-wider
              block
              truncate
              "
            >
              Departments
            </span>

            <span
              className="
              text-sm
              font-bold
              text-slate-800
              "
            >
              0
            </span>
          </div>
        </div>

        {/* Budget Card */}

        <div
          className="
          bg-slate-50
          border
          border-slate-100
          rounded-xl
          p-3
          flex
          items-center
          gap-3
          "
        >
          <div
            className="
            p-2
            bg-emerald-50
            text-emerald-600
            rounded-lg
            shrink-0
            "
          >
            <CreditCard className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <span
              className="
              text-[9px]
              sm:text-[10px]
              font-bold
              uppercase
              text-slate-400
              tracking-wider
              block
              truncate
              "
            >
              Total Budget
            </span>

            <span
              className="
              text-sm
              font-bold
              text-slate-800
              flex items-center justify-center gap-1.5
              "
            >
              <IndianRupee strokeWidth={2} className="h-3 w-3" />0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DepartmentHeader;
