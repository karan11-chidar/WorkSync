import React, { createContext, useContext } from "react";

/**
 * @fileoverview Attendance Calendar Context for managing attendance data state.
 */

/**
 * @typedef {Object} AttendanceCalenderContextType
 * @property {boolean} isLoading - Attendance data loading state.
 * @property {Array<Object>} attendanceRecords - List of attendance records fetched from Firebase.
 * @property {Date} currentMonth - Currently selected calendar month.
 * @property {Array<Object>} calendarDays - Generated calendar days array for the grid.
 * @property {Array<Object>} statsData - Computed statistics (Present, Late, Leaves, etc.).
 * @property {Function} handlePrevMonth - Function to navigate to the previous month.
 * @property {Function} handleNextMonth - Function to navigate to the next month.
 * @property {Function} handleResetToday - Function to reset calendar to current today's date.
 * @property {Function} fetchEmployeeAttendance - Refetches attendance records from Firebase.
 */

/**
 * React Context for sharing Attendance Calendar state across components.
 * @type {React.Context<AttendanceCalenderContextType|null>}
 */
const AttendanceCalenderContext = createContext(null);
AttendanceCalenderContext.displayName = "AttendanceCalenderContext";

/**
 * Custom hook to consume the AttendanceCalenderContext easily.
 *
 * @returns {AttendanceCalenderContextType} The context values for attendance calendar.
 * @throws {Error} Throws an error if used outside of an AttendanceCalenderProvider.
 *
 * @example
 * const { attendanceRecords, isLoading, handleNextMonth } = useAttendanceCalender();
 */
export const useAttendanceCalender = () => {
  const context = useContext(AttendanceCalenderContext);

  if (!context) {
    throw new Error(
      "useAttendanceCalender must be used within an AttendanceCalenderProvider",
    );
  }

  return context;
};

export default AttendanceCalenderContext;
