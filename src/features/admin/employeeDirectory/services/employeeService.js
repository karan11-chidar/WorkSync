/*
 * ============================================================================
 * EmployeeService.js
 * ============================================================================
 *
 * Responsibility:
 * ----------------------------------------------------------------------------
 * Implements employee CRUD operations for the admin employee directory.
 * This module centralizes calls to the persistence layer and provides
 * reusable service functions for employee creation, update, deletion,
 * and list retrieval.
 *
 * Workflow:
 * ----------------------------------------------------------------------------
 * - createEmployeeService: persist a new employee record.
 * - updateEmployeeService: modify an existing employee record.
 * - deleteEmployeeService: remove an employee record.
 * - getEmployeeListService: retrieve the current employee directory.
 *
 * Dependencies:
 * ----------------------------------------------------------------------------
 * - Firebase or other backend persistence layer (not directly imported here).
 *
 * ============================================================================
 */


// Generate random color function
import getRandomColor from "../constants/employeeColorTheme";


// Firebase Backend Api's

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  runTransaction,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../../firebase/firebaseConfig";

/**
 * createEmployeeService
 *
 * Creates a new employee record with a sequential employee ID.
 *
 * The employee ID counter and employee document are updated inside
 * the same Firestore transaction. This makes the employee creation
 * process atomic and prevents duplicate employee IDs when multiple
 * employees are created concurrently.
 *
 * Workflow:
 * 1. Creates a reference for the new employee document.
 * 2. Reads the global employee ID counter inside a transaction.
 * 3. Calculates the next sequential employee ID.
 * 4. Updates the counter with the new value.
 * 5. Creates the employee document with the generated employee ID.
 * 6. Commits both operations together.
 *
 * If any operation fails, Firestore rolls back the transaction so
 * the counter and employee document remain consistent.
 *
 * @param {Object} employeeData - Employee information provided by the admin.
 * @param {Object} currentUser - Currently authenticated admin user.
 *
 * @returns {Promise<Object>} The newly created employee object.
 *
 * @throws {Error} When employee creation or the transaction fails.
 */
const createEmployeeService = async (employeeData, currentUser) => {
  try {
    const avatarColor = getRandomColor();
    const employeeRef = doc(collection(db, "employeesList"));
    const counterRef = doc(db, "counters", "employeeIdCounter");

    const employeeId = await runTransaction(db, async (transaction) => {
      const counterSnapshot = await transaction.get(counterRef);

      let nextValue;

      if (!counterSnapshot.exists()) {
        nextValue = 1;

        transaction.set(counterRef, {
          currentValue: nextValue,
        });
      } else {
        const counterData = counterSnapshot.data();
        nextValue = counterData.currentValue + 1;

        transaction.update(counterRef, {
          currentValue: nextValue,
        });
      }
      transaction.set(employeeRef, {
        ...employeeData,
        employeeId: `EMP-${String(nextValue).padStart(3, "0")}`,
        createdBy: currentUser.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        avatarColor,
        joiningDate: serverTimestamp(),
      });

      return `EMP-${String(nextValue).padStart(3, "0")}`;
    });

    return {
      id: employeeRef.id,
      employeeId,
      avatarColor,
      ...employeeData,
      joiningDate: new Date(),
    };
  } catch (error) {
    throw error;
  }
};

/**
 * updateEmployeeService
 *
 * Updates an existing employee record by identifier.
 *
 * @param {string|number} employeeId - The unique employee identifier.
 * @param {Object} updateData - Partial employee fields to update.
 * @returns {Promise<void>} Resolves when the update is applied.
 * @throws {Error} When persistence fails.
 */
const updateEmployeeService = async (employeeId, updateData) => {
  try {
    const updateFirebaseData = {
      ...updateData,
      updatedAt: serverTimestamp(),
    };
    const collectionRef = collection(db, "employeesList");
    const docRef = doc(collectionRef, employeeId);
    await updateDoc(docRef, updateFirebaseData);
    return updateFirebaseData;
  } catch (error) {
    throw error;
  }
};

/**
 * deleteEmployeeService
 *
 * Removes an employee record from persistence by identifier.
 *
 * @param {string|number} employeeId - The unique employee identifier.
 * @returns {Promise<void>} Resolves when the record is deleted.
 * @throws {Error} When persistence fails.
 */
const deleteEmployeeService = async (employeeId) => {
  try {
    const docRef = doc(db, "employeesList", employeeId);
    await deleteDoc(docRef);
  } catch (error) {
    throw error;
  }
};

/**
 * getEmployeeListService
 *
 * Retrieves the current directory of employee records.
 *
 * @returns {Promise<Array<Object>>} Resolves with the list of employee objects.
 * @throws {Error} When retrieval fails.
 */
const getEmployeeListService = async () => {
  try {
    const collectionRef = collection(db, "employeesList");
    const employeesData = await getDocs(collectionRef);
    return employeesData.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
  } catch (error) {
    throw error;
  }
};

/**
 * getDepartmentsList
 *
 * Retrieves the current directory of Departments records.
 *
 * @returns {Promise<Array<Object>>} Resolves with the list of departments  objects.
 * @throws {Error} When retrieval fails.
 */
const getDepartmentsListService = async() => {
  try {
    const collectionRef = collection(db, 'departments');
    const departmentLists = await getDocs(collectionRef);
    return departmentLists.docs.map((dep) =>dep.data().departmentName);
  } catch (error) {
    throw error
  }
}
export {
  createEmployeeService,
  updateEmployeeService,
  deleteEmployeeService,
  getEmployeeListService,
  getDepartmentsListService
};
