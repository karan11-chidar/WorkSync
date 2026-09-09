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
 * Manages employee lists, tasks CRUD, filtering, and payload normalization.
 *
 * @component
 * @param {Object} props - React component props.
 * @param {React.ReactNode} props.children - Child components wrapped within this Provider.
 * @returns {JSX.Element} Context provider wrapper.
 */
function TaskBoardProvider({ children }) {
  const { user } = useAuth();

  const [employeeList, setEmployeeList] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredTaskList, setFilteredTaskList] = useState([]);

  const [filterState, setFilterState] = useState({
    "status-filter": "all",
    "priority-filter": "all",
    "employee-filter": "all",
    "date-filter": "",
  });

  const isFilterActive =
    filterState["status-filter"] !== "all" ||
    filterState["priority-filter"] !== "all" ||
    filterState["employee-filter"] !== "all" ||
    filterState["date-filter"] !== "";

  const displayTaskList = isFilterActive ? filteredTaskList : taskList;

  /**
   * Helper: Matches assigned employee ID with employeeList and extracts avatar URL & Auth UID.
   *
   * @param {string} assignedEmployeeId - Target employee ID or UID string.
   * @returns {{ avatarUrl: string, assignedToUid: string }} Object containing avatar URL and Auth UID.
   */
  const getAssignedEmployeeDetails = (assignedEmployeeId) => {
    if (!assignedEmployeeId) return { avatarUrl: "", assignedToUid: "" };
    const target = String(assignedEmployeeId).trim().toLowerCase();

    const assignedEmp = employeeList.find((emp) => {
      return (
        (emp.employeeId &&
          String(emp.employeeId).trim().toLowerCase() === target) ||
        (emp.uid && String(emp.uid).trim().toLowerCase() === target) ||
        (emp.id && String(emp.id).trim().toLowerCase() === target)
      );
    });

    const avatarUrl =
      assignedEmp?.avatarUrl ||
      assignedEmp?.photoURL ||
      assignedEmp?.avatar ||
      "";

    const assignedToUid =
      assignedEmp?.uid || assignedEmp?.id || assignedEmp?.employeeId || "";

    return { avatarUrl, assignedToUid };
  };
  /**
   * Creates a new task in the task board.
   *
   * @param {Object} formData - Task creation payload from modal form.
   */
  const createTask = async (formData) => {
    try {
      setIsLoading(true);

      const { avatarUrl, assignedToUid } = getAssignedEmployeeDetails(
        formData.assignEmployee,
      );
      const payLoad = {
        ...formData,
        avatarUrl,
        assignedTo: assignedToUid, // Assigned Employee Auth UID
        dateAssigned: new Date(),
      };

      const taskData = await createTaskService(user?.uid, payLoad);

      setTaskList((prev) => [
        ...prev,
        taskData || { id: Date.now(), ...payLoad },
      ]);
    } catch (error) {
      toastError("Firebase Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Updates an existing task in the task board.
   *
   * @param {string} taskId - Target task ID.
   * @param {Object} formData - Updated task form parameters.
   */
  const updateTask = async (taskId, formData) => {
    try {
      setIsLoading(true);

      const { avatarUrl, assignedToUid } = getAssignedEmployeeDetails(
        formData.assignEmployee,
      );

      const payLoad = {
        ...formData,
        avatarUrl,
        assignedTo: assignedToUid, // Assigned Employee Auth UID
      };

      await updateTaskService(taskId, payLoad);

      setTaskList((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, ...payLoad } : task,
        ),
      );
    } catch (error) {
      toastError("Firebase Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Deletes a task from the task board.
   *
   * @param {string} taskId - Target task ID to remove.
   */
  const deleteTask = async (taskId) => {
    try {
      setIsLoading(true);
      await deleteTaskService(taskId);
      setTaskList((prev) => prev.filter((task) => task.id !== taskId));
    } catch (error) {
      toastError("Firebase Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Fetches all tasks from Firebase.
   */
  const getTaskList = async () => {
    try {
      setIsLoading(true);
      const taskListData = await getTaskListService();
      setTaskList(taskListData || []);
    } catch (error) {
      toastError("Firebase Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Fetches all employees from Firebase.
   */
  const getEmployeeList = async () => {
    try {
      setIsLoading(true);
      const employeeData = await getEmployeeService();
      setEmployeeList(employeeData || []);
      return employeeData || [];
    } catch (error) {
      toastError("Firebase Error: " + error.message);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Applies current filter state to the task list.
   */
  const applyFilters = () => {
    const statusFilter = filterState["status-filter"].toLowerCase();
    const priorityFilter = filterState["priority-filter"].toLowerCase();
    const employeeFilter = filterState["employee-filter"].toLowerCase();
    const dateFilter = filterState["date-filter"].toLowerCase();

    const filteredTasks = taskList.filter((task) => {
      const statusValue = task.status?.toLowerCase() || "";
      const priorityValue = task.priority?.toLowerCase() || "";
      const employeeValue = (
        task.assignEmployee ||
        task.assigneEmpId ||
        ""
      ).toLowerCase();
      const dateValue = task.dueDate?.toLowerCase() || "";

      const matchesStatus =
        statusFilter === "all" || statusValue === statusFilter;
      const matchesPriority =
        priorityFilter === "all" || priorityValue === priorityFilter;
      const matchesEmployee =
        employeeFilter === "all" || employeeValue === employeeFilter;
      const matchesDate = dateFilter === "" || dateValue === dateFilter;

      return matchesStatus && matchesPriority && matchesEmployee && matchesDate;
    });

    setFilteredTaskList(filteredTasks);
  };

  // Synchronous Sequential Load: Employees pehle load honge, phir Tasks
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await getEmployeeList();
        await getTaskList();
      } catch (err) {
        toastError("Error initializing taskboard data: " + err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

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
