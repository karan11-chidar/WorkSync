import React from "react";
import {
  X,
  ClipboardList,
  CalendarDays,
  Clock3,
  User,
  Flag,
  FolderKanban,
  FileText,
} from "lucide-react";

function CreateTaskForm({
  isTaskOpen,
  editingTask,
  setIsTaskOpen,
  setEditingTask,
}) {
  const employees = [
    "Rahul Sharma",
    "Priya Verma",
    "Aman Singh",
    "Neha Patel",
    "Rohit Gupta",
  ];

  if (!isTaskOpen && !editingTask) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
      <div
        className="
      bg-white 
      rounded-2xl 
      w-full 
      max-w-lg
      shadow-2xl 
      p-6 
      flex 
      flex-col
      max-h-[90vh]
      "
      >
        {/* Header */}

        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h3 className="text-md font-semibold text-slate-900 flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-indigo-600" />

            {editingTask ? "Edit Task" : "Create New Task"}
          </h3>

          <button
            onClick={() => {
              setEditingTask(null);
              setIsTaskOpen(false);
            }}
            className="
            text-slate-400
            hover:text-slate-700
            p-1
            rounded-lg
            active:scale-95
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}

        <form
          className="
        flex-1 
        overflow-y-auto 
        py-4 
        space-y-4 
        text-xs
        "
        >
          {/* Task Title */}

          <div className="space-y-1">
            <label className="font-semibold text-slate-600">Task Title *</label>

            <input
              required
              placeholder="Create Dashboard UI"
              className="
              w-full 
              p-2.5
              rounded-lg
              border
              border-slate-200
              focus:ring-1
              focus:ring-indigo-600
              outline-none
              "
            />
          </div>

          {/* Employee + Priority */}

          <div
            className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          gap-3
          "
          >
            <div className="space-y-1">
              <label className="font-semibold text-slate-600">Assign To</label>

              <div className="relative">
                <User
                  className="
                absolute 
                left-2.5 
                top-3 
                h-3.5 
                w-3.5 
                text-slate-400"
                />

                <select
                  className="
                w-full
                pl-8
                p-2.5
                rounded-lg
                border
                border-slate-200
                outline-none
                focus:ring-1
                focus:ring-indigo-600
                "
                >
                  {employees.map((emp) => (
                    <option key={emp}>{emp}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-600">Priority</label>

              <div className="relative">
                <Flag
                  className="
                absolute left-2.5 top-3
                h-3.5 w-3.5
                text-slate-400"
                />

                <select
                  className="
                w-full
                pl-8
                p-2.5
                rounded-lg
                border
                border-slate-200
                "
                >
                  <option>High 🔴</option>
                  <option>Medium 🟡</option>
                  <option>Low 🟢</option>
                </select>
              </div>
            </div>
          </div>

          {/* Date + Hours */}

          <div
            className="
          grid 
          grid-cols-1
          sm:grid-cols-2
          gap-3
          "
          >
            <div className="space-y-1">
              <label className="font-semibold text-slate-600">Due Date</label>

              <div className="relative">
                <CalendarDays
                  className="
                absolute left-2.5 top-3
                h-3.5 w-3.5
                text-slate-400"
                />

                <input
                  type="date"
                  className="
                w-full
                pl-8
                p-2.5
                rounded-lg
                border
                border-slate-200
                "
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-600">Hours</label>

              <div className="relative">
                <Clock3
                  className="
                absolute left-2.5 top-3
                h-3.5 w-3.5
                text-slate-400"
                />

                <input
                  type="number"
                  placeholder="10"
                  className="
                w-full
                pl-8
                p-2.5
                rounded-lg
                border
                border-slate-200
                "
                />
              </div>
            </div>
          </div>

          {/* Status + Project */}

          <div
            className="
          grid 
          grid-cols-1
          sm:grid-cols-2
          gap-3"
          >
            <div className="space-y-1">
              <label className="font-semibold text-slate-600">Status</label>

              <select
                className="
              w-full p-2.5
              rounded-lg
              border border-slate-200"
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-600">Project</label>

              <div className="relative">
                <FolderKanban
                  className="
              absolute left-2.5 top-3
              h-3.5 w-3.5
              text-slate-400"
                />

                <input
                  placeholder="HR Dashboard"
                  className="
              w-full pl-8 p-2.5
              rounded-lg
              border border-slate-200"
                />
              </div>
            </div>
          </div>

          {/* Description */}

          <div className="space-y-1">
            <label className="font-semibold text-slate-600">Description</label>

            <textarea
              rows="3"
              placeholder="Task details..."
              className="
            w-full
            p-2.5
            rounded-lg
            border
            border-slate-200
            resize-none
            "
            />
          </div>

          {/* Footer */}

          <div
            className="
          flex
          justify-end
          gap-2
          pt-4
          border-t
          border-slate-100"
          >
            <button
              type="button"
              onClick={() => {
                setEditingTask(null);
                setIsTaskOpen(false);
              }}
              className="
            px-4 py-2.5
            border
            rounded-xl
            text-xs
            hover:bg-slate-300
            honv
            "
            >
              Cancel
            </button>

            <button
              className="
            px-5 py-2.5
            bg-indigo-600
            hover:bg-indigo-700
            text-white
            rounded-xl
            text-xs
            font-medium
            active:scale-95
            "
            >
              {editingTask ? "Update Task" : "Assign Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTaskForm;
