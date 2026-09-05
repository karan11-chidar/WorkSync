/**
 * @fileoverview Daily Clock Card Component
 *
 * Provides an interactive UI for employees to manage daily attendance,
 * including clock-in/out operations and break management. Displays current
 * attendance status, timestamps, and action buttons based on shift state.
 *
 * @module features/employee/dashboard/components/DailyClockCard
 */

/**
 * Lucide React icon components for attendance UI.
 *
 * Icons represent various attendance states and actions:
 * - Clock: Generic time/attendance indicator with optional spinning animation
 * - LogIn: Clock-in action trigger and status display
 * - LogOut: Clock-out action trigger and status display
 * - Coffee: Break status indicator icon
 * - Play: Resume work from break action button
 * - CheckCircle2: Completion and success feedback indicator
 * - CalendarDays: Date/calendar display in header section
 *
 * @requires lucide-react
 * @type {Object}
 */
import {
  Clock,
  LogIn,
  LogOut,
  Coffee,
  Play,
  CheckCircle2,
  CalendarDays,
} from "lucide-react";

/**
 * Custom hook for accessing dashboard attendance management context.
 *
 * Provides access to attendance operations and data:
 * - clockIn(): Initiate shift start
 * - clockOut(): Complete shift end
 * - startBreak(): Begin break period
 * - endBreak(): Resume work after break
 * - attendanceData: Current employee attendance record with status and timestamps
 * - isLoading: Boolean flag indicating async operation in progress
 *
 * @requires ../contexts/DashboardContext
 * @type {Function}
 * @returns {Object} Dashboard context with attendance management methods and data
 */
import { useDashboardContext } from "../contexts/DashboardContext";

/**
 * Loading animation component for attendance operations.
 *
 * Displays a visual loading indicator while async attendance actions
 * (clock-in, clock-out, break management) are being processed. Replaces
 * the entire card content to prevent user interaction during state transitions.
 *
 * @requires ../../../../shared/components/Animations/AttendanceLoader
 * @type {React.ComponentType}
 */
import AttendanceLoader from "../../../../shared/components/Animations/AttendanceLoader";
/**
 * DailyClockCard Component
 *
 * Interactive attendance management card that allows employees to:
 * - Clock in/out of shifts
 * - Manage break periods (start/resume)
 * - View current attendance status and timestamps
 * - See shift completion summary
 *
 * The component displays different UI states based on attendance status:
 * - NOT_CLOCKED_IN: Shows clock-in button
 * - WORKING: Shows break and clock-out buttons
 * - ON_BREAK: Shows resume work and clock-out buttons
 * - COMPLETED: Shows shift summary with check-in/out times
 *
 * Responsive design adapts from single-column (mobile) to multi-column layouts
 * on larger screens. Loading state is handled via AttendanceLoader component.
 *
 * @component
 * @returns {React.ReactElement} The interactive daily attendance card or loader
 *
 * @example
 * // Use within employee dashboard
 * <DailyClockCard />
 *
 * @throws {Error} If DashboardContext is not available in component tree
 */
