import React, { useState } from 'react'
import { Calendar,Search } from 'lucide-react';
function ListHeader() {
    const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 className="text-[0.9rem] lg:text-[1.125rem] font-bold text-slate-900 flex items-center gap-2">
          <Calendar className="h-4 w-4 text-indigo-600" />
          Day Sheet: June 18, 2026
        </h2>
        <p className="text-[0.725rem] lg:text-[0.88rem] text-slate-400 mt-1.5">
          Override logins, mark delays, and log absences for operational
          members.
        </p>
      </div>
      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="Filter by staff name..."
          className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-hidden focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 w-full"
        />
      </div>
    </div>
  );
}

export default ListHeader
