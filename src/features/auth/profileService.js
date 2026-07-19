import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig";
export default async function getUserProfile(uid) {
    try {
         const profileRef = doc(db, "users", uid);
        const profileSnapshot = await getDoc(profileRef);
    if (!profileSnapshot.exists()) {
      return null;
    }
        return    profileSnapshot.data();
    } catch (error) {
        throw error;
    }
}
