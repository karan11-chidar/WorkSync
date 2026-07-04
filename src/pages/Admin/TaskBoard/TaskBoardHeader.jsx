import React from 'react'
import { Plus } from 'lucide-react';
function TaskBoardHeader({ setIsOpenTask,setEditingTask }) {
  return (
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
        <div>
          <h1 className=" text-[1.1rem]    lg:text-2xl font-semibold text-slate-900 tracking-tight">
            Employees Task Board
          </h1>
          <p className="text-[0.725rem] lg:text-sm text-slate-500 mt-1">
            Assign, trace, and manage critical deliverables across your
            workforce.
          </p>
        </div>
        <button
              onClick={() => {
                  setIsOpenTask(true)
                setEditingTask(null)
              }
          }
          className="self-start md:self-auto px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all active:scale-95"
        >
          <Plus className="h-4 w-4" /> Assign New Task
        </button>
      </div > 
  )
}

export default TaskBoardHeader
