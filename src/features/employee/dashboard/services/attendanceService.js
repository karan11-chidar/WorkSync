/**
 * ============================================================================
 * attendanceService.js
 * ============================================================================
 *
 * Service Layer Module for Employee Attendance Management
 *
 * Responsibility:
 * ----------------------------------------------------------------------------
 * Encapsulates all Firebase Firestore operations for the attendance collection.
 * Provides a clean abstraction layer between employee attendance UI components
 * and the Firestore database, handling shift tracking operations including
 * clock-in, break management, and clock-out events.
 *
 * Features:
 * ----------------------------------------------------------------------------
 * - Retrieve daily attendance records for employees using IST timezone
 * - Clock-in functionality to start an employee's shift with server timestamp
 * - Break tracking with start/end times and duration calculations
 * - Accumulate total break minutes across multiple breaks within a shift
 * - Clock-out functionality to end shifts and record completion status
 * - Automatic server-side timestamp management for audit trails
 * - Status tracking: WORKING, ON_BREAK, COMPLETED
 * - UI-friendly timestamp formatting for all date/time fields
 *
 * Firestore Collection Structure:
 * ----------------------------------------------------------------------------
 * Collection: "attendance"
 * Document ID Format: "${uid}_${YYYY-MM-DD}" (e.g., "user123_2026-09-05")
 * Document Fields:
 *   - uid: Firebase Authentication UID of employee (required)
 *   - date: Attendance date in YYYY-MM-DD format (required)
 *   - status: Current shift status - "WORKING", "ON_BREAK", or "COMPLETED"
 *   - checkIn: Server timestamp when employee clocked in
 *   - checkOut: Server timestamp when employee clocked out (null until clock-out)
 *   - breakStart: Server timestamp when current break started (null when not on break)
 *   - breaks: Array of completed break objects {start, end, durationMinutes}
 *   - totalBreakMinutes: Accumulated break duration for the day
 *   - createdAt: Server timestamp of record creation (auto-generated)
 *   - updatedAt: Server timestamp of last update (auto-updated)
 *
 * Timezone Handling:
 * All dates are calculated in India Standard Time (IST/Asia/Kolkata) timezone
 * to ensure consistency across employee locations and server geography.
 *
 * Error Handling Strategy:
 * ----------------------------------------------------------------------------
 * - All functions throw errors for caller to handle and display
 * - Firebase errors are propagated up the call stack with full context
 * - Validation errors include descriptive messages for user feedback
 * - Calling components are responsible for error display and retry logic
 *
 * Dependencies:
 * ----------------------------------------------------------------------------
 * - Firebase Firestore: document manipulation and timestamp operations
 * - Firebase database configuration (firebaseConfig.js)
 * - Timestamp utility (formatTimeStamp.js) for UI formatting
 * ============================================================================
 */

// Firestore functions for attendance document operations
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
  getDocs,
  collection
} from "firebase/firestore";

// Firebase Firestore database instance
import { db } from "../../../../firebase/firebaseConfig";

// Utility function to format Firestore timestamps into UI-friendly strings
import formatAttendanceTime from "../../../../shared/utils/formatTimeStamp";

