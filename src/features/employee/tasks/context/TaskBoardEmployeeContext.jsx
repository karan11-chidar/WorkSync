import { createContext, useContext } from "react";

/**
 * TaskBoard Employee Context
 * Manages employee tasks, stats, active filters, and status updates.
 */
const TaskBoardEmployeeContext = createContext(null);
TaskBoardEmployeeContext.displayName = "TaskBoardEmployeeContext";

/**
 * Custom hook to easily consume TaskBoardEmployeeContext values.
 *
 * @returns {Object} Context state and action handlers for employee tasks.
 * @throws {Error} If used outside of TaskBoardEmployeeProvider.
 */
export const useTaskBoardEmployee = () => {
  const context = useContext(TaskBoardEmployeeContext);
  if (!context) {
    throw new Error(
      "useTaskBoardEmployee must be used within a TaskBoardEmployeeProvider",
    );
  }
  return context;
};

export default TaskBoardEmployeeContext;
