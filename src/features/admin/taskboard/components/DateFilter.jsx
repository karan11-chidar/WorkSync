/**
 * Renders the task board date filter.
 *
 * @param {Object} props - Filter props.
 * @param {Function} props.handleChange - Handles date selection changes.
 * @param {Object} props.filterState - Current filter state.
 * @returns {JSX.Element} The date filter.
 */
function DateFilter({ handleChange, filterState }) {
  return (
    <div>
      <input
        name="date-filter"
        placeholder="Select Date"
        type="date"
        onChange={handleChange}
        className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 group"
      />
    </div>
  );
}

export default DateFilter;