/**
 * normalizeAttendanceData
 *
 * Transforms a raw Firestore attendance document into a normalized object
 * with all timestamps formatted into UI-friendly strings. This ensures
 * consistent timestamp formatting across the application and provides
 * a clean data contract for UI components.
 *
 * Workflow:
 * 1. Validates that attendance data exists and is not null
 * 2. Formats all timestamp fields (checkIn, checkOut, createdAt, updatedAt)
 * 3. Processes breaks array and formats each break's timestamps
 * 4. Returns complete normalized attendance object with all formatted times
 *
 * @param {Object} data - Raw attendance data from Firestore document snapshot
 * @param {string} data.uid - Firebase Authentication UID of the employee
 * @param {string} data.date - Attendance date in YYYY-MM-DD format
 * @param {string} data.status - Current shift status (WORKING, ON_BREAK, COMPLETED)
 * @param {Object} data.checkIn - Firestore timestamp when employee clocked in
 * @param {Object} data.checkOut - Firestore timestamp when employee clocked out
 * @param {Object} data.breakStart - Firestore timestamp of current break start
 * @param {Array<Object>} [data.breaks] - Array of completed break objects
 * @param {number} [data.totalBreakMinutes] - Total break duration accumulated
 * @param {Object} data.createdAt - Firestore server timestamp of record creation
 * @param {Object} data.updatedAt - Firestore server timestamp of last update
 * @param {string} id - Firestore document ID of the attendance record
 *
 * @returns {Object|null} Normalized attendance object with formatted timestamps,
 *   or null if data is empty or invalid
 * @returns {string} Returns.id - Document ID
 * @returns {string} Returns.uid - Employee Firebase UID
 * @returns {string} Returns.date - Attendance date (YYYY-MM-DD)
 * @returns {string} Returns.status - Shift status
 * @returns {string} Returns.checkIn - Formatted check-in timestamp
 * @returns {string} Returns.checkOut - Formatted check-out timestamp
 * @returns {string} Returns.breakStart - Formatted break start timestamp
 * @returns {Array<Object>} Returns.breaks - Array of breaks with formatted times
 * @returns {number} Returns.totalBreakMinutes - Total break duration
 * @returns {string} Returns.createdAt - Formatted creation timestamp
 * @returns {string} Returns.updatedAt - Formatted update timestamp
 */
const normalizeAttendanceData = (data, id) => {
  if (!data) {
    return null;
  }

  return {
    id,

    uid: data.uid,
    date: data.date,

    status: data.status,

    checkIn: formatAttendanceTime(data.checkIn),
    checkOut: formatAttendanceTime(data.checkOut),

    breakStart: formatAttendanceTime(data.breakStart),

    breaks: (data.breaks || []).map((breakItem) => ({
      start: formatAttendanceTime(breakItem.start),
      end: formatAttendanceTime(breakItem.end),
      durationMinutes: breakItem.durationMinutes || 0,
    })),

    totalBreakMinutes: data.totalBreakMinutes || 0,

    createdAt: formatAttendanceTime(data.createdAt),
    updatedAt: formatAttendanceTime(data.updatedAt),
  };
};

/**
 * Attendance service for the employee dashboard.
 *
 * Attendance records use the document ID `${uid}_${YYYY-MM-DD}` and support
 * clock-in, break tracking, clock-out, and retrieval of the current shift.
 */

/**
 * getTodayAttendanceService
 *
 * Retrieves the employee's attendance record for the current day in
 * India Standard Time (IST) timezone. Normalizes the Firestore document
 * with formatted timestamps for UI display. Returns null if no record exists
 * for today, indicating the employee has not yet clocked in.
 *
 * Workflow:
 * 1. Validates that employee UID is provided and non-empty
 * 2. Calculates today's date in IST timezone (YYYY-MM-DD format)
 * 3. Creates Firestore document reference using UID and date
 * 4. Fetches the attendance document from database
 * 5. Returns null if record does not exist (no clock-in yet)
 * 6. Normalizes and returns the attendance record with formatted timestamps
 *
 * @async
 * @param {string} uid - Firebase Authentication UID of the employee (required)
 *
 * @returns {Promise<Object|null>} Promise resolving to:
 * @returns {Object} Returns - Normalized attendance record with formatted timestamps
 * @returns {null} Returns - null if no attendance record exists for today
 *
 * @throws {Error} If UID is missing or empty
 * @throws {Error} If Firestore retrieval operation fails
 */
const getTodayAttendanceService = async (uid) => {
  try {
    // --------------------------------------------------
    // 1. Validate UID
    // --------------------------------------------------

    if (!uid) {
      throw new Error("Employee UID is required");
    }
    // --------------------------------------------------
    // 2. Get today's date
    // --------------------------------------------------

    const today = new Date()
      .toLocaleDateString("en-CA", {
        timeZone: "Asia/Kolkata",
      })
      .split("T")[0];

    // Example:
    // 2026-09-05

    // --------------------------------------------------
    // 3. Create today's attendance document reference
    // --------------------------------------------------

    const attendanceRef = doc(db, "attendance", `${uid}_${today}`);

    // --------------------------------------------------
    // 4. Fetch attendance document
    // --------------------------------------------------

    const attendanceSnapshot = await getDoc(attendanceRef);

    // --------------------------------------------------
    // 5. If attendance does not exist
    // --------------------------------------------------

    if (!attendanceSnapshot.exists()) {
      return null;
    }

    // --------------------------------------------------
    // 6. Return attendance data
    // --------------------------------------------------

    return normalizeAttendanceData(
      attendanceSnapshot.data(),
      attendanceSnapshot.id,
    );
  } catch (error) {
    throw error;
  }
};

