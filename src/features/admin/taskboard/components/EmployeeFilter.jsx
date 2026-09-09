import { useTaskBoard } from "../contexts/TaskBoardContext";

/**
 * Renders the task board employee filter.
 *
 * @param {Object} props - Filter props.
 * @param {Function} props.handleChange - Handles employee selection changes.
 * @returns {JSX.Element} The employee filter.
 */
function EmployeeFilter({ handleChange }) {
  const { employeeList } = useTaskBoard();
  return (
    <div>
      <select
        name="employee-filter"
        onChange={handleChange}
        className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 max-w-50"
      >
        <option value="all">All Employees</option>
        {employeeList.map((e) => (
          <option key={e.employeeId} value={e.employeeId}>
            {e.firstName} {e.lastName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default EmployeeFilter;
