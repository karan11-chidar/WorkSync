import React, { useState } from "react";
import { TaskBoardContext } from "./TaskBoardContext";
import {
  getEmployeeService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
  getTaskListService,
} from "../service/taskBoardService";
import { useAuth } from "../../../auth/context/AuthContext";
import { toastError } from "../../../../shared/services/toastService";

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
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Creates a new task in the task board.
   *
   * Sends task data to the Firebase backend and updates the local task list
   * on successful creation. Sets loading state during the operation and displays
   * toast notifications for error handling.
   *
   * @async
   * @param {Object} formData - Task form data to create
   * @param {string} formData.taskTitle - Title of the task
   * @param {string} formData.assignEmployee - Employee ID to assign
   * @param {string} formData.priority - Priority level (high, medium, low)
   * @param {string} formData.dueDate - Due date for the task
   * @param {string} formData.status - Task status
   * @param {string} formData.description - Task description
   * @param {string} formData.estimateHour - Estimated hours to complete
   * @param {string} formData.workingProject - Associated project
   * @returns {Promise<void>} Promise resolving when task creation completes
   * @throws {Error} Shows toast error if task creation fails in Firebase
   */
  const createTask = async (formData) => {
    try {
      setIsLoading(true);
      const taskData = await createTaskService(user.uid, formData);
      setTaskList((prev) => [...prev, taskData]);
    } catch (error) {
      toastError("Firebase Error" + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  /**
   * Updates an existing task in the task board.
   *
   * Sends updated task data to the Firebase backend and reflects changes in
   * the local task list. Sets loading state during the operation and displays
   * toast notifications for error handling.
   *
   * @async
   * @param {string} taskId - Firestore document ID of the task to update
   * @param {Object} formData - Updated task form data
   * @param {string} [formData.taskTitle] - Updated task title
   * @param {string} [formData.assignEmployee] - Updated assigned employee
   * @param {string} [formData.priority] - Updated priority level
   * @param {string} [formData.dueDate] - Updated due date
   * @param {string} [formData.status] - Updated task status
   * @param {string} [formData.description] - Updated task description
   * @param {string} [formData.estimateHour] - Updated estimated hours
   * @param {string} [formData.workingProject] - Updated working project
   * @returns {Promise<void>} Promise resolving when task update completes
   * @throws {Error} Shows toast error if task update fails in Firebase
   */
  const updateTask = async (taskId, formData) => {
    try {
      setIsLoading(true);
      const updatedTaskData = await updateTaskService(taskId, formData);
      setTaskList((prev) =>
        prev.map((task) => {
          return task.id === taskId ? { ...task, ...formData } : task;
        }),
      );
    } catch (error) {
      toastError("Firebase Error" + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  /**
   * Deletes a task from the task board.
   *
   * Removes a task from Firebase and updates the local task list accordingly.
   * Sets loading state during the operation and displays toast notifications
   * for error handling.
   *
   * @async
   * @param {string} taskId - Firestore document ID of the task to delete
   * @returns {Promise<void>} Promise resolving when task deletion completes
   * @throws {Error} Shows toast error if task deletion fails in Firebase
   */
  const deleteTask = async (taskId) => {
    try {
      setIsLoading(true);
      await deleteTaskService(taskId);
      setTaskList((prev) => prev.filter((task) => task.id !== taskId));
    } catch (error) {
      toastError("Firebase Error" + error.message);
    } finally {
     setIsLoading(false);
    }
  };
  /**
   * Fetches all tasks from the task board.
   *
   * Retrieves the complete task list from Firebase and populates the local
   * task state. Sets loading state during the operation and displays toast
   * notifications for error handling.
   *
   * Usage: Call this function when initializing the task board or refreshing
   * the task list from the backend.
   *
   * @async
   * @returns {Promise<void>} Promise resolving when task list fetch completes
   * @throws {Error} Shows toast error if task list fetch fails in Firebase
   */
  const getTaskList = async () => {
    try {
      setIsLoading(true);
      const taskListData = await getTaskListService();
      setTaskList(taskListData);
    } catch (error) {
      toastError("Firebase Error" + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Fetches all employees from the task board.
   *
   * Retrieves the complete employee list from Firebase and populates the local
   * employee state. This function is used to populate employee assignment dropdowns
   * and other employee-related features in the task board.
   *
   * Usage: Call this function when initializing the task form or when employee
   * data needs to be refreshed from the backend.
   *
   * @async
   * @returns {Promise<void>} Promise resolving when employee list fetch completes
   * @throws {Error} Shows toast error if employee list fetch fails in Firebase
   */
  const getEmployeeList = async () => {
    try {
      setIsLoading(true);
      const employeeData = await getEmployeeService();
      setEmployeeList(employeeData);
    } catch (error) {
      toastError("Firebase Error" + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <TaskBoardContext.Provider
      value={{
        isLoading,
        employeeList,
        taskList,
        getEmployeeList,
        getTaskList,
        createTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskBoardContext.Provider>
  );
}

export default TaskBoardProvider;
