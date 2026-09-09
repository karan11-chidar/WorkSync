import { db } from "../../../../firebase/firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

/**
 * Logged-in employee ke saare assigned tasks Firestore se fetch karta hai.
 * Check karta hai: assignEmployee (Custom ID or UID), assignedTo, or createdBy.
 *
 * @param {string} employeeId - Logged-in employee ki Custom Employee ID (e.g., "EMP-002").
 * @param {string} [authUid=""] - Firebase Auth User UID (e.g., "745NTSX...").
 * @returns {Promise<Array<Object>>} Fetch kiye gaye tasks ki list.
 */
export const getEmployeeTasksService = async (employeeId, authUid = "") => {
  try {
    if (!employeeId && !authUid) {
      console.warn("No Employee ID or Auth UID provided for fetching tasks.");
      return [];
    }

    const tasksRef = collection(db, "tasks");
    const taskMap = new Map(); // Duplicate entries avoid karne ke liye Map

    // Search Identifiers Pool (Saare possible IDs ki array)
    const possibleIds = Array.from(
      new Set([employeeId, authUid].filter(Boolean)),
    );

    for (const idVal of possibleIds) {
      // 1. Check 'assignEmployee' field
      const q1 = query(tasksRef, where("assignEmployee", "==", idVal));
      const snap1 = await getDocs(q1);
      snap1.forEach((docSnap) => {
        taskMap.set(docSnap.id, { id: docSnap.id, ...docSnap.data() });
      });

      // 2. Check 'assignedTo' field
      const q2 = query(tasksRef, where("assignedTo", "==", idVal));
      const snap2 = await getDocs(q2);
      snap2.forEach((docSnap) => {
        taskMap.set(docSnap.id, { id: docSnap.id, ...docSnap.data() });
      });
    }

    return Array.from(taskMap.values());
  } catch (error) {
    console.error("Error fetching employee tasks from Firestore:", error);
    throw error;
  }
};

/**
 * Task Status aur optional Rejection Reason update karta hai.
 *
 * @param {string} taskId - Firestore document ID.
 * @param {string} newStatus - Naya status ("pending", "progress", "completed", "rejected").
 * @param {string|null} [rejectReason=null] - Rejection reason.
 * @returns {Promise<boolean>}
 */
export const updateTaskStatusService = async (
  taskId,
  newStatus,
  rejectReason = null,
) => {
  try {
    if (!taskId) {
      throw new Error("Task ID is required for status update.");
    }

    const taskDocRef = doc(db, "tasks", taskId);

    const updateData = {
      status: newStatus,
      updatedAt: serverTimestamp(),
    };

    if (String(newStatus).toLowerCase() === "rejected") {
      updateData.rejectReason = rejectReason || "No justification provided.";
    } else {
      updateData.rejectReason = null;
    }

    await updateDoc(taskDocRef, updateData);
    return true;
  } catch (error) {
    console.error(`Error updating task [${taskId}] status:`, error);
    throw error;
  }
};
