import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

async function apiLogin(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.log("Login failed:", error.message);
    throw error;
  }
}

export { apiLogin };
