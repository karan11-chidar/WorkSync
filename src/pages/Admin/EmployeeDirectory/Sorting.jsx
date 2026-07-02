import React from 'react'

function Sorting() {
    const [sortBy, setSortBy] = React.useState('name-az');
    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    }
  return (
    <div className="space-y-1">
      <label className="text-xs font-semibold text-slate-500">Sort By</label>
      <select
        value={sortBy}
        onChange={handleSortChange}
        className="w-full p-2.5 rounded-lg border border-slate-200 text-xs bg-white focus:ring-1 focus:ring-indigo-600"
        id="filter-sort-select"
      >
        <option value="name-az">Name (A to Z)</option>
        <option value="name-za">Name (Z to A)</option>
        <option value="salary-desc">Highest Salary</option>
        <option value="salary-asc">Lowest Salary</option>
        <option value="date-joined-new">Newest Joiners</option>
        <option value="date-joined-old">Oldest Joiners</option>
      </select>
    </div>
  );
}

export default Sorting
