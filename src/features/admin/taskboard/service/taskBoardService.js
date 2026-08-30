import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../../firebase/firebaseConfig";

/**
 * getEmployeeService
 *
 * Retrieves employee records from the Firestore database. This function serves as the
 * primary accessor for fetching employee list data from the backend. Currently in
 * development stage with placeholder implementation.
 *
 * Purpose:
 * - Fetches all employee records from the "employeesList" collection
 * - Returns employee data for populating employee directories and listings
 * - Provides a centralized service layer for employee data retrieval
 *
 * Data Source:
 * - Collection: "employeesList" in Firestore database
 * - Returns: Array of employee objects with all employee fields
 *
 * TODO - Implementation Notes:
 * - Complete the getDocs() query to retrieve all employee documents
 * - Map results to include Firestore document ID in each employee object
 * - Consider adding filtering options for different employee statuses
 * - Implement pagination for large employee datasets
 * - Add error logging for debugging Firebase connection issues
 *
 * Expected Return Structure (when fully implemented):
 * - Array of employee objects with fields like:
 *   - id: Firestore document ID
 *   - firstName: Employee first name
 *   - lastName: Employee last name
 *   - email: Employee email address
 *   - department: Assigned department
 *   - employmentStatus: Current employment status
 *   - joiningDate: Date employee joined
 *   - salary: Employee salary information
 *
 * @async
 * @returns {Promise<Array<Object>>} Promise resolving to array of employee objects
 * @returns {string} [].id - Unique Firestore document identifier for each employee
 * @throws {Error} Firebase error if retrieval fails (connection error, permission denied, etc.)
 */
export const getEmployeeService = async () => {
  try {
    const employeeRef = collection(db, "employeesList");
    const employeeData = await getDocs(employeeRef);
    return employeeData.docs.map((emp) => emp.data());
  } catch (error) {
    throw error;
  }
};
/**
 * createTaskService
 *
 * Creates a new task record in the Firestore database with automatic timestamp.
 * This function serves as the primary interface for adding new tasks to the task board.
 *
 * Purpose:
 * - Creates a new task document in the "tasks" collection
 * - Automatically attaches server-side timestamp for audit trail
 * - Returns the created task with its Firestore document ID
 *
 * Behavior:
 * - Accepts task data object and spreads it into Firestore document
 * - Adds serverTimestamp() as "createdAt" field for creation tracking
 * - Returns task object including the generated document ID
 *
 * @async
 * @param {Object} user - The user object creating the task (currently unused, reserved for future auth)
 * @param {Object} taskData - Task data to be created
 * @param {string} taskData.taskTitle - Title of the task
 * @param {string} taskData.assignEmployee - Employee ID to assign task to
 * @param {string} taskData.priority - Priority level (high, medium, low)
 * @param {string} taskData.dueDate - Due date for the task
 * @param {string} taskData.status - Current status of the task
 * @param {string} taskData.description - Detailed description of the task
 * @param {string} taskData.estimateHour - Estimated hours to complete
 * @param {string} taskData.workingProject - Associated project name
 * @returns {Promise<Object>} Promise resolving to created task object with id
 * @returns {string} .id - Unique Firestore document ID for the created task
 * @throws {Error} Firebase error if creation fails
 */ export const createTaskService = async (userId, taskData) => {
  try {
    const firebaseData = {
      ...taskData,
      createdBy: userId,
      createdAt: serverTimestamp(),
      dateAssigned: serverTimestamp(),
    };
const collectionRef = collection(db, "tasks");
    const docRef = await addDoc(collectionRef, firebaseData);
    return {
      id: docRef.id,
      ...firebaseData,
    };
  } catch (error) {
    console.log('service file error', error.message);
    throw error;
  }
};
/**
 * updateTaskService
 *
 * Updates an existing task record in the Firestore database.
 * This function modifies specific fields of a task identified by its document ID.
 *
 * Purpose:
 * - Updates task data for existing task documents
 * - Allows partial updates of task fields
 * - Maintains Firestore document references and relationships
 *
 * Note: Implementation is currently incomplete - requires updateDoc() call
 *
 * @async
 * @param {string} id - Firestore document ID of the task to update
 * @param {Object} updatedData - Fields to update in the task
 * @param {string} [updatedData.taskTitle] - Updated task title
 * @param {string} [updatedData.assignEmployee] - Updated assigned employee
 * @param {string} [updatedData.priority] - Updated priority level
 * @param {string} [updatedData.dueDate] - Updated due date
 * @param {string} [updatedData.status] - Updated task status
 * @param {string} [updatedData.description] - Updated task description
 * @param {string} [updatedData.estimateHour] - Updated estimated hours
 * @param {string} [updatedData.workingProject] - Updated working project
 * @returns {Promise<void>} Promise resolving when update completes
 * @throws {Error} Firebase error if update fails
 * @todo Complete implementation with updateDoc() call to persist changes
 */
export const updateTaskService = async (taskId, updatedData) => {
  try {
    const docRef = doc(db, "tasks", taskId);
    const updatedFirebaseData = {
      ...updatedData,
      updatedAt:serverTimestamp(),
    }
    await updateDoc(docRef,updatedFirebaseData);
    return updatedFirebaseData;
  } catch (error) {
    throw error;
  }
};
/**
 * deleteTaskService
 *
 * Deletes a task record from the Firestore database.
 * This function removes a task document identified by its ID from the "tasks" collection.
 *
 * Purpose:
 * - Permanently removes a task from the database
 * - Cleans up task records when they are no longer needed
 * - Maintains database integrity by removing obsolete documents
 *
 * Note: Implementation is currently incomplete - requires task ID parameter and deleteDoc() call
 *
 * @async
 * @param {string} [id] - Firestore document ID of the task to delete (parameter needed)
 * @returns {Promise<void>} Promise resolving when deletion completes
 * @throws {Error} Firebase error if deletion fails
 * @todo Complete implementation with id parameter and deleteDoc() call
 */
export const deleteTaskService = async (taskId) => {
  try {
    const docRef = doc(db, 'tasks', taskId);
    await deleteDoc(docRef);
  } catch (error) {
    throw error;
  }
};
/**
 * getTaskListService
 *
 * Retrieves all task records from the Firestore database.
 * This function serves as the primary accessor for fetching the complete task list.
 *
 * Purpose:
 * - Fetches all task documents from the "tasks" collection
 * - Returns task data for populating task boards and task listings
 * - Provides a centralized service layer for task data retrieval
 *
 * Data Source:
 * - Collection: "tasks" in Firestore database
 * - Returns: Array of task objects with all task fields and metadata
 *
 * Note: Implementation is currently incomplete - requires getDocs() query
 *
 * Expected Return Structure (when fully implemented):
 * - Array of task objects with fields like:
 *   - id: Firestore document ID
 *   - taskTitle: Task title
 *   - assignEmployee: Assigned employee ID
 *   - priority: Priority level
 *   - dueDate: Task due date
 *   - status: Current task status
 *   - description: Task description
 *   - estimateHour: Estimated hours
 *   - workingProject: Associated project
 *   - createdAt: Server timestamp of creation
 *
 * @async
 * @returns {Promise<Array<Object>>} Promise resolving to array of task objects
 * @returns {string} [].id - Unique Firestore document identifier for each task
 * @throws {Error} Firebase error if retrieval fails
 * @todo Complete implementation with getDocs() query and result mapping
 */
export const getTaskListService = async () => {
  try {
const collectionRef = collection(db, "tasks");
    const tasksData = await getDocs(collectionRef);
    return tasksData.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
  } catch (error) {
    throw error;
  }
};
