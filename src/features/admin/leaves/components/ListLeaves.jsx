import React, { useState } from "react";
import {
  Smile,
  Clock,
  CheckCircle2,
  XCircle,
  Inbox,
  Quote,
  UserCheck,
} from "lucide-react";
import { useAdminLeaveContext } from "../context/AdminLeaveContext";
import LeaveCardSkeleton from "./LeaveCardSkeleton";
import AdminLeaveRejectModal from "./AdminLeaveRejectModal";

/**
 * ListLeaves Component
 *
 * Renders the administrator's leave request cards grid with matched employee avatars/photos,
 * rejection modal integration, and smooth cascading entry animations.
 *
 * @component
 * @returns {JSX.Element} Rendered list of leave request cards.
 */
export default function ListLeaves() {
  const {
    leaves = [],
    isLoading,
    updateLeaveStatus,
    employeeList = [],
  } = useAdminLeaveContext();

  // Local state for rejection modal workflow
  const [selectedLeaveId, setSelectedLeaveId] = useState(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getStatusConfig = (status = "") => {
    const st = String(status).toLowerCase();
    switch (st) {
      case "approved":
        return {
          cardAccent: "border-l-emerald-500",
          badgeStyle:
            "bg-emerald-50 text-emerald-700 border border-emerald-200/80",
          icon: <CheckCircle2 className="h-3.5 w-3.5" />,
        };
      case "rejected":
        return {
          cardAccent: "border-l-rose-500",
          badgeStyle: "bg-rose-50 text-rose-700 border border-rose-200/80",
          icon: <XCircle className="h-3.5 w-3.5" />,
        };
      default: // Pending
        return {
          cardAccent: "border-l-amber-500",
          badgeStyle: "bg-amber-50 text-amber-700 border border-amber-200/80",
          icon: <Clock className="h-3.5 w-3.5" />,
        };
    }
  };

  const handleOpenRejectModal = (leaveId) => {
    setSelectedLeaveId(leaveId);
    setIsRejectModalOpen(true);
  };

  const handleCloseRejectModal = () => {
    setSelectedLeaveId(null);
    setIsRejectModalOpen(false);
  };

  const handleConfirmReject = async (reason) => {
    if (!selectedLeaveId) return;
    try {
      setIsSubmitting(true);
      await updateLeaveStatus(selectedLeaveId, "Rejected", reason);
      handleCloseRejectModal();
    } catch (error) {
      console.error("Failed to process rejection:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <LeaveCardSkeleton />;
  }

  return (
    <div className="w-full">
      {leaves.length === 0 ? (
        <div
          className="bg-white p-12 sm:p-16 rounded-2xl border border-slate-100 shadow-2xs text-center flex flex-col items-center justify-center space-y-3"
          id="empty-requests"
        >
          <div className="p-3.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Smile className="h-7 w-7" />
          </div>
          <h3 className="font-bold text-slate-800 text-sm sm:text-base">
            Clear Records Archive
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
            There are no leave requests registered under this status criteria
            right now.
          </p>
        </div>
      ) : (
        <div
          className="grid grid-cols-1 xl:grid-cols-2 gap-5"
          id="filtered-requests-feed"
        >
          {leaves.map((req, index) => {
            const targetId = req.employeeId;
            const matchedEmp = employeeList.find((emp) => {
              if (!targetId) return false;
              const target = String(targetId).trim().toLowerCase();
              return (
                (emp.employeeId &&
                  String(emp.employeeId).trim().toLowerCase() === target) ||
                (emp.uid && String(emp.uid).trim().toLowerCase() === target) ||
                (emp.id && String(emp.id).trim().toLowerCase() === target)
              );
            });

            const employeePhoto =
              matchedEmp?.avatarUrl ||
              matchedEmp?.photoURL ||
              matchedEmp?.avatar ||
              null;

            const rawName =
              req.employeeName ||
              (matchedEmp
                ? `${matchedEmp.firstName || ""} ${matchedEmp.lastName || ""}`.trim()
                : null) ||
              "Staff Member";

            const initials =
              rawName
                .split(" ")
                .filter(Boolean)
                .map((n) => n[0])
                .join("")
                .substring(0, 2)
                .toUpperCase() || "EMP";

            const config = getStatusConfig(req.status);
            const isPending = String(req.status).toLowerCase() === "pending";

            return (
              <div
                key={req.id}
                style={{ animationDelay: `${index * 60}ms` }}
                className={`bg-white rounded-2xl border border-slate-150 border-l-4 ${config.cardAccent} shadow-2xs p-5 space-y-4 flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 min-w-0 animate-card-slide`}
                id={`req-card-${req.id}`}
              >
                {/* Upper Section */}
                <div className="space-y-4 min-w-0">
                  {/* Header Row: Employee Avatar/Photo & Badge */}
                  <div className="flex items-center justify-between gap-3 min-w-0 pb-1">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {employeePhoto ? (
                        <img
                          src={employeePhoto}
                          alt={`${rawName} Avatar`}
                          className="h-10 w-10 rounded-xl object-cover ring-2 ring-indigo-50 shadow-xs shrink-0 bg-slate-100"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-xl bg-linear-to-tr from-indigo-600 via-indigo-500 to-indigo-400 text-white flex items-center justify-center text-xs font-black uppercase shadow-xs shrink-0 ring-2 ring-indigo-50">
                          {initials}
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <div
                          className="text-sm font-bold text-slate-900 leading-tight truncate flex items-center gap-1.5"
                          title={rawName}
                        >
                          <span className="truncate">{rawName}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-[10px] font-mono text-slate-400">
                          <span className="bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-bold">
                            {req.employeeId || "EMP-000"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <span
                      className={`px-3 py-1 rounded-full inline-flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-wider shrink-0 shadow-2xs ${config.badgeStyle}`}
                    >
                      {config.icon}
                      <span>{req.status || "Pending"}</span>
                    </span>
                  </div>

                  {/* Middle Specs Box: Full Horizontal Grid */}
                  <div
                    className="grid grid-cols-3 gap-2 bg-slate-50/80 p-3.5 rounded-xl border border-slate-150/80 text-[11px] font-medium min-w-0"
                    id="leave-specs"
                  >
                    <div className="min-w-0 space-y-1">
                      <span className="text-slate-400 block font-bold text-[9px] uppercase tracking-wider">
                        Category
                      </span>
                      <span className="text-indigo-700 font-bold bg-indigo-50 border border-indigo-150 rounded-lg px-2.5 py-1 inline-block text-[11px] truncate max-w-full">
                        {req.leaveType || "Personal"}
                      </span>
                    </div>

                    <div className="min-w-0 space-y-1">
                      <span className="text-slate-400 block font-bold text-[9px] uppercase tracking-wider">
                        Duration
                      </span>
                      <div className="text-slate-800 font-bold text-xs flex items-center gap-1 mt-1 truncate">
                        <Inbox className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                        <span>
                          {req.days || 1}{" "}
                          {Number(req.days) === 1 ? "Day" : "Days"}
                        </span>
                      </div>
                    </div>

                    <div className="min-w-0 text-right space-y-1">
                      <span className="text-slate-400 block font-bold text-[9px] uppercase tracking-wider">
                        Dates Period
                      </span>
                      <div className="text-slate-800 font-mono font-bold text-[10px] leading-tight block mt-1 truncate">
                        <span className="text-slate-900 block">
                          {req.startDate || "-"}
                        </span>
                        <span className="text-slate-400 font-sans text-[9px] font-normal block">
                          to {req.endDate || "-"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quoted Leave Justification Box */}
                  <div
                    className="p-3 rounded-xl bg-slate-50/50 border border-slate-100/80 text-xs text-slate-600 leading-relaxed relative flex items-start gap-2.5"
                    id="req-reason-box"
                  >
                    <Quote className="h-4 w-4 text-indigo-300 shrink-0 mt-0.5 rotate-180" />
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                        Submitted Justification
                      </span>
                      <p className="italic text-slate-700 font-medium wrap-break-word text-[11px]">
                        "
                        {req.reason ||
                          "No written justification was provided for this application."}
                        "
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Controls Panel */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                  <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                    <UserCheck className="h-3 w-3 text-slate-300" />
                    <span>Review Panel</span>
                  </div>

                  {isPending ? (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenRejectModal(req.id)}
                        className="px-3.5 py-1.5 border border-slate-200 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-700 text-slate-600 rounded-xl font-bold transition-all cursor-pointer active:scale-95 text-[11px]"
                      >
                        Reject
                      </button>
                      <button
                        type="button"
                        onClick={() => updateLeaveStatus(req.id, "Approved")}
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-xs transition-all cursor-pointer active:scale-95 text-[11px] flex items-center gap-1"
                      >
                        Approve Request
                      </button>
                    </div>
                  ) : (
                    <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                      Processed Status
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Admin Rejection Reason Modal Integration */}
      <AdminLeaveRejectModal
        isOpen={isRejectModalOpen}
        onClose={handleCloseRejectModal}
        onSubmit={handleConfirmReject}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

