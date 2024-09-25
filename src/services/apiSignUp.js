import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

async function apiSignUp(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Create a new document in the Firestore collection linked to the user's uid
    await setDoc(doc(db, "students", user.uid), {
      name: "",
      email: "",
      age: 0,
      educationLevel: "",
      nationality: "",
      nationalID: "",
    });

    return user;
  } catch (error) {
    console.log("Sign-up failed:", error.message);
    throw error;
  }
}

export { apiSignUp };
