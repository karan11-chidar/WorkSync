// src/features/attendance/service/attendanceCalender.js
import { db } from "../../../../firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

/**
 * Logged-in employee ki attendance history fetch karega.
 * Supports searching by both `employeeId` and `uid`.
 * 
 * @param {string} employeeId - Logged in user's ID/UID
 * @returns {Promise<Array>} List of attendance document objects
 */
export const getEmployeeAttendanceService = async (employeeId) => {
  try {
    if (!employeeId) {
      throw new Error("Employee Id/UID is required to fetch attendance records.");
    }

    const attendanceRef = collection(db, "attendance");

    // Pehle `employeeId` se query karenge
    let q = query(attendanceRef, where("employeeId", "==", employeeId));
    let querySnapshot = await getDocs(q);

    // Agar `employeeId` se records nahi mile, toh `uid` se retry karenge
    if (querySnapshot.empty) {
      q = query(attendanceRef, where("uid", "==", employeeId));
      querySnapshot = await getDocs(q);
    }

    if (querySnapshot.empty) {
      console.warn(`No attendance records found for ID: ${employeeId}`);
      return [];
    }

    const records = [];
    querySnapshot.forEach((doc) => {
      records.push({ id: doc.id, ...doc.data() });
    });

    return records;
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    throw error;
  }
};