/**
 * clockInService
 *
 * Creates today's attendance record and starts the employee's shift.
 * Sets the initial status to WORKING and records the clock-in server timestamp.
 * Prevents duplicate clock-ins by checking if an attendance record already
 * exists for the current day.
 *
 * Workflow:
 * 1. Validates that employee UID is provided and non-empty
 * 2. Calculates today's date in IST timezone (YYYY-MM-DD format)
 * 3. Creates Firestore document reference using UID and date
 * 4. Checks if an attendance record already exists for today
 * 5. Throws error if record exists (prevents duplicate clock-in)
 * 6. Creates new attendance document with initial WORKING status
 * 7. Fetches and normalizes the newly created record
 * 8. Returns normalized attendance object with formatted timestamps
 *
 * Initial Record State:
 * - status: "WORKING"
 * - checkIn: Server timestamp of clock-in time
 * - checkOut: null (until clock-out)
 * - breaks: [] (empty array)
 * - totalBreakMinutes: 0
 *
 * @async
 * @param {string} uid - Firebase Authentication UID of the employee (required)
 *
 * @returns {Promise<Object>} Promise resolving to newly created normalized
 *   attendance record with all fields populated and timestamps formatted
 *
 * @throws {Error} If UID is missing or empty
 * @throws {Error} If attendance record already exists for today
 * @throws {Error} If Firestore document creation fails
 */
const clockInService = async (uid) => {
  try {
    // --------------------------------------------------
    // 1. Validate UID
    // --------------------------------------------------

    if (!uid) {
      throw new Error("Employee UID is required");
    }

    // --------------------------------------------------
    // 2. Get today's date
    // --------------------------------------------------

    const today = new Date()
      .toLocaleDateString("en-CA", {
        timeZone: "Asia/Kolkata",
      })
      .split("T")[0];

    // --------------------------------------------------
    // 3. Create today's attendance reference
    // --------------------------------------------------

    const attendanceRef = doc(db, "attendance", `${uid}_${today}`);

    // --------------------------------------------------
    // 4. Check whether today's attendance already exists
    // --------------------------------------------------

    const attendanceSnapshot = await getDoc(attendanceRef);

    if (attendanceSnapshot.exists()) {
      throw new Error("Today's attendance has already been started");
    }

    // --------------------------------------------------
    // 5. Create attendance record
    // --------------------------------------------------

    const attendanceData = {
      uid,

      date: today,

      checkIn: serverTimestamp(),

      checkOut: null,

      status: "WORKING",

      breaks: [],

      totalBreakMinutes: 0,

      createdAt: serverTimestamp(),

      updatedAt: serverTimestamp(),
    };

    await setDoc(attendanceRef, attendanceData);

    // --------------------------------------------------
    // 6. Return created attendance
    // --------------------------------------------------

    const updatedSnapshot = await getDoc(attendanceRef);

    return normalizeAttendanceData(updatedSnapshot.data(), updatedSnapshot.id);
  } catch (error) {
    throw error;
  }
};

/**
 * startBreakService
 *
 * Marks the employee's active shift as being on break. Updates the attendance
 * status to ON_BREAK and records the break start timestamp. Can only be called
 * when the employee is currently in WORKING status.
 *
 * Workflow:
 * 1. Validates that employee UID is provided and non-empty
 * 2. Calculates today's date in IST timezone (YYYY-MM-DD format)
 * 3. Fetches today's attendance record from Firestore
 * 4. Validates attendance record exists
 * 5. Validates current status is WORKING (prevents break during break)
 * 6. Updates status to ON_BREAK and records break start timestamp
 * 7. Fetches and normalizes the updated record
 * 8. Returns normalized attendance object with new status
 *
 * @async
 * @param {string} uid - Firebase Authentication UID of the employee (required)
 *
 * @returns {Promise<Object>} Promise resolving to updated normalized attendance
 *   record with status set to ON_BREAK and breakStart timestamp recorded
 *
 * @throws {Error} If UID is missing or empty
 * @throws {Error} If today's attendance record does not exist
 * @throws {Error} If employee is not currently in WORKING status
 * @throws {Error} If Firestore update fails
 */
