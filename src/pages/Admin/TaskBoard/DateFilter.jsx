import React from 'react'

function DateFilter() {
  return (
    <div>
          <input
              placeholder="Select Date"
        type="date"
        className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 group"
      />
    </div>
  );
}

export default DateFilter
