import React from 'react'
import { NotebookPen, Search,UserPlus } from 'lucide-react'
function SearchBar() {
    const [searchTerm, setSearchTerm] = React.useState('');
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search by name, role, email or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-all font-sans"
        />
      </div>
      <div className="flex gap-2 flex-wrap">
        <button
          // onClick={openAddMode}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer active:scale-95"
        >
          <UserPlus className="h-4 w-4" /> Add Employee
        </button>
        <button
          // onClick={openAddMode}
          className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer active:scale-95"
        >
          <NotebookPen className="h-4 w-4" /> Create Task
        </button>
      </div>
    </div>
  );
}

export default SearchBar
