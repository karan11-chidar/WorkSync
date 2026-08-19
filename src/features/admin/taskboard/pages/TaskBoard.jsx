import { useState } from "react";
import CreateTaskForm from "../components/CreateTaskForm";
import TaskBoardHeader from "../components/TaskBoardHeader";
import TasksStateCards from "../components/TasksStateCards";
import FilterBar from "../components/FilterBar";
import TaskDashboardGrid from "../components/TaskDashboardGrid";

/**
 * Coordinates the task board page and its task-management workflow.
 *
 * The page owns the visibility of the create/edit modal and the task currently
 * selected for editing. Data presentation, filtering, summary metrics, and
 * task persistence are delegated to the board's child components.
 *
 * @returns {JSX.Element} The task board page layout.
 */
function TaskBoard() {
  // A null editing task indicates that the modal is in create mode.
  const [isOpenTask, setIsOpenTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  return (
    <div className="space-y-6">
      <TaskBoardHeader setIsOpenTask={setIsOpenTask} setEditingTask={setEditingTask} />
      <TasksStateCards />
      <FilterBar />
      <TaskDashboardGrid setEditingTask={setEditingTask} setIsOpenTask={setIsOpenTask} />
      <CreateTaskForm
        isOpenTask={isOpenTask}
        editingTask={editingTask}
        setIsOpenTask={setIsOpenTask}
        setEditingTask={setEditingTask}
      />
    </div>
  );
}

export default TaskBoard;
