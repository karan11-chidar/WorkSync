import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import {  db } from "../../../../firebase/firebaseConfig"

export const createDepartment = async (departmentData, currentUser) => {
    try {
        const departmentsRef = collection(db, "departments");
        const firebaseData = {
        ...departmentData,
        status: "active",
        managerId: null,
        createdBy: currentUser.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        };
        const docRef = await addDoc(departmentsRef, firebaseData);
        return {
            id: docRef.id,
            ...firebaseData,
        };
    } catch (error) {
        throw error;
    }
}
export const deleteDepartment = async (departmentId) => {
    
}
export const updateDepartment = async (departmentId) => {
    
}
export const getDepartments = async () => {
    
}