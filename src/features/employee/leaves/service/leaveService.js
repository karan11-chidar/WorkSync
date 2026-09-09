import { db } from "../../../../firebase/firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

/**
 * Logged-in Auth User (UID ya Email) ke base par `employeesList` collection se
 * custom employeeId (e.g., "EMP-003") fetch karta hai.
 *
 * @param {string} authUid - Logged-in user ki Auth UID.
 * @param {string} userEmail - Logged-in user ka Email address.
 * @returns {Promise<string>} Custom Employee ID string ya fallback Auth UID.
 */
export const getCustomEmployeeIdService = async (authUid, userEmail = "") => {
  try {
    if (!authUid && !userEmail) return "";

    const empRef = collection(db, "employeesList");

    // 1. First attempt: Query by UID
    if (authUid) {
      const qUid = query(empRef, where("uid", "==", authUid));
      const snapUid = await getDocs(qUid);
      if (!snapUid.empty) {
        const docData = snapUid.docs[0].data();
        if (docData.employeeId) return docData.employeeId;
      }
    }

    // 2. Second attempt: Query by Email
    if (userEmail) {
      const qEmail = query(empRef, where("email", "==", userEmail));
      const snapEmail = await getDocs(qEmail);
      if (!snapEmail.empty) {
        const docData = snapEmail.docs[0].data();
        if (docData.employeeId) return docData.employeeId;
      }
    }

    return authUid || "";
  } catch (error) {
    console.error(
      "Error fetching custom employeeId from employeesList:",
      error,
    );
    return authUid || "";
  }
};

/**
 * Logged-in employee ke saare submitted leave requests Firestore se fetch karta hai.
 * Supports querying by custom employeeId, authUid, or email.
 *
 * @param {string} employeeId - Custom Employee ID (e.g., "EMP-003").
 * @param {string} authUid - Auth User UID.
 * @returns {Promise<Array<Object>>} List of leave documents.
 */
export const getEmployeeLeavesService = async (employeeId, authUid = "") => {
  try {
    if (!employeeId && !authUid) return [];

    const leavesRef = collection(db, "leaves");
    const leaveMap = new Map();

    const searchIds = Array.from(
      new Set([employeeId, authUid].filter(Boolean)),
    );

    for (const idVal of searchIds) {
      const q = query(leavesRef, where("employeeId", "==", idVal));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((docSnap) => {
        leaveMap.set(docSnap.id, { id: docSnap.id, ...docSnap.data() });
      });
    }

    const leaves = Array.from(leaveMap.values());

    // Recent requests top par sort hongi
    return leaves.sort((a, b) => {
      const timeA = a.appliedAt?.seconds || 0;
      const timeB = b.appliedAt?.seconds || 0;
      return timeB - timeA;
    });
  } catch (error) {
    console.error("Error fetching employee leaves:", error);
    throw error;
  }
};

/**
 * Creates a new leave request document in Firestore.
 */
export const applyLeaveService = async (leaveData) => {
  try {
    const leavesRef = collection(db, "leaves");

    const payload = {
      ...leaveData,
      status: "Pending",
      appliedAt: serverTimestamp(),
    };

    const docRef = await addDoc(leavesRef, payload);
    return { id: docRef.id, ...payload };
  } catch (error) {
    console.error("Error creating leave application:", error);
    throw error;
  }
};
