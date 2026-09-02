
/**
 * StatusFilter Component
 *
 * A dropdown filter component for selecting task statuses.
 * Displays status levels: All, Pending, In Progress, and Completed with visual indicators.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.handleChange - Callback function triggered when status selection changes
 * @returns {JSX.Element} A select dropdown with status filter options
 */
function StatusFilter({ handleChange }) {
  return (
    <div>
      <select
        name="status-filter"
        onChange={handleChange}
        className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-indigo-500">
        <option value="all">All Statuses</option>
        <option value="pending">🕒 Pending</option>
        <option value="progress">⚡ In Progress</option>
        <option value="completed">✅ Completed</option>
      </select>
    </div>
  );
}

export default StatusFilter;
