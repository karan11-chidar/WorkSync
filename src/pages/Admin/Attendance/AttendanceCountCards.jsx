import React from 'react'
import StateCard from './StateCard'
function AttendanceCountCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-7">
      <StateCard
        title="Attendance Rate"
        textColor="text-slate-400"
        stats="0%"
      />
      <StateCard title="Present" textColor="text-emerald-500" stats="0 Staff" />
      <StateCard title="Late Arrivals" textColor="text-amber-500" stats="0 Staff" />
      <StateCard title="Absences" textColor="text-rose-500 " stats="0 Staff" />
      <StateCard
        title="Official Leave"
        textColor="text-blue-400"
        stats="0 Staff"
      />
    </div>
  );
}

export default AttendanceCountCards