const startBreakService = async (uid) => {
  try {
    // --------------------------------------------------
    // 1. Validate UID
    // --------------------------------------------------

    if (!uid) {
      throw new Error("Employee UID is required");
    }

    // --------------------------------------------------
    // 2. Get today's date
    // --------------------------------------------------

    const today = new Date()
      .toLocaleDateString("en-CA", {
        timeZone: "Asia/Kolkata",
      })
      .split("T")[0];

    // --------------------------------------------------
    // 3. Get today's attendance document
    // --------------------------------------------------

    const attendanceRef = doc(db, "attendance", `${uid}_${today}`);

    const attendanceSnapshot = await getDoc(attendanceRef);

    // --------------------------------------------------
    // 4. Attendance must exist
    // --------------------------------------------------

    if (!attendanceSnapshot.exists()) {
      throw new Error("Today's attendance record was not found");
    }

    const attendanceData = attendanceSnapshot.data();

    // --------------------------------------------------
    // 5. Employee must currently be working
    // --------------------------------------------------

    if (attendanceData.status !== "WORKING") {
      throw new Error("Employee is not currently working");
    }

    // --------------------------------------------------
    // 6. Update attendance status
    // --------------------------------------------------

    await updateDoc(attendanceRef, {
      status: "ON_BREAK",

      breakStart: serverTimestamp(),

      updatedAt: serverTimestamp(),
    });

    // --------------------------------------------------
    // 7. Return updated information
    // --------------------------------------------------

    const updatedSnapshot = await getDoc(attendanceRef);

    return normalizeAttendanceData(updatedSnapshot.data(), updatedSnapshot.id);
  } catch (error) {
    throw error;
  }
};

/**
 * endBreakService
 *
 * Ends the active break and adds its duration to the shift total. Calculates
 * break duration in minutes and appends the completed break object to the
 * breaks array. Returns employee to WORKING status.
 *
 * Workflow:
 * 1. Validates that employee UID is provided and non-empty
 * 2. Calculates today's date in IST timezone (YYYY-MM-DD format)
 * 3. Fetches today's attendance record from Firestore
 * 4. Validates attendance record exists
 * 5. Validates current status is ON_BREAK (only end existing breaks)
 * 6. Validates breakStart timestamp exists
 * 7. Calculates break duration in minutes from breakStart to current time
 * 8. Creates completed break object with start, end, and duration
 * 9. Appends break to breaks array and updates totalBreakMinutes
 * 10. Returns status to WORKING and updates updatedAt timestamp
 * 11. Fetches and normalizes the updated record
 * 12. Returns normalized attendance object with completed break
 *
 * Duration Calculation:
 * - Compares breakStart timestamp with current time
 * - Converts milliseconds to minutes (rounded)
 * - Handles edge cases with Math.max to prevent negative durations
 *
 * @async
 * @param {string} uid - Firebase Authentication UID of the employee (required)
 *
 * @returns {Promise<Object>} Promise resolving to updated normalized attendance
 *   record with completed break appended to breaks array and status set to WORKING
 *
 * @throws {Error} If UID is missing or empty
 * @throws {Error} If today's attendance record does not exist
 * @throws {Error} If employee is not currently in ON_BREAK status
 * @throws {Error} If breakStart timestamp is missing or invalid
 * @throws {Error} If Firestore update fails
 */
