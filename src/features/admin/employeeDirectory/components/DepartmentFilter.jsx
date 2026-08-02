import React from 'react'

function DepartmentFilter() {
    const [deptFilter, setDeptFilter] = React.useState('All');
    const availableDepts = ['HR', 'Engineering', 'Sales', 'Marketing', 'Finance', 'Operations'];
  return (
    <div className="space-y-1">
      <label className="text-xs font-semibold text-slate-500">Department</label>
      <select
        value={deptFilter}
        onChange={(e) => setDeptFilter(e.target.value)}
        className="w-full p-2.5 rounded-lg border border-slate-200 text-xs bg-white focus:ring-1 focus:ring-indigo-600"
      >
        <option value="All">All Departments</option>
        {availableDepts.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DepartmentFilter
