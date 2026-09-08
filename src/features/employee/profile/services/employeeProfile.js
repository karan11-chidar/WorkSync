/**
 * Employee profile service for fetching and updating employee records.
 */
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebaseConfig";

/**
 * Retrieves an employee profile by UID from Firestore.
 *
 * @async
 * @param {string} uid - Unique identifier for the employee to fetch.
 * @returns {Promise<Object>} The matching employee document.
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
      .find(
        (emp) => emp.uid === uid || emp.employeeId === uid || emp.id === uid,
      );

    if (!employee) {
      throw new Error("Employee data not found");
    }

    return employee;
  } catch (error) {
    throw error;
  }
};

/**
 * Updates the employee's profile avatar URL in Firestore.
 *
 * @async
 * @param {string} docId - Firestore Document ID for the employee.
 * @param {string} avatarUrl - Image URL or Base64 string.
 * @returns {Promise<void>}
 */
export const updateEmployeeAvatarService = async (docId, avatarUrl) => {
  try {
    if (!docId) {
      throw new Error("Employee document ID is missing");
    }

    const employeeDocRef = doc(db, "employeesList", docId);
    await updateDoc(employeeDocRef, {
      avatarUrl,
      updatedAt: new Date(),
    });
  } catch (error) {
    throw error;
  }
};

export default getEmployeeDataService;
