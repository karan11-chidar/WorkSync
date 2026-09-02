import React from 'react'
import StateCard from './StateCard'
import { ClipboardList,Clock,AlertTriangle,CircleCheck } from "lucide-react";
import { useTaskBoard } from '../contexts/TaskBoardContext';
import PremiumUniversalLoader from '../../../../shared/components/Animations/PremiumUniversalLoader';
function TasksStateCards() {
  const { taskList,isLoading } = useTaskBoard();
if(isLoading)return <PremiumUniversalLoader variant='grid' gridCount={4}/>
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StateCard
        Icon={ClipboardList}
        textColor="text-blue-500"
        bgColor="bg-blue-100"
        title="Total Assigned"
        count={taskList.length}
      />
      <StateCard
        Icon={Clock}
        textColor="text-yellow-500"
        bgColor="bg-yellow-100"
        title="Pending"
        count={taskList.filter((task) => task.status === "pending").length}
      />
      <StateCard
        Icon={AlertTriangle}
        textColor="text-red-500"
        bgColor="bg-red-100"
        title="In Progress"
        count={taskList.filter((task) => task.status === "progress").length}
      />
      <StateCard
        Icon={CircleCheck}
        textColor="text-green-500"
        bgColor="bg-green-100"
        title="Completed"
        count={taskList.filter((task) => task.status === "completed").length}
      />
    </div>
  );
}

export default TasksStateCards
