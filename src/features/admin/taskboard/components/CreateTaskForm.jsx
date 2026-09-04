/**
 * Task creation and editing modal for the admin task board.
 *
 * The form owns field-level input state and delegates employee data access to
 * the task board context. Its parent controls visibility and the currently
 * selected task, which keeps modal lifecycle decisions outside this component.
 */

// React lifecycle and reducer primitives used by the form state machine.
import React, { useEffect, useReducer, useState } from "react";

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
  ShieldAlert,
} from "lucide-react";

// Feature-level context for employee options and task board operations.
import { useTaskBoard } from "../contexts/TaskBoardContext";

// form validation for form input data
import formValidation from "../validations/taskBoardValidation";
import {
  toastError,
  toastSuccess,
} from "../../../../shared/services/toastService";


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
        formError: {
          ...state.formError,
          [action.fieldName]: "", // Clear the error for the updated field
        },
      };
    case "SET_FORM_ERROR":
      return {
        ...state,
        formError: {
          ...action.formError,
        },
      };
    case "EDIT_FORM":
      return {
        ...state,
        formData: {
          ...INITIAL_FORM_STATE.formData,
          ...action.formData,
        },
      };

    case "RESET_FORM":
      return {
        ...INITIAL_FORM_STATE,
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
  const { getEmployeeList, employeeList, taskList, createTask, updateTask } =
    useTaskBoard();

  //----------------------------------------------------------
  // Local Component States
  //----------------------------------------------------------
  const [formState, dispatch] = useReducer(formReducer, INITIAL_FORM_STATE);

  const [isLoading, setIsLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  //----------------------------------------------------------
  // Derived Component States
  //----------------------------------------------------------
  const activeFormErrors = Object.values(formState.formError).filter(Boolean);

  /**
   * Synchronizes a form control change with the reducer state.
   *
   * Dispatches an UPDATE_FIELD action to the reducer with the changed field name
   * and value, simultaneously clearing any existing error for that field.
   *
   * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>} e
   *   Change event emitted by the form control containing the updated field data.
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
   * Closes the task modal and clears the editing task state.
   *
   * Resets both the modal visibility flag and the currently selected task,
   * returning the form to its initial closed state.
   *
   * @returns {void}
   */
  const handleClose = () => {
    setIsOpenTask(false);
    setEditingTask(null);
  };

  /**
   * Handles task form submission with validation and persistence.
   *
   * Validates form data against task board validation rules. On valid submission,
   * either creates a new task or updates an existing one based on `editingTask` state.
   * Displays success/error toast notifications and closes the modal on completion.
   * Prevents browser default form submission behavior.
   *
   * @async
   * @param {React.FormEvent<HTMLFormElement>} e Form submission event.
   * @returns {Promise<void>}
   * @throws Logs error messages and displays error toast if task creation/update fails.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, errors } = formValidation(formState.formData);
    if (!isValid) {
      dispatch({
        type: "SET_FORM_ERROR",
        formError: errors,
      });
      return;
    }
    try {
      setIsLoading(true);
      setIsDisable(true);
      if (editingTask === null) {
        await createTask(formState.formData);
        toastSuccess(
          `Task Created!`,
          `New ${formState.formData.taskTitle} added successfully .`,
        );
        dispatch({ type: "RESET_FORM" });
      } else {
        await updateTask(editingTask.id, formState.formData);
        toastSuccess(
          `Task Editing!`,
          `New ${formState.formData.taskTitle} updating successfully .`,
        );
      }
      // Close the modal after submission
      handleClose();

    } catch (error) {
      console.log(error.message);
      toastError(error?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
      setIsDisable(false);
    }
  };

  /**
   * Synchronizes editing task with form state.
   *
   * SIDE EFFECT: Watches the `editingTask` prop and populates the form with its data
   * when a task is selected for editing. Resets the form to initial state when no task
   * is being edited. This keeps the form data in sync with the parent's task selection.
   *
   * Dependencies: `editingTask` - triggers when the parent changes the selected task.
   */
  useEffect(() => {
    if (editingTask) {
      dispatch({
        type: "EDIT_FORM",
        formData: editingTask,
      });
    } else {
      dispatch({ type: "RESET_FORM" });
    }
  }, [editingTask]);

  /**
   * Loads employee list on component mount.
   *
   * SIDE EFFECT: Fetches the employee list from the task board context once when
   * the form component first mounts. This populates the employee dropdown options.
   * The empty dependency array ensures this runs only once during the component lifecycle.
   *
   * Dependencies: Empty - executes only on mount.
   */
  useEffect(() => {
    getEmployeeList();
  }, []);

  return (
    (isOpenTask || editingTask!==null) && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-md">
        <div className="flex max-h-[90vh] w-full max-w-lg flex-col rounded-2xl bg-white p-6 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="flex items-center gap-2 text-md font-semibold text-slate-900">
              <ClipboardList className="h-5 w-5 text-indigo-600" />
              {editingTask ? "Edit Task" : "Create New Task"}
            </h3>

            <button
              onClick={handleClose}
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
            {activeFormErrors.length > 0 && (
              <div
                className="rounded-2xl border border-rose-100 bg-rose-50/95 p-4 shadow-sm text-rose-900"
                role="alert"
                aria-live="assertive"
              >
                <div className="flex items-start gap-3">
                  <ShieldAlert className="h-5 w-5 text-rose-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold">
                      Please fix {activeFormErrors.length} validation issue
                      {activeFormErrors.length > 1 ? "s" : ""}.
                    </p>
                    <p className="text-[11px] text-rose-700/90">
                      Required fields are marked and inline messages display
                      details.
                    </p>
                  </div>
                </div>
              </div>
            )}
            {/* Task Title */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-600">
                Task Title *
              </label>

              <input
                required
                name="taskTitle"
                value={formState.formData.taskTitle}
                onChange={handleChange}
                placeholder="Create Dashboard UI"
                className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-1  focus:ring-indigo-600 outline-none"
              />
              <span className="text-rose-500 text-[10px] font-semibold">
                {formState.formError.taskTitle}
              </span>
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
                    value={formState.formData.assignEmployee}
                    name="assignEmployee"
                    className="w-full rounded-lg border border-slate-200 p-2.5 pl-8 outline-none focus:ring-1 focus:ring-indigo-600"
                  >
                    <option value="">--- Select a Employee --- </option>
                    {employeeList.map((emp) => (
                      <option
                        value={emp.employeeId}
                        key={emp.employeeId}
                      >{`${emp.employeeId} ${emp.firstName} ${emp.lastName}`}</option>
                    ))}
                  </select>
                  <span className="text-rose-500 text-[10px] font-semibold">
                    {formState.formError.assignEmployee}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-600">Priority</label>
                <div className="relative">
                  <Flag className="absolute left-2.5 top-3 h-3.5 w-3.5 text-slate-400" />

                  <select
                    onChange={handleChange}
                    value={formState.formData.priority}
                    name="priority"
                    className="w-full rounded-lg border border-slate-200 p-2.5 pl-8 outline-none focus:ring-1 focus:ring-indigo-600"
                  >
                    <option value="">-- Select a Priority --</option>
                    <option value="high">High 🔴</option>
                    <option value="medium">Medium 🟡</option>
                    <option value="low">Low 🟢</option>
                  </select>
                  <span className="text-rose-500 text-[10px] font-semibold">
                    {formState.formError.priority}
                  </span>
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
                    value={formState.formData.dueDate}
                    onChange={handleChange}
                    type="date"
                    className="w-full rounded-lg border border-slate-200 p-2.5 pl-8 outline-none focus:ring-1 focus:ring-indigo-600"
                  />
                  <span className="text-rose-500 text-[10px] font-semibold">
                    {formState.formError.dueDate}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-600">Hours</label>

                <div className="relative">
                  <Clock3 className="absolute left-2.5 top-3 h-3.5 w-3.5 text-slate-400" />

                  <input
                    name="estimateHour"
                    value={formState.formData.estimateHour}
                    onChange={handleChange}
                    type="number"
                    placeholder="10"
                    className="w-full rounded-lg border border-slate-200 p-2.5 pl-8 outline-none focus:ring-1 focus:ring-indigo-600"
                  />
                  <span className="text-rose-500 text-[10px] font-semibold">
                    {formState.formError.estimateHour}
                  </span>
                </div>
              </div>
            </div>

            {/* Status + Project */}

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="font-semibold text-slate-600">Status</label>

                <select
                  onChange={handleChange}
                  value={formState.formData.status}
                  name="status"
                  className="w-full rounded-lg border border-slate-200 p-2.5 outline-none focus:ring-1 focus:ring-indigo-600"
                >
                  <option value="">-- Select a Status --</option>
                  <option value="pending">Pending</option>
                  <option value="progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <span className="text-rose-500 text-[10px] font-semibold">
                  {formState.formError.status}
                </span>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-600">Project</label>

                <div className="relative">
                  <FolderKanban className="absolute left-2.5 top-3 h-3.5 w-3.5 text-slate-400" />

                  <input
                    name="workingProject"
                    value={formState.formData.workingProject}
                    onChange={handleChange}
                    placeholder="HR Dashboard"
                    className="w-full rounded-lg border border-slate-200 p-2.5 pl-8 outline-none focus:ring-1 focus:ring-indigo-600"
                  />
                  <span className="text-rose-500 text-[10px] font-semibold">
                    {formState.formError.workingProject}
                  </span>
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
                value={formState.formData.description}
                name="description"
                rows="3"
                placeholder="Task details..."
                className="w-full resize-none rounded-lg border border-slate-200 p-2.5 outline-none focus:ring-1 focus:ring-indigo-600"
              />
              <span className="text-rose-500 text-[10px] font-semibold">
                {formState.formError.description}
              </span>
            </div>

            {/* Footer */}

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-600 transition-colors hover:bg-slate-100 active:scale-95"
              >
                Cancel
              </button>

              <button
                disabled={isDisable}
                type="submit"
                className="disabled:opacity-50 disabled:cursor-not-allowed  rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-medium text-white transition-colors hover:bg-indigo-700 active:scale-95"
              >
                {editingTask === null
                  ? isLoading
                    ? "Creating..."
                    : "Assign Task"
                  : isLoading
                    ? "Updating..."
                    : "Update Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default CreateTaskForm;
