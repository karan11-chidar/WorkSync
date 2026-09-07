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
  getTasksDataService,
  getEmployeeDataService,
  getDepartmentEmployeesService
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
  /**
   * Authenticated employee context.
   */
  const { user } = useAuth();
  /**
   * Local state for loading status, attendance data, and employee profile.
   */
  const [isLoading, setIsLoading] = React.useState(false);
  /**
   * Attendance data for the authenticated employee.
   * Includes clock-in/out times, break status, and shift state.
   */
  const [attendanceData, setAttendanceData] = React.useState(null);
  /** Employee profile data for the authenticated employee.
   * Includes personal info, department, designation, and metadata.
   */
  const [employeeData, setEmployeeData] = React.useState(null);
  /** Tasks data for the authenticated employee.
   * Includes assigned tasks, deadlines, and completion status.
   */
  const [tasksData, setTasksData] = React.useState(null);
  /** Department employees data for the authenticated employee's department.
   * Includes colleagues' profiles, roles, and contact information.
   */
  const [departmentEmployeesData, setDepartmentEmployeesData] =
    React.useState(null);

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
      if (data === null) setAttendanceData({ status: "NOT_CLOCKED_IN" });
      else setAttendanceData(data);
    } catch (error) {
      toastError("Error fetching attendance data:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Loads the authenticated employee's profile data from Firestore.
   * @async
   * @returns {Promise<void>} Resolves after employee data is loaded.
   * @throws {Error} Errors are caught and displayed through the error toast.
   */
  const getEmployeeData = async () => {
    try {
      setIsLoading(true);
      const data = await getEmployeeDataService(user.uid);
      setEmployeeData(data);
    } catch (error) {
      toastError("Error fetching employee data:", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  /**
   * Loads the authenticated employee's tasks data from Firestore.
   * @async
   * @returns {Promise<void>} Resolves after tasks data is loaded.
   * @throws {Error} Errors are caught and displayed through the error toast.
   */
  const getTasksData = async () => {
    try {
      setIsLoading(true);
      const data = await getTasksDataService(user.uid);
      setTasksData(data);
    } catch (error) {
      toastError("Error fetching tasks data:", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  /**
   * Loads the authenticated employee's department employees data from Firestore.
   * @async
   * @returns {Promise<void>} Resolves after department employees data is loaded.
   * @throws {Error} Errors are caught and displayed through the error toast.
   */
  const getDepartmentEmployeesData = async () => {
    try {
      if (!employeeData?.department) {
        throw new Error("Employee department is not available");
      }

      setIsLoading(true);
      const data = await getDepartmentEmployeesService(employeeData?.department);
      setDepartmentEmployeesData(data);
    } catch (error) {
      toastError("Error fetching department employees data:", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  /**
   * Automatically fetches today's attendance data when the authenticated user changes.
   * Ensures that the dashboard always reflects the current employee's attendance state.
   * @effect
   * @dependency [user?.uid] - Triggers re-fetch when the authenticated user's UID changes.
   */
  React.useEffect(() => {
    if (user?.uid) {
      getAttendanceData();
    }
  }, [user?.uid]);

  /**
   * Automatically fetches today's attendance data when the authenticated user changes.
   * Ensures that the dashboard always reflects the current employee's attendance state.
   * @effect
   * @dependency [user?.uid] - Triggers re-fetch when the authenticated user's UID changes.
   */
  React.useEffect(() => {
    getEmployeeData();
    getTasksData();
  }, []);
  React.useEffect(() => {
    if (employeeData?.department) {
      getDepartmentEmployeesData();
    }
  }, [employeeData]);
  return (
    <DashboardContext.Provider
      value={{
        clockIn,
        clockOut,
        startBreak,
        endBreak,
        getAttendanceData,
        getDepartmentEmployeesData,
        getEmployeeData,
        getTasksData,
        isLoading,
        attendanceData,
        user,
        employeeData,
        tasksData,
        departmentEmployeesData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
