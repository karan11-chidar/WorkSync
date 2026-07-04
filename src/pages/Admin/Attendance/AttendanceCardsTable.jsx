import React from 'react'
import ListHeader from './ListHeader';
import AttendanceList from './AttendanceList';

function AttendanceCardsTable() {
  return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-5 space-y-4">
          <ListHeader />
          <AttendanceList/>
    </div>
  );
}

export default AttendanceCardsTable
