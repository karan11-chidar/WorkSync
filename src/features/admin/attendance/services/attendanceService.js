import { db } from "../../../../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  query,
  where,
  Timestamp,
} from "firebase/firestore";

/**
 * Fetches all employees list from 'employeesList' collection.
 *
 * @returns {Promise<Array<Object>>} List of employees.
 */
export const getEmployeesForAttendanceService = async () => {
  try {
    const empRef = collection(db, "employeesList");
    const snapshot = await getDocs(empRef);
    const employees = [];
    snapshot.forEach((docSnap) => {
      employees.push({
        id: docSnap.id, // Firestore Document ID (UID)
        ...docSnap.data(),
      });
    });
    return employees;
  } catch (error) {
    console.error("Error fetching employees for attendance:", error);
    throw error;
  }
};

/**
 * Fetches attendance records strictly by date string (e.g., "2026-09-05").
 *
 * @param {string} dateString - Target date format YYYY-MM-DD.
 * @returns {Promise<Array<Object>>} Attendance records list.
 */
export const getAttendanceByDateService = async (dateString) => {
  try {
    const attendanceRef = collection(db, "attendance");
    // Strictly query by date field as seen in Firestore structure
    const q = query(attendanceRef, where("date", "==", dateString));
    const snapshot = await getDocs(q);

    const records = [];
    snapshot.forEach((docSnap) => {
      records.push({
        id: docSnap.id, // e.g., "l7kFQK16xcefZdwV3W2ulKbjED3_2026-09-05"
        ...docSnap.data(),
      });
    });
    return records;
  } catch (error) {
    console.error("Error fetching attendance records by date:", error);
    throw error;
  }
};

/**
 * Overrules or updates an employee's attendance record using UID and Date key format.
 *
 * @param {string} uid - Employee Firestore Document ID / UID.
 * @param {string} dateString - Target date YYYY-MM-DD.
 * @param {Object} payload - Attendance update payload.
 * @returns {Promise<boolean>} Success flag.
 */
export const updateAttendanceRecordService = async (
  uid,
  dateString,
  payload,
) => {
  try {
    // Document ID format: UID_YYYY-MM-DD
    const recordKey = `${uid}_${dateString}`;

    const docRef = doc(db, "attendance", recordKey);

    // Convert "12:00 AM" / "11:00 PM" into a JavaScript Date
    const createTimestamp = (timeString) => {
      if (!timeString) return null;

      const [time, modifier] = timeString.trim().split(" ");

      let [hours, minutes] = time.split(":").map(Number);

      if (modifier?.toUpperCase() === "PM" && hours !== 12) {
        hours += 12;
      }

      if (modifier?.toUpperCase() === "AM" && hours === 12) {
        hours = 0;
      }

      const date = new Date(`${dateString}T00:00:00`);

      date.setHours(hours, minutes, 0, 0);

      return Timestamp.fromDate(date);
    };

    const checkInTimestamp = createTimestamp(payload.checkIn);
    const checkOutTimestamp = createTimestamp(payload.checkOut);

    await setDoc(
      docRef,
      {
        ...payload,

        uid,
        date: dateString,

        // Save attendance times as Firestore Timestamps
        checkIn: checkInTimestamp,
        checkOut: checkOutTimestamp,

        updatedAt: Timestamp.now(),
      },
      {
        merge: true,
      },
    );

    return true;
  } catch (error) {
    console.error("Error updating attendance record:", error);
    throw error;
  }
};