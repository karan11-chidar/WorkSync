import React, { useState } from "react";
import TaskStatsGrid from "./TaskStatsGrid";
import TaskItemRow from "./TaskItemRow";
import TaskRejectModal from "./TaskRejectModal";
import { ClipboardList } from "lucide-react";

export default function AssignedTasksPortal() {
  // लाइव टास्क डेटा एरे
  const [tasks, setTasks] = useState([
    {
      id: "TSK-101",
      title: "Deploy Firebase Authentication Blocks",
      description:
        "Integrate multi-factor authentication modules, fix token expiration states, and synchronize local credentials securely.",
      priority: "High",
      status: "In Progress",
      dueDate: "2026-07-08",
      dateAssigned: "2026-07-04",
      rejectReason: null,
    },
    {
      id: "TSK-102",
      title: "Refactor Kulfi ERP Sales Logic Matrix",
      description:
        "Optimize daily aggregated sales computations and speed up database schema indexing handlers for faster dashboard renders.",
      priority: "Medium",
      status: "Pending",
      dueDate: "2026-07-12",
      dateAssigned: "2026-07-05",
      rejectReason: null,
    },
    {
      id: "TSK-103",
      title: "Audit Web Accessibility Compliance Sheet",
      description:
        "Review DOM markup layouts, append necessary aria-labels, and verify light/dark contrast configurations under standard criteria.",
      priority: "Low",
      status: "Completed",
      dueDate: "2026-07-02",
      dateAssigned: "2026-06-28",
      rejectReason: null,
    },
  ]);

  // मॉडल कंट्रोल स्टेट्स
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [activeRejectId, setActiveRejectId] = useState(null);
  const [reasonText, setReasonText] = useState("");
  const [modalError, setModalError] = useState(null);

  // काउंटर्स एग्रीगेशन लॉजिक
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const inProgress = tasks.filter((t) => t.status === "In Progress").length;
  const rejected = tasks.filter((t) => t.status === "Rejected").length;

  const handleUpdateStatus = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: newStatus,
              rejectReason: newStatus !== "Rejected" ? null : t.rejectReason,
            }
          : t,
      ),
    );
  };

  const handleTriggerRejectModal = (id) => {
    setActiveRejectId(id);
    setReasonText("");
    setModalError(null);
    setIsRejectModalOpen(true);
  };

  const handleConfirmReject = (e) => {
    e.preventDefault();
    if (!reasonText.trim()) {
      setModalError("Reason description is required to reject a task.");
      return;
    }

    setTasks((prev) =>
      prev.map((t) =>
        t.id === activeRejectId
          ? { ...t, status: "Rejected", rejectReason: reasonText.trim() }
          : t,
      ),
    );
    setIsRejectModalOpen(false);
    setActiveRejectId(null);
    setReasonText("");
  };

  return (
    <div className="w-full space-y-5 p-1">
      {/* 1. Top Metrics Component Row */}
      <div className="border rounded-2xl border-slate-100 shadow-sm p-4 mt-5 bg-white ">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <ClipboardList className="h-4.5 w-4.5 text-indigo-500" />
          Assigned Professional Tasks
        </h3>
        <p className="text-[11px] text-slate-400 mt-0.5 hidden lg:block">
          Core operational deliverables mapped to your profile matrix logs.
        </p>
      </div>
      <TaskStatsGrid
        total={total}
        inProgress={inProgress}
        completed={completed}
        rejected={rejected}
      />

      {/* 2. Main Tasks List Card */}
      <div
        className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-5"
        id="subtab-tasks"
      >
        {tasks.length === 0 ? (
          <div className="p-14 text-center text-slate-400 text-xs italic bg-slate-50/40 rounded-xl border border-dashed border-slate-200">
            🎉 No operational tasks allocated to your panel.
          </div>
        ) : (
          <div className="space-y-4" id="my-tasks-list-full">
            {tasks.map((task) => (
              <TaskItemRow
                key={task.id}
                task={task}
                onUpdateStatus={handleUpdateStatus}
                onTriggerReject={handleTriggerRejectModal}
              />
            ))}
          </div>
        )}
      </div>

      {/* 3. Global Reason Pop-up Dialog Modal */}
      <TaskRejectModal
        isOpen={isRejectModalOpen}
        reasonText={reasonText}
        setReasonText={setReasonText}
        modalError={modalError}
        onClose={() => setIsRejectModalOpen(false)}
        onSubmit={handleConfirmReject}
      />
    </div>
  );
}
