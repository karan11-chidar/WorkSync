import { collection, addDoc, serverTimestamp, doc, getDoc, getDocs, deleteDoc, updateDoc } from "firebase/firestore"
import {  db } from "../../../../firebase/firebaseConfig"

export const createDepartmentService = async (departmentData, currentUser) => {
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
export const deleteDepartmentService = async (departmentId) => {
    try {
        const docRef = doc(db, 'departments', departmentId);
        await deleteDoc(docRef);
    } catch (error) {
        throw error
    }
}
export const updateDepartmentService = async (departmentId,updatedData) => {
    try {
        const docRef = doc(db, "departments", departmentId);
        const updatedFirebaseData = {
            ...updatedData,
            updatedAt: serverTimestamp(),
          };
        await updateDoc(docRef, updatedFirebaseData);
        return { updatedFirebaseData };
    } catch (error) {
        throw error
    }
}
export const getDepartmentsService = async () => {
    try{
    const departmentsRef = collection(db, "departments");
    const querySnapshot = await getDocs(departmentsRef);
     return querySnapshot.docs.map((doc) =>({id:doc.id,...doc.data()}))
    } catch (error) {
        throw error
    }
}