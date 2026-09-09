import React, { useState } from "react";
import TaskStatsGrid from "../components/TaskStatsGrid";
import TaskItemRow from "../components/TaskItemRow";
import TaskRejectModal from "../components/TaskRejectModal";
import EmptyState from "../../../../shared/components/EmptyState";
import { ClipboardList, NotebookPen, RefreshCw } from "lucide-react";
import { useTaskBoardEmployee } from "../context/TaskBoardEmployeeContext";
import EmployeeTaskboardSkeleton from "../components/EmployeeTaskboardSkeleton";

/**
 * AssignedTasksPortal
 *
 * Primary workspace container for employees to view assigned deliverables,
 * monitor key operational metrics, transition task states, and manage declines.
 *
 * @component
 * @returns {JSX.Element} The rendered employee task portal interface.
 */
export default function AssignedTasksPortal() {
  const { tasks, isLoading, stats, updateTaskStatus, fetchTasks } =
    useTaskBoardEmployee();

  // Rejection Modal Control States
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [activeRejectId, setActiveRejectId] = useState(null);
  const [reasonText, setReasonText] = useState("");
  const [modalError, setModalError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handles optimistic and persistent status transitions for a given task.
   *
   * @param {string} id - Target Firestore Task Document ID.
   * @param {string} newStatus - Target status label ("In Progress", "Completed", "Pending", etc.).
   */
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await updateTaskStatus(id, newStatus);
    } catch (error) {
      console.error(
        `Failed to transition task [${id}] to status [${newStatus}]:`,
        error,
      );
    }
  };

  /**
   * Opens the rejection modal dialog for a specified task.
   *
   * @param {string} id - Task Document ID being declined.
   */
  const handleTriggerRejectModal = (id) => {
    setActiveRejectId(id);
    setReasonText("");
    setModalError(null);
    setIsRejectModalOpen(true);
  };

  /**
   * Submits the written rejection justification to Firestore.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - Form submission event.
   */
  const handleConfirmReject = async (e) => {
    e.preventDefault();
    if (!reasonText.trim()) {
      setModalError(
        "Please state a valid justification before declining this task.",
      );
      return;
    }

    try {
      setIsSubmitting(true);
      await updateTaskStatus(activeRejectId, "Rejected", reasonText.trim());
      setIsRejectModalOpen(false);
      setActiveRejectId(null);
      setReasonText("");
    } catch (error) {
      console.error("Task rejection submission error:", error);
      setModalError(
        "Unable to decline task right now. Please verify connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <EmployeeTaskboardSkeleton/>;
  }

  return (
    <div className="w-full space-y-6 p-1">
      {/* 1. Header Section */}
      <div className="border border-slate-100 rounded-2xl p-4 sm:p-5 mt-5 bg-white shadow-xs flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <ClipboardList className="h-4.5 w-4.5 text-indigo-600 shrink-0" />
            Assigned Operational Deliverables
          </h3>
          <p className="text-[11px] text-slate-400 font-medium hidden lg:block leading-relaxed">
            Manage your daily assigned modules, track execution progress, and
            update status milestones.
          </p>
        </div>

        {fetchTasks && (
          <button
            type="button"
            onClick={fetchTasks}
            className="p-2 hover:bg-slate-50 border border-slate-200 text-slate-500 hover:text-indigo-600 rounded-xl transition-all cursor-pointer active:scale-95 shrink-0"
            title="Refresh Deliverables"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* 2. Real-time Metrics Matrix */}
      <TaskStatsGrid
        total={stats?.total || 0}
        inProgress={stats?.inProgress || 0}
        completed={stats?.completed || 0}
        rejected={stats?.rejected || 0}
      />

      {/* 3. Main Deliverables Canvas */}
      <div
        className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-xs space-y-5"
        id="subtab-tasks"
      >
        {tasks.length === 0 ? (
          <div className="py-12">
            <EmptyState
              Icon={NotebookPen}
              title="No Tasks Assigned Yet"
              description="You have no active or pending task assignments logged in your profile workspace. New work orders from your administrator will appear here automatically."
            />
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

      {/* 4. Rejection Modal Dialog */}
      <TaskRejectModal
        isOpen={isRejectModalOpen}
        reasonText={reasonText}
        setReasonText={setReasonText}
        modalError={modalError}
        isSubmitting={isSubmitting}
        onClose={() => {
          setIsRejectModalOpen(false);
          setModalError(null);
        }}
        onSubmit={handleConfirmReject}
      />
    </div>
  );
}
