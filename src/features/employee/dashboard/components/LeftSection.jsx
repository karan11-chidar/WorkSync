import React from "react";
import TaskChecklistPreview from "./TaskChecklistPreview";
import DailyClockCard from "./DailyClockCard";

/**
 * Renders the primary content section of the employee dashboard.
 *
 * @returns {JSX.Element} The dashboard left section.
 */
function LeftSection() {
  return (
    <div className="lg:col-span-2 space-y-6">
      <DailyClockCard />
      <TaskChecklistPreview />
    </div>
  );
}

export default LeftSection;
