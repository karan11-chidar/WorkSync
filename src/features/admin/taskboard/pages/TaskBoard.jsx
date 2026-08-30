/**
 * React hooks for managing component state and side effects.
 * - useState: Hook for managing local component state (modal visibility, editing task).
 * - useEffect: Hook for managing side effects like fetching task list on component mount.
 */
import { useState, useEffect } from "react";

/**
 * Modal component for creating and editing tasks.
 * Handles form submission, validation, and task persistence workflow.
 * Controlled by parent's `isOpenTask` and `editingTask` props.
 */
import CreateTaskForm from "../components/CreateTaskForm";

/**
 * Header component for the task board page.
 * Displays task board title, statistics, and "Create Task" action button.
 * Propagates task creation intent to parent component.
 */
import TaskBoardHeader from "../components/TaskBoardHeader";

/**
 * Summary state cards component displaying task statistics.
 * Shows counts and status breakdowns (Total Tasks, Completed, In Progress, Pending).
 */
import TasksStateCards from "../components/TasksStateCards";

/**
 * Filter and search bar component for task board.
 * Allows users to filter tasks by priority, status, assignee, or keyword search.
 */
import FilterBar from "../components/FilterBar";

/**
 * Responsive grid component displaying task cards.
 * Renders all tasks in a grid layout with edit/delete controls for each card.
 * Triggers modal opening and task editing state updates.
 */
import TaskDashboardGrid from "../components/TaskDashboardCardsGrid";

/**
 * Custom React hook providing access to the task board context.
 * Provides methods and data: taskList, isLoading, employeeList, createTask, updateTask, deleteTask, getTaskList, getEmployeeList.
 */
import { useTaskBoard } from "../contexts/TaskBoardContext";

/**
 * Toast notification service for displaying success and error messages.
 * - toastSuccess: Displays a success notification to the user.
 * - toastError: Displays an error notification to the user.
 */
import {
  toastSuccess,
  toastError,
} from "../../../../shared/services/toastService";

/**
 * Confirmation modal component for destructive actions.
 * Displays a modal dialog with confirmation and cancel options before proceeding
 * with actions like task deletion.
 */
import ConfirmModal from "../../../../shared/components/ConfirmModal";

/**
 * Main task board page orchestrating the task management workflow.
 *
 * This component manages the top-level state for task creation and editing modals.
 * It coordinates the task-management workflow by:
 * - Owning modal visibility state (`isOpenTask`) and editing task state (`editingTask`)
 * - Passing these states and their setters to child components
 * - Delegating data presentation, filtering, summary metrics, and task persistence
 *   to specialized child components (header, state cards, filter, grid, form)
 *
 * The component uses the TaskBoard context for accessing task data and operations
 * (create, update, delete, retrieve tasks and employee lists).
 *
 * @component
 * @returns {JSX.Element} The complete task board page layout with all sections:
 *   - TaskBoardHeader: Title and create task button
 *   - TasksStateCards: Summary statistics
 *   - FilterBar: Task filtering options
 *   - TaskDashboardGrid: Grid of task cards with edit/delete controls
 *   - CreateTaskForm: Modal for creating/editing tasks
 */
