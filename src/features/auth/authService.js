import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import {auth} from "../../firebase/firebaseConfig"
export const login = async ({ email, password }) => {
  console.log("Login function called");
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      return true;
  } catch (err) {
    console.error(err);
  }
};
export const logout = async () => {
      console.log("Logout function called");
    try {
        const des = await signOut(auth);
        console.log(des);
    } catch (error) {
        console.log(err);
    }
}