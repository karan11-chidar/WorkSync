import React from 'react'
import TaskChecklistPreview from './TaskChecklistPreview'
import DailyClockCard from './DailyClockCard';

function LeftSection() {
  return (
    <div className="lg:col-span-2 space-y-6">
      <DailyClockCard />
      <TaskChecklistPreview />
    </div>
  );
}

export default LeftSection
