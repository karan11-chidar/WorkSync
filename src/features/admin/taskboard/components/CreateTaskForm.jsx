/**
 * Task creation and editing modal for the admin task board.
 *
 * The form owns field-level input state and delegates employee data access to
 * the task board context. Its parent controls visibility and the currently
 * selected task, which keeps modal lifecycle decisions outside this component.
 */

// React lifecycle and reducer primitives used by the form state machine.
import React, { useEffect, useReducer } from "react";

// Lucide icons used to visually identify form controls and actions.
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

// Feature-level context for employee options and task board operations.
import { useTaskBoard } from "../contexts/TaskBoardContext";

/**
 * Shape of the form state consumed by the task modal.
 *
 * Keeping all editable values in one object allows the reducer to update a
 * field without coupling the form controls to the persistence layer.
 */
const INITIAL_FORM_STATE = {
  formData: {
    taskTitle: "",
    assignEmployee: "",
    priority: "",
    dueDate: "",
    status: "",
    description: "",
    estimateHour: "",
    workingProject: "",
  },
  formError: {},
};

/**
 * Applies a single form-field update while preserving the remaining state.
 *
 * @param {typeof INITIAL_FORM_STATE} state Current reducer state.
 * @param {{ type: string, fieldName?: string, value?: string }} action Field
 *   update action dispatched by a form control.
 * @returns {typeof INITIAL_FORM_STATE} The next reducer state.
 */
const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.fieldName]: action.value,
        },
      };
    default:
      return state;
  }
};
/**
 * Renders the create and edit task modal.
 *
 * The parent controls modal visibility and the task selected for editing.
 * This component is intentionally presentation-focused; task persistence is
 * handled by the surrounding task-board workflow.
 *
 * @param {Object} props Component properties.
 * @param {boolean} props.isOpenTask Whether the task modal is visible.
 * @param {Object|null} props.editingTask Task being edited, or `null` for a
 *   new task.
 * @param {Function} props.setIsOpenTask Updates modal visibility.
 * @param {Function} props.setEditingTask Updates or clears the selected task.
 * @returns {JSX.Element|null} The task modal, or `null` when it is closed.
 */
