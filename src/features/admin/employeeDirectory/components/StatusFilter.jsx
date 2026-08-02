import React from 'react'

function StatusFilter() {
    const [statusFilter, setStatusFilter] = React.useState('All');
    const availableStatuses = ['Active', 'On Leave', 'Suspended', 'Terminated'];
  return (
    <div className="space-y-1">
      <label className="text-xs font-semibold text-slate-500">
        Employment Status
      </label>
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="w-full p-2.5 rounded-lg border border-slate-200 text-xs bg-white focus:ring-1 focus:ring-indigo-600"
        id="filter-status-select"
      >
        <option value="All">All Statuses</option>
        <option value="Active">Active</option>
        <option value="On Leave">On Leave</option>
        <option value="Suspended">Suspended</option>
        <option value="Terminated">Terminated</option>
      </select>
    </div>
  );
}

export default StatusFilter
