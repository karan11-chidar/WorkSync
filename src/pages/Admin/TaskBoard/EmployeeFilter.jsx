import React from 'react'

function EmployeeFilter() {
    const activeEmployees = [
        { id: 1, firstName: 'John', lastName: 'Doe' },
        { id: 2, firstName: 'Jane', lastName: 'Smith' },
        { id: 3, firstName: 'Alice', lastName: 'Johnson' },
        { id: 4, firstName: 'Bob', lastName: 'Brown' },
    ];
  return (
    <div>
      <select
        className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 max-w-50"
      >
        <option value="All">All Employees</option>
        {activeEmployees.map((e) => (
          <option key={e.id} value={e.id}>
            {e.firstName} {e.lastName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default EmployeeFilter
