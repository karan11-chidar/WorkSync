import { db } from "../../../../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

/**
 * Fetches all employee leave applications from Firestore.
 *
 * @returns {Promise<Array<Object>>} List of leave documents.
 */
export const getAllLeavesService = async () => {
  try {
    const leavesRef = collection(db, "leaves");
    const querySnapshot = await getDocs(leavesRef);

    const leaves = [];
    querySnapshot.forEach((docSnap) => {
      leaves.push({
        id: docSnap.id,
        ...docSnap.data(),
      });
    });

    // Recent applications top par sort hongi
    return leaves.sort((a, b) => {
      const timeA = a.appliedAt?.seconds || 0;
      const timeB = b.appliedAt?.seconds || 0;
      return timeB - timeA;
    });
  } catch (error) {
    console.error("Error fetching all leaves for admin:", error);
    throw error;
  }
};

/**
 * Updates status of a leave request ("Approved" or "Rejected") 
 * along with an optional rejection justification reason.
 *
 * @param {string} leaveId - Firestore document ID.
 * @param {string} newStatus - New status ("Approved" or "Rejected").
 * @param {string} [rejectReason=""] - Written justification if rejected.
 * @returns {Promise<boolean>} Success flag.
 */
export const updateLeaveStatusService = async (
  leaveId,
  newStatus,
  rejectReason = ""
) => {
  try {
    const leaveDocRef = doc(db, "leaves", leaveId);
    const updateData = {
      status: newStatus,
      updatedAt: serverTimestamp(),
    };

    if (String(newStatus).toLowerCase() === "rejected") {
      updateData.rejectReason = rejectReason || "No justification provided by HR.";
    } else {
      updateData.rejectReason = null; // Clear if approved
    }

    await updateDoc(leaveDocRef, updateData);
    return true;
  } catch (error) {
    console.error(`Error updating leave [${leaveId}] status:`, error);
    throw error;
  }
};

/**
 * Admin files leave on behalf of an employee.
 *
 * @param {Object} payload - Leave application data.
 * @returns {Promise<Object>} Created document with ID.
 */
export const adminCreateLeaveService = async (payload) => {
  try {
    const leavesRef = collection(db, "leaves");
    const newDoc = {
      ...payload,
      status: payload.status || "Pending",
      appliedAt: serverTimestamp(),
    };
    const docRef = await addDoc(leavesRef, newDoc);
    return { id: docRef.id, ...newDoc };
  } catch (error) {
    console.error("Error creating admin leave request:", error);
    throw error;
  }
};

/**
 * Fetches all registered employees for the dropdown.
 *
 * @returns {Promise<Array<Object>>} List of active employees.
 */
export const getEmployeesListService = async () => {
  try {
    const empRef = collection(db, "employeesList");
    const querySnapshot = await getDocs(empRef);

    const employees = [];
    querySnapshot.forEach((docSnap) => {
      employees.push({
        id: docSnap.id,
        ...docSnap.data(),
      });
    });
    return employees;
  } catch (error) {
    console.error("Error fetching employees list:", error);
    return [];
  }
};