const endBreakService = async (uid) => {
  try {
    // --------------------------------------------------
    // 1. Validate UID
    // --------------------------------------------------

    if (!uid) {
      throw new Error("Employee UID is required");
    }

    // --------------------------------------------------
    // 2. Get today's date
    // --------------------------------------------------

    const today = new Date()
      .toLocaleDateString("en-CA", {
        timeZone: "Asia/Kolkata",
      })
      .split("T")[0];

    // --------------------------------------------------
    // 3. Get today's attendance
    // --------------------------------------------------

    const attendanceRef = doc(db, "attendance", `${uid}_${today}`);

    const attendanceSnapshot = await getDoc(attendanceRef);

    // --------------------------------------------------
    // 4. Attendance must exist
    // --------------------------------------------------

    if (!attendanceSnapshot.exists()) {
      throw new Error("Today's attendance record was not found");
    }

    const attendanceData = attendanceSnapshot.data();

    // --------------------------------------------------
    // 5. Employee must currently be on break
    // --------------------------------------------------

    if (attendanceData.status !== "ON_BREAK") {
      throw new Error("Employee is not currently on break");
    }

    // --------------------------------------------------
    // 6. Break start time must exist
    // --------------------------------------------------

    if (!attendanceData.breakStart) {
      throw new Error("Break start time was not found");
    }

    // --------------------------------------------------
    // 7. Calculate break duration
    // --------------------------------------------------

    const breakStart = attendanceData.breakStart.toDate();

    const breakEnd = new Date();

    const breakDurationMilliseconds = breakEnd.getTime() - breakStart.getTime();

    const breakDurationMinutes = Math.max(
      0,
      Math.round(breakDurationMilliseconds / (1000 * 60)),
    );

    // --------------------------------------------------
    // 8. Get existing breaks
    // --------------------------------------------------

    const existingBreaks = attendanceData.breaks || [];

    // --------------------------------------------------
    // 9. Create completed break object
    // --------------------------------------------------

    const completedBreak = {
      start: attendanceData.breakStart,
      end: breakEnd,
      durationMinutes: breakDurationMinutes,
    };

    // --------------------------------------------------
    // 10. Calculate total break minutes
    // --------------------------------------------------

    const totalBreakMinutes =
      (attendanceData.totalBreakMinutes || 0) + breakDurationMinutes;

    // --------------------------------------------------
    // 11. Update attendance
    // --------------------------------------------------

    await updateDoc(attendanceRef, {
      status: "WORKING",

      breaks: [...existingBreaks, completedBreak],

      totalBreakMinutes,

      breakStart: null,

      updatedAt: serverTimestamp(),
    });

    // --------------------------------------------------
    // 12. Return updated attendance information
    // --------------------------------------------------

    const updatedSnapshot = await getDoc(attendanceRef);

    return normalizeAttendanceData(updatedSnapshot.data(), updatedSnapshot.id);
  } catch (error) {
    throw error;
  }
};

/**
 * clockOutService
 *
 * Completes the employee's active shift and records the clock-out timestamp.
 * Updates the attendance status to COMPLETED. Can only be called when the
 * employee is currently in WORKING status (not on break or already completed).
 *
 * Workflow:
 * 1. Validates that employee UID is provided and non-empty
 * 2. Calculates today's date in IST timezone (YYYY-MM-DD format)
 * 3. Fetches today's attendance record from Firestore
 * 4. Validates attendance record exists
 * 5. Validates current status is WORKING (prevents clock-out during break)
 * 6. Records clock-out server timestamp
 * 7. Updates status to COMPLETED
 * 8. Updates updatedAt timestamp
 * 9. Fetches and normalizes the updated record
 * 10. Returns normalized attendance object with completion status
 *
 * @async
 * @param {string} uid - Firebase Authentication UID of the employee (required)
 *
 * @returns {Promise<Object>} Promise resolving to updated normalized attendance
 *   record with status set to COMPLETED and checkOut timestamp recorded
 *
 * @throws {Error} If UID is missing or empty
 * @throws {Error} If today's attendance record does not exist
 * @throws {Error} If employee is not in WORKING status (on break or already completed)
 * @throws {Error} If Firestore update fails
 */
