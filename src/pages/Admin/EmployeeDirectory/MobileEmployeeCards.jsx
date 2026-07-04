import {useState} from "react";
import { Eye, Star, Building2, IndianRupee } from "lucide-react";
function MobileEmployeeCards(props) {
  const { handleEditEmployee, handleSelectEmployee } = props;
  const employees = [
    {
      id: "EMP-001",
      firstName: "Rahul",
      lastName: "Sharma",
      email: "rahul@company.com",
      role: "Frontend Developer",
      department: "Engineering",
      status: "Active",
      performanceRating: 5,
      salary: 850000,
      avatarColor: "from-blue-500 to-cyan-500",
    },
    {
      id: "EMP-002",
      firstName: "Priya",
      lastName: "Verma",
      email: "priya@company.com",
      role: "UI/UX Designer",
      department: "Design",
      status: "On Leave",
      performanceRating: 4,
      salary: 720000,
      avatarColor: "from-pink-500 to-rose-500",
    },
    {
      id: "EMP-003",
      firstName: "Aman",
      lastName: "Singh",
      email: "aman@company.com",
      role: "Backend Developer",
      department: "Engineering",
      status: "Active",
      performanceRating: 5,
      salary: 980000,
      avatarColor: "from-violet-500 to-indigo-500",
    },
    {
      id: "EMP-004",
      firstName: "Neha",
      lastName: "Patel",
      email: "neha@company.com",
      role: "HR Executive",
      department: "Human Resource",
      status: "Inactive",
      performanceRating: 3,
      salary: 560000,
      avatarColor: "from-emerald-500 to-green-500",
    },
    {
      id: "EMP-005",
      firstName: "Rohit",
      lastName: "Gupta",
      email: "rohit@company.com",
      role: "Financial Analyst",
      department: "Finance",
      status: "Active",
      performanceRating: 4,
      salary: 910000,
      avatarColor: "from-orange-500 to-red-500",
    },
  ];

  const statusBadge = (status) => {
    switch (status) {
      case "Active":
        return (
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
            Active
          </span>
        );

      case "On Leave":
        return (
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
            On Leave
          </span>
        );

      case "Inactive":
        return (
          <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
            Inactive
          </span>
        );
      case "Suspended":
        return (
          <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
            Suspended
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-3 p-3">
      {employees.map((emp) => {
        const initials = emp.firstName[0] + emp.lastName[0];

        return (
          <div
            key={emp.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 active:scale-[0.98] transition-all"
          >
            {/* Top */}

            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  handleSelectEmployee(emp)
                }
                className={`h-12 w-12 rounded-full bg-linear-to-br ${emp.avatarColor}
                flex items-center justify-center text-white font-bold`}
              >
                {initials}
              </button>

              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-slate-900 truncate">
                  {emp.firstName} {emp.lastName}
                </h2>

                <p className="text-xs text-slate-500 truncate">{emp.role}</p>

                <p className="text-[11px] text-slate-400 truncate">
                  <a
                    href={`mailto:${emp.email}`}
                    className="hover:text-indigo-600"
                  >
                    {emp.email}
                  </a>
                </p>
              </div>

              {statusBadge(emp.status)}
            </div>

            {/* Details */}

            <div className="mt-4 flex justify-between items-center">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Building2 size={15} />
                  {emp.department}
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600">
                  <IndianRupee size={15} />
                  {emp.salary.toLocaleString("en-IN")}
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center justify-end gap-1 text-amber-500">
                  <Star className="fill-amber-400 h-4 w-4" />
                  <span className="text-sm font-semibold text-slate-700">
                    {emp.performanceRating}.0
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 mt-1">{emp.id}</p>
              </div>
            </div>

            {/* Button */}

            <button
              onClick={() => handleSelectEmployee(emp)}
              className="
                mt-4
                w-full
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-indigo-600
                py-2.5
                text-white
                text-sm
                font-medium
                active:scale-95
                transition-all
              "
            >
              <Eye size={16} />
              View Details
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default MobileEmployeeCards;
