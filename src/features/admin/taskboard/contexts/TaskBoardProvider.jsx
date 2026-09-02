// React hooks for state management and side effects
import React, { useState, useEffect } from "react";

// Task board context for providing state to child components
import { TaskBoardContext } from "./TaskBoardContext";

// Firebase service functions for task operations
import {
  getEmployeeService, // Fetch list of employees
  createTaskService, // Create a new task in Firebase
  updateTaskService, // Update an existing task in Firebase
  deleteTaskService, // Delete a task from Firebase
  getTaskListService, // Fetch all tasks from Firebase
} from "../service/taskBoardService";

// Authentication context hook for getting current user
import { useAuth } from "../../../auth/context/AuthContext";

// Toast notification service for error/success messages
import { toastError } from "../../../../shared/services/toastService";

/**
 * TaskBoardProvider Component
 *
 * Establishes the React context boundary for the admin task board.
 * Manages all task board state including tasks, employees, filters, and loading states.
 * Provides context value with task CRUD operations and filter management to child components.
 *
 * Place this provider above task board components that consume the `useTaskBoard` hook.
 * The provider supplies task board state and actions through the context value.
 *
 * @component
 * @param {{ children: React.ReactNode }} props - Provider props
 * @param {React.ReactNode} props.children - Child components to render within the provider
 * @returns {JSX.Element} The task board context provider tree wrapping children
 * @example
 * <TaskBoardProvider>
 *   <TaskBoard />
 * </TaskBoardProvider>
 */
function TaskBoardProvider({ children }) {
  // Get current user from authentication context
  const { user } = useAuth();

  //----------------------------------------------------------
  // Local State
  //----------------------------------------------------------

  // State: List of employees available for task assignment
  const [employeeList, setEmployeeList] = useState([]);

  // State: Complete list of all tasks from Firebase
  const [taskList, setTaskList] = useState([]);

  // State: Loading indicator for async operations (create, update, delete, fetch)
  const [isLoading, setIsLoading] = useState(false);

  // State: Filtered task list based on current filter criteria
  const [filteredTaskList, setFilteredTaskList] = useState([]);

  // State: Current filter values for status, priority, employee, and date
  const [filterState, setFilterState] = useState({
    "status-filter": "all",
    "priority-filter": "all",
    "employee-filter": "all",
    "date-filter": "",
  });

  //----------------------------------------------------------
  // Derived State
  //----------------------------------------------------------
  const isFilterActive =
    filterState["status-filter"] !== "all" ||
    filterState["priority-filter"] !== "all" ||
    filterState["employee-filter"] !== "all" ||
    filterState["date-filter"] !== "";
  const displayTaskList= isFilterActive
    ? filteredTaskList
    : taskList;

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
  /**
   * Applies current filter state to the task list.
   *
   * Filters tasks based on the status filter value. When status filter is "all",
   * all tasks are included. Otherwise, only tasks matching the selected status are included.
   *
   * @function applyFilters
   * @returns {void} Updates filteredTaskList state
   */
  const applyFilters = () => {
    const statusFilter = filterState["status-filter"].toLowerCase();
    const priorityFilter = filterState["priority-filter"].toLowerCase();
    const employeeFilter = filterState["employee-filter"].toLowerCase();
    const dateFilter = filterState["date-filter"].toLowerCase();
    const filteredTasks = taskList.filter((task) => {
      const statusValue = task.status?.toLowerCase() || "";
      const priorityValue = task.priority?.toLowerCase() || "";
      const employeeValue = task.assignEmployee?.toLowerCase() || "";
      const dateValue = task.dueDate?.toLowerCase() || "";
      const matchesStatus =
        statusFilter === "all" || statusValue === statusFilter;
      const matchesPriority =
        priorityFilter === "all" || priorityValue === priorityFilter;
      const matchesEmployee =
        employeeFilter === "all" || employeeValue === employeeFilter;
      const matchesDate =
        dateFilter === "" || dateValue === dateFilter;
      return (
        matchesStatus &&
        matchesPriority &&
        matchesEmployee &&
        matchesDate
      );
    });
    setFilteredTaskList(filteredTasks);
  };

  /**
   * Side Effect: Apply filters whenever filter state or task list changes
   *
   * Dependencies:
   * - filterState: Re-apply filters when user changes filter selections
   * - taskList: Re-apply filters when task list updates (create, update, delete)
   *
   * This ensures the filteredTaskList stays in sync with both the filter criteria
   * and the underlying task data.
   */
  useEffect(() => {
    applyFilters();
  }, [filterState, taskList]);
  return (
    <TaskBoardContext.Provider
      value={{
        isLoading,
        employeeList,
        taskList,
        filteredTaskList,
        filterState,
        displayTaskList,
        setFilterState,
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
