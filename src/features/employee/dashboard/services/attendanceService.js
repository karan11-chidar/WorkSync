/** Firestore helpers used to read and update daily attendance records. */
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

/** Configured Firestore database instance. */
import { db } from "../../../../firebase/firebaseConfig";

/**
 * Attendance service for the employee dashboard.
 *
 * Attendance records use the document ID `${uid}_${YYYY-MM-DD}` and support
 * clock-in, break tracking, clock-out, and retrieval of the current shift.
 */

/**
 * Retrieves the employee's attendance record for the current
 * India Standard Time (IST) date.
 *
 * @param {string} uid - Firebase Authentication UID of the employee.
 * @returns {Promise<Object|null>} The attendance record, or null if none exists.
 * @throws {Error} If the UID is missing or Firestore retrieval fails.
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

    return {
      id: attendanceSnapshot.id,
      ...attendanceSnapshot.data(),
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Creates today's attendance record and starts the employee's shift.
 *
 * @param {string} uid - Firebase Authentication UID of the employee.
 * @returns {Promise<Object>} The newly created attendance record.
 * @throws {Error} If the UID is missing, attendance already exists, or creation fails.
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

    return {
      id: attendanceRef.id,
      ...attendanceData,
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Marks the employee's active shift as being on break.
 *
 * @param {string} uid - Firebase Authentication UID of the employee.
 * @returns {Promise<Object>} The attendance record with status set to ON_BREAK.
 * @throws {Error} If the UID is missing, the record is absent, or the shift is not active.
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

 return {
   ...attendanceData,
   status: "ON_BREAK",
   breakStart: new Date(),
 };
  } catch (error) {
    throw error;
  }
};

/**
 * Ends the active break and adds its duration to the shift total.
 *
 * @param {string} uid - Firebase Authentication UID of the employee.
 * @returns {Promise<Object>} The attendance record with the completed break appended.
 * @throws {Error} If the UID is missing, the record is absent, or no active break exists.
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

    return {
      ...attendanceData,

      status: "WORKING",

      breaks: [...existingBreaks, completedBreak],

      totalBreakMinutes,

      breakStart: null,
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Completes the employee's active shift and records the clock-out timestamp.
 *
 * @param {string} uid - Firebase Authentication UID of the employee.
 * @returns {Promise<Object>} The attendance record with status set to COMPLETED.
 * @throws {Error} If the UID is missing, the record is absent, or the shift cannot end.
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
      throw new Error("Employee cannot clock out in the current state");
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

    return {
      ...attendanceData,

      status: "COMPLETED",

      checkOut: new Date(),
    };
  } catch (error) {
    throw error;
  }
};
export { getTodayAttendanceService, clockInService, startBreakService, endBreakService, clockOutService };