const clockOutService = async (uid) => {
  try {
    // --------------------------------------------------
    // 1. Validate UID
    // --------------------------------------------------

    if (!uid) {
      throw new Error("Employee UID is required");
    }

    // --------------------------------------------------
    // 2. Get today's date
    // --------------------------------------------------

    const today = new Date()
      .toLocaleDateString("en-CA", {
        timeZone: "Asia/Kolkata",
      })
      .split("T")[0];

    // --------------------------------------------------
    // 3. Get today's attendance document
    // --------------------------------------------------

    const attendanceRef = doc(db, "attendance", `${uid}_${today}`);

    const attendanceSnapshot = await getDoc(attendanceRef);

    // --------------------------------------------------
    // 4. Attendance must exist
    // --------------------------------------------------

    if (!attendanceSnapshot.exists()) {
      throw new Error("Today's attendance record was not found");
    }

    const attendanceData = attendanceSnapshot.data();

    // --------------------------------------------------
    // 5. Employee must be currently working
    // --------------------------------------------------

    if (attendanceData.status !== "WORKING") {
      throw new Error(
        "Employee cannot clock out in the current working status",
      );
    }

    // --------------------------------------------------
    // 6. Save clock-out
    // --------------------------------------------------

    await updateDoc(attendanceRef, {
      checkOut: serverTimestamp(),

      status: "COMPLETED",

      updatedAt: serverTimestamp(),
    });

    // --------------------------------------------------
    // 7. Return updated attendance
    // --------------------------------------------------

    const updatedSnapshot = await getDoc(attendanceRef);

    return normalizeAttendanceData(updatedSnapshot.data(), updatedSnapshot.id);
  } catch (error) {
    throw error;
  }
};

/**
 * getEmployeeDataService
 * Retrieves the data for a specific employee from the
 * employeesList collection in Firestore. Filters the employee document
 * based on the provided UID and returns the matching employee object.
 * Throws an error if the employeesList collection is
 * not found or if the retrieval operation fails.
 * @async
 * @param {string} uid - UID of the employee to retrieve data for
 * @returns {Promise<Object>} Promise resolving to the employee object
 * @throws {Error} If the employeesList collection does not exist or retrieval fails
 */
const getEmployeeDataService = async (uid) => {
  try {
    if (!uid) {
      throw new Error("Employee UID is required");
    }

    const employeesCollectionRef = collection(db, "employeesList");

    const employeeSnap = await getDocs(employeesCollectionRef);

    const employee = employeeSnap.docs
      .map((employeeDoc) => ({
        id: employeeDoc.id,
        ...employeeDoc.data(),
      }))
      .find((employee) => employee.uid === uid);

    if (!employee) {
      throw new Error("Employee data not found");
    }

    return employee;
  } catch (error) {
    throw error;
  }
};
/**
 * getTasksDataService
 * Retrieves all tasks assigned to a specific employee from the
 * tasksList collection in Firestore. Filters the task documents
 * based on the provided employee UID and returns an array of matching
 * task objects. Throws an error if the tasksList collection is
 * not found or if the retrieval operation fails.
 * @async
 * @param {string} uid - UID of the employee to filter tasks by
 * @returns {Promise<Array<Object>>} Promise resolving to an array of task objects
 * @throws {Error} If the tasksList collection does not exist or retrieval fails
 */
const getTasksDataService = async (uid) => {
  try {
    if (!uid) {
      throw new Error("Employee UID is required");
    }

    const tasksCollectionRef = collection(db, "tasks");

    const tasksSnap = await getDocs(tasksCollectionRef);

    const tasks = tasksSnap.docs
      .map((taskDoc) => ({
        id: taskDoc.id,
        ...taskDoc.data(),
      }))
      .filter((task) => task.assignedTo === uid);

    return tasks;
  } catch (error) {
    throw error;
  }
};
/**
 * getDepartmentEmployeesService
 * Retrieves all employees belonging to a specific department from the
 * employeesList collection in Firestore. Filters the employee documents
 * based on the provided department name and returns an array of matching
 * employee objects. Throws an error if the employeesList collection is
 * not found or if the retrieval operation fails.
 * @async
 * @param {string} department - Name of the department to filter employees by
 * @returns {Promise<Array<Object>>} Promise resolving to an array of employee objects
 * @throws {Error} If the employeesList collection does not exist or retrieval fails
 */
const getDepartmentEmployeesService = async (department) => {
  try {
    if (!department) {
      throw new Error("Department is required");
    }

    const employeesCollectionRef = collection(db, "employeesList");

    const employeesSnap = await getDocs(employeesCollectionRef);

    const employees = employeesSnap.docs
      .map((employeeDoc) => ({
        id: employeeDoc.id,
        ...employeeDoc.data(),
      }))
      .filter((employee) => employee.department === department);

    return employees;
  } catch (error) {
    throw error;
  }
};
export {
  getTodayAttendanceService,
  clockInService,
  startBreakService,
  endBreakService,
  clockOutService,
  getEmployeeDataService,
  getTasksDataService,
  getDepartmentEmployeesService
};
