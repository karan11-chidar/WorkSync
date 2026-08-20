import React, { useState } from "react";
import { TaskBoardContext } from "./TaskBoardContext";
import { getEmployeeListService } from "../../employeeDirectory/services/employeeService";
import { useAuth } from "../../../auth/context/AuthContext";
import { toastError } from "../../../../shared/services/toastService";
import React from "react";
import React from "react";

/**
 * Establishes the React context boundary for the admin task board.
 *
 * Place this provider above task board components that consume
 * `useTaskBoard`. The provider currently forwards its children through the
 * context boundary; task board state and actions can be supplied through the
 * provider value as the feature implementation evolves.
 *
 * @param {{ children: React.ReactNode }} props Provider props.
 * @returns {JSX.Element} The task board context provider tree.
 * @example
 * <TaskBoardProvider>
 *   <TaskBoard />
 * </TaskBoardProvider>
 */
function TaskBoardProvider({ children }) {
  const [employeeList, setEmployeeList] = useState([]);
  const { user } = useAuth();
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(false);
  const createTask = async (formData) => {
    try {
      const taskData = await createTaskService();
    } catch (error) {
      toastError("Firebase Error" + error.message);
    }
  };
  const updateTask = async (formData) => {
    try {
    } catch (error) {
      toastError("Firebase Error" + error.message);
    }
  };
  const deleteTask = async (formData) => {
    try {
    } catch (error) {
      toastError("Firebase Error" + error.message);
    }
  };
  const getTaskList = async (formData) => {
    try {
    } catch (error) {
      toastError("Firebase Error" + error.message);
    }
  };
  /**
   * Resolves employee data used by the task board provider.
   *
   * This function is reserved for the provider's data-loading flow and should
   * return the employee collection consumed by task board features.
   */
  const getEmployeeList = async () => {
    try {
      const employeeData = await getEmployeeListService();
      setEmployeeList(employeeData);
    } catch (error) {
      toastError("Firebase Error" + error.message);
    }
  };
  return (
    <TaskBoardContext.Provider value={{ getEmployeeList, employeeList }}>
      {children}
    </TaskBoardContext.Provider>
  );
}

export default TaskBoardProvider;
