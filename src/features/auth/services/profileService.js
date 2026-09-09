import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
/**
 * Retrieves a user profile from the Firestore users collection.
 *
 * @param {string} uid - Firebase user identifier.
 * @returns {Promise<Object|null>} The profile data, or null when no profile exists.
 * @throws {Error} When the Firestore request fails.
 */
export default async function getUserProfile(uid) {
  try {
    const profileRef = doc(db, "users", uid);
    const profileSnapshot = await getDoc(profileRef);
    if (!profileSnapshot.exists()) {
      return null;
    }
    return profileSnapshot.data();
  } catch (error) {
    throw error;
  }
}
