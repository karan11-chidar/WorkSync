import React from 'react'
import StateCard from './StateCard'
import { ClipboardList,Clock,AlertTriangle,CircleCheck } from "lucide-react";
function TasksStateCards() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StateCard icon={ClipboardList} textColor="text-blue-500" bgColor="bg-blue-100" title="Total Assigned" />
      <StateCard icon={Clock} textColor="text-yellow-500" bgColor="bg-yellow-100" title="Pending" />
      <StateCard icon={AlertTriangle} textColor="text-red-500" bgColor="bg-red-100" title="In Progress" />
      <StateCard icon={CircleCheck} textColor="text-green-500" bgColor="bg-green-100" title="Completed" />
    </div>
  );
}

export default TasksStateCards
