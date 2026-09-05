/** React runtime used for context state and JSX rendering. */
import React from "react";

/** Provides the authenticated employee to dashboard actions. */
import { useAuth } from "../../../auth/context/AuthContext";

/** Dashboard context consumed by employee dashboard components. */
import DashboardContext from "./DashboardContext";

/** Attendance service operations exposed through the dashboard context. */
import {
  clockInService,
  clockOutService,
  startBreakService,
  endBreakService,
  getTodayAttendanceService,
} from "../services/attendanceService";

/** Displays recoverable attendance errors to the employee. */
import { toastError } from "../../../../shared/services/toastService";

/**
 * Provides employee attendance state and actions to the dashboard tree.
 *
 * The provider coordinates loading state, attendance data, service calls, and
 * user-facing error notifications without exposing service details to views.
 *
 * @param {{ children: React.ReactNode }} props - Provider component properties.
 * @param {React.ReactNode} props.children - Dashboard content that receives the context.
 * @returns {JSX.Element} Dashboard context provider with attendance controls.
 */
const DashboardProvider = ({ children }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  const [attendanceData, setAttendanceData] = React.useState(null);

  /**
   * Starts the authenticated employee's current shift.
   *
   * @async
   * @returns {Promise<void>} Resolves after attendance state is updated.
   * @throws {Error} Errors are caught and displayed through the error toast.
   */
  const clockIn = async () => {
    try {
      setIsLoading(true);
      const data = await clockInService(user.uid);
      setAttendanceData(data);
    } catch (error) {
      toastError("Error clocking in:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Ends the authenticated employee's current shift.
   *
   * @async
   * @returns {Promise<void>} Resolves after attendance state is updated.
   * @throws {Error} Errors are caught and displayed through the error toast.
   */
  const clockOut = async () => {
    try {
      setIsLoading(true);
      const data = await clockOutService(user.uid);
      setAttendanceData(data);
    } catch (error) {
      toastError("Error clocking out:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Places the authenticated employee's active shift on break.
   *
   * @async
   * @returns {Promise<void>} Resolves after the break state is persisted.
   * @throws {Error} Errors are caught and displayed through the error toast.
   */
  const startBreak = async () => {
    try {
      setIsLoading(true);
      const data = await startBreakService(user.uid);
      setAttendanceData(data);
    } catch (error) {
      toastError("Error starting break:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Resumes work and records the authenticated employee's completed break.
   *
   * @async
   * @returns {Promise<void>} Resolves after the break state is persisted.
   * @throws {Error} Errors are caught and displayed through the error toast.
   */
  const endBreak = async () => {
    try {
      setIsLoading(true);
      const data = await endBreakService(user.uid);
      setAttendanceData(data);
    } catch (error) {
      toastError("Error ending break:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Loads the authenticated employee's attendance record for today.
   *
   * @async
   * @returns {Promise<void>} Resolves after attendance data is loaded.
   * @throws {Error} Errors are caught and displayed through the error toast.
   */
  const getAttendanceData = async () => {
    try {
      setIsLoading(true);
      const data = await getTodayAttendanceService(user.uid);
      if(data === null) 
        setAttendanceData({ status: "NOT_CLOCKED_IN" });
      else setAttendanceData(data);
    } catch (error) {
      toastError("Error fetching attendance data:", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    if (user?.uid) {
      getAttendanceData();
    }
  }, [user?.uid]);
  return (
    <DashboardContext.Provider
      value={{
        clockIn,
        clockOut,
        startBreak,
        endBreak,
        getAttendanceData,
        isLoading,
        attendanceData,
        user,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