function TaskBoard() {
  const { getTaskList, deleteTask, updateTask } = useTaskBoard();

  /**
   * Controls the visibility of the delete confirmation modal.
   *
   * When true, the confirmation modal is displayed asking user to confirm task deletion.
   * Set to true by handleDeleteTask when user clicks delete; set to false after
   * confirmation or cancellation.
   *
   * @type {[boolean, Function]}
   */
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  /**
   * Stores the ID of the task to be deleted.
   *
   * Set by handleDeleteTask and used by confirmDeleteTask to identify which task
   * to delete from Firebase. Reset to null after deletion is confirmed or cancelled.
   *
   * @type {[string|null, Function]}
   */
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  /**
   * Initiates task deletion by showing confirmation modal.
   *
   * Sets the task ID to be deleted and opens the confirmation modal.
   * Does not perform actual deletion until user confirms in the modal.
   *
   * @param {string} id Unique identifier of the task to delete.
   * @returns {void}
   */
  const handleDeleteTask = (id) => {
    setDeleteTaskId(id);
    setIsConfirmOpen(true);
  };

  /**
   * Cancels the task deletion operation.
   *
   * Closes the confirmation modal and clears the delete task ID without
   * performing any deletion.
   *
   * @returns {void}
   */
  const cancelDeleteTask = () => {
    setIsConfirmOpen(false);
    setDeleteTaskId(null);
  };
  /**
   * Controls the visibility of the create/edit task modal.
   *
   * When false, the modal is hidden; when true, it displays.
   * Set to true by TaskBoardHeader (create new task) or TaskDashboardGrid (edit task).
   * Set to false by CreateTaskForm after successful submission or user cancellation.
   *
   * @type {[boolean, Function]}
   */
  const [isOpenTask, setIsOpenTask] = useState(false);

  /**
   * Tracks the task currently being edited in the modal.
   *
   * When null, the modal operates in "create" mode with empty form.
   * When set to a task object, the modal operates in "edit" mode with pre-filled data.
   * Set by TaskDashboardGrid's edit button; cleared after form submission or modal close.
   *
   * @type {[Object|null, Function]}
   */

  const [editingTask, setEditingTask] = useState(null);

  /**
   * Prepares a task for editing and opens the create/edit task form modal.
   *
   * Sets the task to be edited and opens the modal for the user to modify
   * task details. The form will be pre-populated with the existing task data.
   * Logs to console for debugging purposes.
   *
   * @param {Object} task The task object to be edited.
   * @param {string} task.id Task unique identifier.
   * @param {string} task.taskTitle Title of the task.
   * @returns {void}
   */
  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsOpenTask(true);
    console.log("Editing task:", task);
  };

  /**
   * Updates a task's status in Firebase and displays result notification.
   *
   * Asynchronously updates the task status to the selected value using the
   * task board context's updateTask method. Shows a success toast on successful
   * update or error toast if the update fails.
   *
   * @async
   * @param {string} id Unique identifier of the task being updated.
   * @param {string} newStatus The new status value (e.g., 'pending', 'progress', 'completed').
   * @param {Object} task The complete task object to merge with status change.
   * @returns {Promise<void>}
   * @throws Catches Firebase errors and displays error toast to user.
   */
  const handleStatusChange = async (id, newStatus, task) => {
    try {
      const updatedTaskData = {
        ...task,
        status: newStatus,
      };
      await updateTask(id, updatedTaskData);
      toastSuccess("Task status updated successfully");
    } catch (error) {
      toastError("Firebase Error: " + error.message);
    }
  };
  /**
   * Confirms and executes task deletion from Firebase.
   *
   * Asynchronously deletes the task from Firebase using the deleteTaskId stored
   * in state. Shows success notification on successful deletion or error notification
   * if deletion fails. Closes the confirmation modal after completion.
   *
   * @async
   * @returns {Promise<void>}
   * @throws Catches Firebase errors and displays error toast to user.
   */
  const confirmDeleteTask = async () => {
    try {
      await deleteTask(deleteTaskId);

      toastSuccess("Task deleted successfully");

      setIsConfirmOpen(false);
      setDeleteTaskId(null);
    } catch (error) {
      toastError("Firebase Error " + error.message);
    }
  };
  /**
   * Fetches the task list when the component mounts.
   *
   * SIDE EFFECT: Calls getTaskList from task board context on initial render to populate
   * the task list. The empty dependency array ensures this runs only once during the
   * component lifecycle.
   *
   * Dependencies: Empty - executes only on mount.
   */
  useEffect(() => {
    getTaskList();
  }, []);
  return (
    <div className="space-y-6">
      {/* Page Header Section: Title and Create Task Button */}
      <TaskBoardHeader
        setIsOpenTask={setIsOpenTask}
        setEditingTask={setEditingTask}
      />

      {/* Summary Statistics Section: Task counts and status breakdown */}
      <TasksStateCards />

      {/* Filter and Search Section: Task filtering controls */}
      <FilterBar />

      {/* Main Task Grid Section: Displays all tasks as interactive cards */}
      {/* Main Task Grid Section: Displays all tasks with edit/delete/status controls */}
      <TaskDashboardGrid
        setEditingTask={setEditingTask}
        setIsOpenTask={setIsOpenTask}
        handleDeleteTask={handleDeleteTask}
        handleEditTask={handleEditTask}
        handleStatusChange={handleStatusChange}
      />

      {/* Create/Edit Task Modal: Form for creating new tasks or editing existing ones */}
      <CreateTaskForm
        isOpenTask={isOpenTask}
        editingTask={editingTask}
        setIsOpenTask={setIsOpenTask}
        setEditingTask={setEditingTask}
      />
      {/* Confirmation Modal: Confirms task deletion before executing */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        confirmText="Delete Task"
        cancelText="Cancel"
        onConfirm={confirmDeleteTask}
        onCancel={cancelDeleteTask}
      />
    </div>
  );
}

export default TaskBoard;
