import React, { useState, useEffect, useMemo, useCallback } from "react";
import TaskBoardEmployeeContext from "./TaskBoardEmployeeContext";
import {
  getEmployeeTasksService,
  updateTaskStatusService,
} from "../service/taskBoardEmployee";
import { useAuth } from "../../../auth/context/AuthContext";
import formatTimeStamp from "../../../../shared/utils/formatTimeStamp";

/**
 * TaskBoardEmployeeProvider Component
 * Supplies employee tasks list, computed metrics, and status update methods.
 *
 * @param {Object} props - React props.
 * @param {React.ReactNode} props.children - Child components wrapped by provider.
 * @returns {JSX.Element} Provider component hierarchy.
 */
export const TaskBoardEmployeeProvider = ({ children }) => {
  const { user } = useAuth();
  const employeeId = user?.employeeId || user?.uid || "";

  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Fetches assigned tasks from Firestore for the active employee.
   */
  const fetchTasks = useCallback(async () => {
    if (!employeeId) {
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const data = await getEmployeeTasksService(employeeId);

      // Normalizing Firestore Data to match UI expectations
      const normalizedTasks = data.map((t) => {
        // Status normalization ("pending" -> "Pending", "progress" -> "In Progress")
        let formattedStatus = "Pending";
        const rawStatus = String(t.status || "").toLowerCase();

        if (rawStatus === "completed") formattedStatus = "Completed";
        else if (rawStatus === "progress" || rawStatus === "in progress")
          formattedStatus = "In Progress";
        else if (rawStatus === "rejected") formattedStatus = "Rejected";

        // Priority normalization ("medium" -> "Medium")
        const rawPriority = String(t.priority || "Low");
        const formattedPriority =
          rawPriority.charAt(0).toUpperCase() +
          rawPriority.slice(1).toLowerCase();

        // Using generic formatTimeStamp utility
        const assignedFormattedDate =
          formatTimeStamp(t?.dateAssigned || t?.createdAt)?.[0] || "-";

        return {
          id: t.id,
          title: t.taskTitle || "Untitled Task",
          description: t.description || "",
          priority: formattedPriority,
          status: formattedStatus,
          dueDate: t.dueDate || "-",
          dateAssigned: assignedFormattedDate,
          rejectReason: t.rejectReason || null,
          workingProject: t.workingProject || "General",
          estimateHour: t.estimateHour || "0",
          avatarUrl: t.avatarUrl || null,
          rawTaskData: t,
        };
      });

      setTasks(normalizedTasks);
    } catch (error) {
      console.error("Failed to load employee tasks:", error);
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  }, [employeeId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  /**
   * Updates task status in Firestore and optimistic state update.
   *
   * @param {string} taskId - Target task ID.
   * @param {string} newStatus - Target status ("Pending", "In Progress", "Completed", "Rejected").
   * @param {string|null} [rejectReason=null] - Reason for rejection if applicable.
   */
  const updateTaskStatus = async (taskId, newStatus, rejectReason = null) => {
    try {
      // Mapping UI Status back to Database Format
      let dbStatus = newStatus.toLowerCase();
      if (newStatus === "In Progress") dbStatus = "progress";

      await updateTaskStatusService(taskId, dbStatus, rejectReason);

      // UI state local update
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === taskId
            ? {
                ...t,
                status: newStatus,
                rejectReason: newStatus === "Rejected" ? rejectReason : null,
              }
            : t,
        ),
      );
    } catch (error) {
      console.error("Error updating task status:", error);
      throw error;
    }
  };

  /**
   * Task count metrics aggregation
   */
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "Completed").length;
    const inProgress = tasks.filter((t) => t.status === "In Progress").length;
    const rejected = tasks.filter((t) => t.status === "Rejected").length;
    const pending = tasks.filter((t) => t.status === "Pending").length;

    return { total, completed, inProgress, rejected, pending };
  }, [tasks]);

  const value = {
    tasks,
    isLoading,
    stats,
    employeeId,
    fetchTasks,
    updateTaskStatus,
  };

  return (
    <TaskBoardEmployeeContext.Provider value={value}>
      {children}
    </TaskBoardEmployeeContext.Provider>
  );
};

export default TaskBoardEmployeeProvider;
