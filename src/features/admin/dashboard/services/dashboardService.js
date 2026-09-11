import { db } from "../../../../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

/**
 * Fetches all employees for calculating total count, department distribution, and recent hires.
 *
 * @returns {Promise<Array<Object>>} List of employees.
 */
export const fetchDashboardEmployeesService = async () => {
  try {
    const q = query(collection(db, "employeesList"));
    const snapshot = await getDocs(q);
    const employees = [];
    snapshot.forEach((doc) => {
      employees.push({ id: doc.id, ...doc.data() });
    });
    return employees;
  } catch (error) {
    console.error("Error fetching employees for dashboard:", error);
    throw error;
  }
};

/**
 * Fetches attendance records for a specific date (YYYY-MM-DD).
 *
 * @param {string} dateString - Target date in YYYY-MM-DD format.
 * @returns {Promise<Array<Object>>} Attendance records for the specified date.
 */
export const fetchDashboardAttendanceService = async (dateString) => {
  try {
    const q = query(
      collection(db, "attendance"),
      where("date", "==", dateString),
    );
    const snapshot = await getDocs(q);
    const records = [];
    snapshot.forEach((doc) => {
      records.push({ id: doc.id, ...doc.data() });
    });
    return records;
  } catch (error) {
    console.error("Error fetching dashboard attendance:", error);
    throw error;
  }
};

/**
 * Fetches pending leave requests for the approval queue.
 *
 * @returns {Promise<Array<Object>>} Pending leave requests.
 */
export const fetchDashboardPendingLeavesService = async () => {
  try {
    const q = query(collection(db, "leaves"), where("status", "==", "Pending"));
    const snapshot = await getDocs(q);
    const leaves = [];
    snapshot.forEach((doc) => {
      leaves.push({ id: doc.id, ...doc.data() });
    });
    return leaves;
  } catch (error) {
    console.error("Error fetching dashboard pending leaves:", error);
    throw error;
  }
};

/**
 * Fetches Dashboard Department Using a Budget .
 *
 * @returns {Promise<Array<Object>>} Departments Data.
 */
export const fetchDashboardDepartmentService = async () => {
  try {
      const q = query(collection(db, "departments"));
    const snapshot = await getDocs(q);
    const departments = [];
    snapshot.forEach((doc) => {
      departments.push({ id: doc.id, ...doc.data() });
    });
    return departments;
  } catch (error) {
    console.error("Error fetching dashboard Departments data:", error);
    throw error;
  }
};
