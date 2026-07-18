import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import {auth} from "../../firebase/firebaseConfig"
export const login = async ({ email, password }) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
      return user ;
  } catch (error) {
    throw  error;
  }
};
export const logout = async () => {
    try {
         await signOut(auth);
    } catch (error) {
        throw error;
    }
}