function CreateTaskForm({
  isOpenTask,
  editingTask,
  setIsOpenTask,
  setEditingTask,
}) {
  const { getEmployeeList, employeeList } = useTaskBoard();

  //----------------------------------------------------------
  // Local Component States
  //----------------------------------------------------------
  const [formState, dispatch] = useReducer(formReducer, INITIAL_FORM_STATE);

  /**
   * Synchronizes a form control change with the reducer state.
   *
   * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>} event
   *   Change event emitted by the form control.
   * @returns {void}
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "UPDATE_FIELD",
      fieldName: name,
      value,
    });
  };

  /**
   * Prevents the browser's default form submission behavior.
   *
   * Task persistence is intentionally delegated to the surrounding task-board
   * workflow and will be connected here when that workflow is implemented.
   *
   * @param {React.FormEvent<HTMLFormElement>} event Form submission event.
   * @returns {void}
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
  };


  // Load employee options once when the task form mounts.
  useEffect(() => {
    getEmployeeList();
  }, []);
  return (
    (isOpenTask || editingTask) && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-md">
        <div className="flex max-h-[90vh] w-full max-w-lg flex-col rounded-2xl bg-white p-6 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="flex items-center gap-2 text-md font-semibold text-slate-900">
              <ClipboardList className="h-5 w-5 text-indigo-600" />
              {editingTask ? "Edit Task" : "Create New Task"}
            </h3>

            <button
              onClick={() => {
                setEditingTask(null);
                setIsOpenTask(false);
              }}
              aria-label="Close task form"
              className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-700 active:scale-95"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}

          <form
            onSubmit={handleSubmit}
            className="flex-1 space-y-4 overflow-y-auto py-4 text-xs"
          >
            {/* Task Title */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-600">
                Task Title *
              </label>

              <input
                required
                name="taskTitle"
                value={formState.taskTitle}
                onChange={handleChange}
                placeholder="Create Dashboard UI"
                className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-1  focus:ring-indigo-600 outline-none"
              />
            </div>

            {/* Employee + Priority */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="font-semibold text-slate-600">
                  Assign To
                </label>
                <div className="relative">
                  <User className="absolute left-2.5 top-3 h-3.5 w-3.5 text-slate-400" />
                  <select
                    onChange={handleChange}
                    value={formState.assignEmployee}
                    name="assignEmployee"
                    className="w-full rounded-lg border border-slate-200 p-2.5 pl-8 outline-none focus:ring-1 focus:ring-indigo-600"
                  >
                    <option value="">--- Select a Employee --- </option>
                    {employeeList.map((emp, idx) => (
                      <option
                        key={idx}
                      >{`${emp.employeeId} ${emp.firstName} ${emp.lastName}`}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-600">Priority</label>
                <div className="relative">
                  <Flag className="absolute left-2.5 top-3 h-3.5 w-3.5 text-slate-400" />

                  <select
                    onChange={handleChange}
                    value={formState.priority}
                    name="priority"
                    className="w-full rounded-lg border border-slate-200 p-2.5 pl-8 outline-none focus:ring-1 focus:ring-indigo-600"
                  > <option value="">-- Select a Priority --</option>
                    <option value='high'>High 🔴</option>
                    <option value='medium'>Medium 🟡</option>
                    <option value='low'>Low 🟢</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Date + Hours */}

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="font-semibold text-slate-600">Due Date</label>

                <div className="relative">
                  <CalendarDays className="absolute left-2.5 top-3 h-3.5 w-3.5 text-slate-400" />

                  <input
                    name="dueDate"
                    value={formState.dueDate }
                    onChange={handleChange}
                    type="date"
                    className="w-full rounded-lg border border-slate-200 p-2.5 pl-8 outline-none focus:ring-1 focus:ring-indigo-600"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-600">Hours</label>

                <div className="relative">
                  <Clock3 className="absolute left-2.5 top-3 h-3.5 w-3.5 text-slate-400" />

                  <input
                    name="estimateHour"
                    value={formState.estimateHour}
                    onChange={handleChange}
                    type="number"
                    placeholder="10"
                    className="w-full rounded-lg border border-slate-200 p-2.5 pl-8 outline-none focus:ring-1 focus:ring-indigo-600"
                  />
                </div>
              </div>
            </div>

            {/* Status + Project */}

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="font-semibold text-slate-600">Status</label>

                <select
                  onChange={handleChange}
                  value={formState.status}
                  name="status"
                  className="w-full rounded-lg border border-slate-200 p-2.5 outline-none focus:ring-1 focus:ring-indigo-600"
                ><option value="">-- Select a Status --</option>
                  <option value='pending'>Pending</option>
                  <option value='progress'>In Progress</option>
                  <option value='completed'>Completed</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-600">Project</label>

                <div className="relative">
                  <FolderKanban className="absolute left-2.5 top-3 h-3.5 w-3.5 text-slate-400" />

                  <input
                    name="workingProject"
                    value={formState.workingProject}
                    onChange={handleChange}
                    placeholder="HR Dashboard"
                    className="w-full rounded-lg border border-slate-200 p-2.5 pl-8 outline-none focus:ring-1 focus:ring-indigo-600"
                  />
                </div>
              </div>
            </div>

            {/* Description */}

            <div className="space-y-1">
              <label className="font-semibold text-slate-600">
                Description
              </label>

              <textarea
                onChange={handleChange}
                value={formState.description}
                name="description"
                rows="3"
                placeholder="Task details..."
                className="w-full resize-none rounded-lg border border-slate-200 p-2.5 outline-none focus:ring-1 focus:ring-indigo-600"
              />
            </div>

            {/* Footer */}

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => {
                  setEditingTask(null);
                  setIsOpenTask(false);
                }}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-600 transition-colors hover:bg-slate-100 active:scale-95"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-medium text-white transition-colors hover:bg-indigo-700 active:scale-95"
              >
                {editingTask ? "Update Task" : "Assign Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default CreateTaskForm;