export default function DailyClockCard() {
  // =========================================================================
  // Context & State
  // =========================================================================

  /**
   * Attendance management functions and data from dashboard context.
   *
   * @type {Object}
   * @property {Function} clockIn - Async function to initiate shift
   * @property {Function} clockOut - Async function to complete shift
   * @property {Function} startBreak - Async function to start break period
   * @property {Function} endBreak - Async function to end break period
   * @property {Object} attendanceData - Current attendance record with status, times, breaks
   * @property {boolean} isLoading - Indicates if an async operation is in progress
   */
  const { clockIn, clockOut, startBreak, endBreak, attendanceData, isLoading } =
    useDashboardContext();

  /**
   * Today's date formatted as a human-readable string.
   * Format: "Monday, September 5, 2026"
   *
   * @type {string}
   */
  const todayDateString = new Date().toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // =========================================================================
  // Event Handlers
  // =========================================================================

  /**
   * Handler for clock-in action.
   *
   * Initiates shift start by calling the clockIn() context function.
   * Handles loading state and any async operation errors internally via context.
   *
   * @async
   * @function handleClockIn
   * @returns {Promise<void>}
   */
  const handleClockIn = async () => {
    await clockIn();
  };

  /**
   * Handler for break toggle action.
   *
   * Manages break period transitions based on current attendance status:
   * - If WORKING: Initiates break period
   * - If ON_BREAK: Resumes work after break
   *
   * Only triggers if attendance status is either WORKING or ON_BREAK.
   *
   * @async
   * @function handleBreakToggle
   * @returns {Promise<void>}
   */
  const handleBreakToggle = async () => {
    if (attendanceData?.status === "WORKING") {
      await startBreak();
    } else if (attendanceData?.status === "ON_BREAK") {
      await endBreak();
    }
  };

  /**
   * Handler for clock-out action.
   *
   * Completes the shift by calling the clockOut() context function.
   * Handles loading state and any async operation errors internally via context.
   *
   * @async
   * @function handleClockOut
   * @returns {Promise<void>}
   */
  const handleClockOut = async () => {
    await clockOut();
  };

  // =========================================================================
  // Render
  // =========================================================================

  /**
   * Display loading indicator while async attendance operations are in progress.
   * Prevents user interaction during state transitions.
   */
  if (isLoading) {
    return <AttendanceLoader />;
  }
  return (
    <div className="w-full max-w-xl mx-auto p-2">
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-5">
        {/* ===================================================================
            HEADER SECTION
            Displays card title with animated status indicator and current date.
            Responsive layout: stacked on mobile, side-by-side on larger screens.
            =================================================================== */}
        <div className="flex flex-col lg:flex-row items-center justify-between border-b border-slate-100 pb-3.5 gap-2">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 shrink-0">
            <Clock
              className={`h-4 w-4 text-indigo-500 ${attendanceData?.status === "WORKING" ? "animate-spin [animation-duration:3s]" : ""}`}
            />
            Attendance & Clock Daily
          </h3>
          <span className=" text-[0.625rem] lg:text-[10px] sm:text-[11px]  font-mono text-slate-400 font-bold flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md border border-slate-100/50 truncate">
            <CalendarDays className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            {todayDateString}
          </span>
        </div>

        {/* ===================================================================
            STATUS BANNER SECTION
            Displays current attendance status with color-coded indicator icon.
            Shows shift check-in time, break duration, and clock-out time.
            Responsive: stacked on mobile, horizontal on larger screens.
            =================================================================== */}
        <div className="p-4 bg-slate-50/80 border border-slate-100 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`p-3 rounded-xl transition-all duration-300 shadow-xxs shrink-0 ${
                attendanceData?.status === "NOT_CLOCKED_IN"
                  ? "bg-indigo-50 text-indigo-600 ring-4 ring-indigo-50/50"
                  : attendanceData?.status === "WORKING"
                    ? "bg-emerald-50 text-emerald-600 ring-4 ring-emerald-50"
                    : attendanceData?.status === "ON_BREAK"
                      ? "bg-amber-50 text-amber-600 ring-4 ring-amber-50"
                      : "bg-slate-100 text-slate-600"
              }`}
            >
              {attendanceData?.status === "ON_BREAK" ? (
                <Coffee className="h-5 w-5" />
              ) : (
                <Clock className="h-5 w-5" />
              )}
            </div>
            <div>
              <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-wider">
                Current Status
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 block mt-0.5">
                {attendanceData?.status === "NOT_CLOCKED_IN" &&
                  "Absent • Shift Not Started"}
                {attendanceData?.status === "WORKING" &&
                  "Active • On The Clock"}
                {attendanceData?.status === "ON_BREAK" &&
                  "Stepped Out • On Break"}
                {attendanceData?.status === "COMPLETED" &&
                  "Shift Finished • Signed Out"}
              </span>
            </div>
          </div>

          {/* ===================================================================
              TIME LOGS DISPLAY
              Shows check-in time, break duration, and check-out time.
              Displayed as vertical labels on desktop, horizontal on mobile.
              Only visible when employee has clocked in.
              =================================================================== */}
          {attendanceData && attendanceData.status !== "NOT_CLOCKED_IN" && (
            <div className="flex flex-row sm:flex-col justify-start sm:text-right font-mono text-[10px] text-slate-400 gap-3 sm:gap-0.5 pt-2 sm:pt-0 border-t sm:border-t-0 sm:border-l border-slate-200 sm:pl-4">
              <div>
                In:
                <span className="text-slate-700 font-bold">
                  {attendanceData?.checkIn?.toDate().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) || "--:--"}
                </span>
              </div>
              {attendanceData?.totalBreakMinutes > 0 && (
                <div>
                  Break:
                  <span className="text-amber-600 font-bold">
                    {attendanceData?.totalBreakMinutes}m
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ===================================================================
            ACTION BUTTONS SECTION
            Renders context-aware buttons based on current attendance status:
            - NOT_CLOCKED_IN: Single "Clock-In Shift" button
            - WORKING/ON_BREAK: "Take Break"/"Resume Work" + "Clock-Out End" buttons
            - COMPLETED: Summary display showing shift times and completion status
            
            Mobile Responsive: Vertical stack on mobile (flex-col),
            2-column grid on larger screens (sm:grid-cols-2).
            =================================================================== */}
        <div className="w-full">
          {attendanceData?.status === "NOT_CLOCKED_IN" && (
            <button
              type="button"
              onClick={handleClockIn}
              className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 justify-center cursor-pointer shadow-sm transition-all active:scale-[0.99]"
            >
              <LogIn className="h-4 w-4" />
              Clock-In Shift
            </button>
          )}

          {(attendanceData?.status === "WORKING" ||
            attendanceData?.status === "ON_BREAK") && (
            /* Responsive button layout:
               - Mobile (xs/sm): Vertical flex layout (flex-col) for full-width buttons
               - Tablet/Desktop (sm+): 2-column grid layout for side-by-side buttons */
            <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleBreakToggle}
                className={`h-11 font-bold rounded-xl text-xs flex items-center gap-2 justify-center cursor-pointer transition-all active:scale-[0.99] border w-full ${
                  attendanceData?.status === "ON_BREAK"
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white border-transparent shadow-sm"
                    : "bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-200"
                }`}
              >
                {attendanceData?.status === "ON_BREAK" ? (
                  <>
                    <Play className="h-4 w-4 fill-white" />
                    Resume Work
                  </>
                ) : (
                  <>
                    <Coffee className="h-4 w-4" />
                    Take a Break
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleClockOut}
                className="h-11 bg-slate-900 hover:bg-slate-950 text-white font-bold rounded-xl text-xs flex items-center gap-2 justify-center cursor-pointer shadow-sm transition-all active:scale-[0.99] w-full"
              >
                <LogOut className="h-4 w-4" />
                Clock-Out End
              </button>
            </div>
          )}

          {attendanceData?.status === "COMPLETED" && (
            <div className="space-y-3 bg-slate-50/60 p-4 rounded-xl border border-slate-100 shadow-xxs">
              <div className="grid grid-cols-2 text-xs font-mono text-slate-600 divide-x divide-slate-200/60 text-center">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400 font-sans block">
                    SHIFT IN
                  </span>
                  <span className="font-bold text-slate-800 text-xs sm:text-sm">
                    {attendanceData?.checkIn.toDate().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) || "--:--"}
                  </span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400 font-sans block">
                    SHIFT OUT
                  </span>
                  <span className="font-bold text-slate-800 text-xs sm:text-sm">
                    {attendanceData?.checkOut?.toDate().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) || "--:--"}
                  </span>
                </div>
              </div>
              <div className="text-[10px] text-slate-400 italic text-center border-t border-slate-200/50 pt-2 flex items-center justify-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                All timestamps locked. Splendid work today!
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
