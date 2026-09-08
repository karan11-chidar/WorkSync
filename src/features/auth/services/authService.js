import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";
/**
 * Authenticates a user with Firebase email and password credentials.
 *
 * @param {{email: string, password: string}} credentials - Login credentials.
 * @returns {Promise<import("firebase/auth").UserCredential>} Firebase sign-in result.
 * @throws {Error} When Firebase rejects the credentials or the request fails.
 */
export const login = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential;
  } catch (error) {
    throw error;
  }
};
/**
 * Signs out the currently authenticated Firebase user.
 *
 * @returns {Promise<void>} Resolves when sign-out completes.
 * @throws {Error} When Firebase cannot complete the sign-out request.
 */
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};
