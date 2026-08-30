/**
 * Lucide React icon components used for displaying task metadata and actions.
 * - ClipboardList: Visual identifier for task/clipboard operations.
 * - Calendar: Displays date-related information (due dates).
 * - Trash2: Represents delete/remove action functionality.
 * - Edit2: Represents edit/modify action functionality.
 */
import { Clock3, Calendar, Trash2, Edit2 } from "lucide-react";

/**
 * Custom React hook providing access to the task board context.
 * Provides: taskList, isLoading, employeeList, and task management operations.
 */
import { useTaskBoard } from "../contexts/TaskBoardContext";

/**
 * Shared component that displays an empty state message when no data is available.
 * Used to show a user-friendly message when no tasks are assigned.
 */
import EmptyState from "../../../../shared/components/EmptyState";

/**
 * Premium animation loader component for displaying loading states.
 * Displays a grid of skeleton cards while data is being fetched.
 */
import PremiumUniversalLoader from "../../../../shared/components/Animations/PremiumUniversalLoader";
import getRandomColor from "../constants/taskCardAvatarColor";
/**
 * Displays a responsive grid of task cards for the admin task dashboard.
 *
 * Renders all tasks from the task board context in a grid layout that adapts
 * to different screen sizes (1 column on mobile, 2 on tablet, 3 on desktop).
 * Shows loading state while fetching tasks, empty state when no tasks exist,
 * and provides edit/delete controls for each task card.
 *
 * @component
 * @param {Object} props Component properties.
 * @param {Function} props.setEditingTask Updates the parent's editing task state for modal.
 * @param {Function} props.setIsOpenTask Controls the visibility of the task form modal.
 * @returns {JSX.Element} Rendered task grid, loader, or empty state.
 */
function TaskDashboardGrid({handleDeleteTask,handleStatusChange,handleEditTask }) {
  const { taskList, isLoading, employeeList } = useTaskBoard();
  if (isLoading) {
    return <PremiumUniversalLoader variant="card" gridCount={4} />;
  }
  if (taskList.length === 0) {
    return (
      <EmptyState
        title=" No tasks assigned yet"
        description="Try assigning a brand-new deliverable to a registered staff member
            to fill up this workspace."
      />
    );
  }

  /**
   * Converts various date formats to a localized date string.
   *
   * Handles multiple date input formats commonly encountered with Firestore/Firebase:
   * - Firebase Timestamp objects (has `toDate()` method)
   * - JavaScript Date objects
   * - Date strings (ISO format or parseable by Date constructor)
   * - Firestore timestamp-like objects (with `seconds` property)
   *
   * Returns a localized date string (e.g., "8/30/2026") or "-" if date is null/undefined
   * or cannot be parsed.
   *
   * @param {Timestamp|Date|string|Object|null} date The date to format in any supported format.
   * @returns {string} Formatted date string in local locale format, or "-" if invalid.
   * @example
   * // Firebase Timestamp
   * formatFirestoreDate(firebaseTimestamp) // "8/30/2026"
   * // JavaScript Date
   * formatFirestoreDate(new Date(2026, 7, 30)) // "8/30/2026"
   * // Date string
   * formatFirestoreDate("2026-08-30") // "8/30/2026"
   * // Firestore object
   * formatFirestoreDate({ seconds: 1725052800 }) // "8/30/2026"
   * // Null/undefined
   * formatFirestoreDate(null) // "-"
   */
  const formatFirestoreDate = (date) => {
    if (!date) return "-";

    // Firebase Timestamp
    if (typeof date.toDate === "function") {
      return date.toDate().toLocaleDateString();
    }

    // JavaScript Date
    if (date instanceof Date) {
      return date.toLocaleDateString();
    }

    // String
    if (typeof date === "string") {
      return new Date(date).toLocaleDateString();
    }

    // Firestore timestamp-like object
    if (typeof date.seconds === "number") {
      return new Date(date.seconds * 1000).toLocaleDateString();
    }

    return "-";
  };
  return (
    <div className="w-full p-2">
      {/* 
        Responsive Grid Layout:
        - 1 column on mobile (default)
        - 2 columns on tablet screens (md breakpoint)
        - 3 columns on desktop screens (lg breakpoint)
        Gap between cards is 24px (6 * 4px spacing units)
      */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        id="tasks-cards-grid"
      >
        {taskList.map((t) => {
          const employee = employeeList.find(
            (emp) => emp.employeeId === t.assignEmployee,
          );

          return (
            <div
              key={t.id}
              className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="space-y-3">
                {/* Priority & Status header */}
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      t.priority === "high"
                        ? "bg-rose-50 text-rose-700 border border-rose-100"
                        : t.priority === "medium"
                          ? "bg-amber-50 text-amber-700 border border-amber-100"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                    }`}
                  >
                    {t.priority} Priority
                  </span>

                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      t.status === "completed"
                        ? "bg-emerald-100 text-emerald-800"
                        : t.status === "progress"
                          ? "bg-sky-100 text-sky-800"
                          : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {t.status}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h4
                    className="text-sm font-bold text-slate-900 leading-snug line-clamp-1"
                    title={t.taskTitle}
                  >
                    {t.taskTitle}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-3">
                    {t.description}
                  </p>
                </div>
              </div>

              {/* Footer section (Employee, Due Date, Controls) */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                {/* Assignee info */}
                <div className="flex items-center gap-2.5">
                  <div
                    className={`h-7 w-7 rounded-full bg-linear-to-br ${getRandomColor()} text-white font-extrabold text-[10px] flex items-center justify-center uppercase shadow-xs`}
                  >
                    {`${employee?.firstName[0]}`}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-800 block leading-tight">
                      {`${employee?.firstName} ${employee?.lastName}`}
                    </span>
                    <span className="text-[9px] text-slate-400 block font-mono">
                      ID: {employee?.employeeId}
                    </span>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1.5">
                    <Clock3 className="h-3.5 w-3.5 text-indigo-500" />

                    <span className="text-xs font-bold text-indigo-700">
                      {t.estimateHour} H
                    </span>
                  </div>
                </div>

                {/* Dates */}
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                  <span className="flex items-center gap-1 font-mono">
                    <Calendar className="h-3 w-3 shrink-0 text-slate-400" />
                    Due: {t.dueDate}
                  </span>
                  <span className="font-mono">
                    Assigned: {formatFirestoreDate(t.dateAssigned)}
                  </span>
                </div>

                {/* Admin State controllers */}
                <div className="flex gap-2 pt-1 items-center justify-between border-t border-slate-50 mt-1">
                  <div>
                    <select
                      value={t.status}
                      onChange={(e) => handleStatusChange(t.id, e.target.value,t)}
                      className="px-2 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md text-[10px] font-bold text-slate-700 focus:outline-none cursor-pointer transition-colors"
                    >
                      <option value="pending">🕒 Pending</option>
                      <option value="progress">⚡ In Progress</option>
                      <option value="completed">✅ Completed</option>
                    </select>
                  </div>

                  {/* Action Buttons: Edit and Delete */}
                  <div className="flex items-center gap-1.5">
                    {/* EDIT BUTTON */}
                    <button
                      onClick={() => {
                        handleEditTask(t);
                      }}
                      className="p-1.5 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 rounded-lg cursor-pointer transition-colors"
                      title="Edit task"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>

                    {/* DELETE BUTTON */}
                    <button
                      onClick={() => handleDeleteTask(t.id)}
                      className="p-1.5 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg cursor-pointer transition-colors"
                      title="Delete task"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default TaskDashboardGrid;
