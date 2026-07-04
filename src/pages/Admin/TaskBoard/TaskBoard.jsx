import { useState } from "react";
import CreateTaskForm from "./CreateTaskForm";
import TaskBoardHeader from "./TaskBoardHeader";
import TasksStateCards from "./TasksStateCards";
import FilterBar from "./FilterBar";
import TaskDashboardGrid from "./TaskDashboardGrid";
function TaskBoard() {
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
