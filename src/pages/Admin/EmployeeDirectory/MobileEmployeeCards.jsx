import React from "react";
import { Star, Eye } from "lucide-react";

function MobileEmployeeCards() {
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

  const renderStatus = (status) => {
    switch (status) {
      case "Active":
        return (
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-semibold">
            Active
          </span>
        );

      case "Inactive":
        return (
          <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-[11px] font-semibold">
            Inactive
          </span>
        );

      case "On Leave":
        return (
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-[11px] font-semibold">
            On Leave
          </span>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {employees.map((emp) => {
        const initials = emp.firstName[0] + emp.lastName[0];

        return (
          <div
            key={emp.id}
            className="
              bg-white
              rounded-2xl
              border
              border-slate-200
              shadow-sm
              p-4
              active:scale-[0.98]
              transition-all
            "
          >
            {/* Top */}

            <div className="flex items-start gap-3">
              <div
                className={`
                  h-14
                  w-14
                  rounded-full
                  bg-linear-to-br
                  ${emp.avatarColor}
                  flex
                  items-center
                  justify-center
                  text-white
                  font-bold
                  text-lg
                  shrink-0
                `}
              >
                {initials}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h2 className="font-bold text-slate-900 truncate">
                      {emp.firstName} {emp.lastName}
                    </h2>

                    <p className="text-xs text-slate-500 mt-1 truncate">
                      {emp.email}
                    </p>
                  </div>

                  {renderStatus(emp.status)}
                </div>
              </div>
            </div>

            {/* Divider */}

            <div className="border-t border-slate-100 my-4"></div>

            {/* Details */}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[11px] uppercase text-slate-400">
                  Employee ID
                </p>

                <h4 className="font-medium mt-1">{emp.id}</h4>
              </div>

              <div>
                <p className="text-[11px] uppercase text-slate-400">
                  Department
                </p>

                <h4 className="font-medium mt-1">{emp.department}</h4>
              </div>

              <div>
                <p className="text-[11px] uppercase text-slate-400">Role</p>

                <h4 className="font-medium mt-1">{emp.role}</h4>
              </div>

              <div>
                <p className="text-[11px] uppercase text-slate-400">Salary</p>

                <h4 className="font-semibold mt-1 text-indigo-600">
                  ₹{emp.salary.toLocaleString("en-IN")}
                </h4>
              </div>
            </div>

            {/* Rating */}

            <div className="flex items-center justify-between mt-5">
              <div>
                <p className="text-[11px] uppercase text-slate-400 mb-1">
                  Performance
                </p>

                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`h-4 w-4 ${
                        index < emp.performanceRating
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <button
                className="
                  flex
                  items-center
                  gap-2
                  bg-indigo-600
                  hover:bg-indigo-700
                  text-white
                  px-4
                  py-2
                  rounded-xl
                  text-sm
                  font-medium
                  transition
                "
              >
                <Eye size={16} />
                View
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MobileEmployeeCards;
