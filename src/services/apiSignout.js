import { getAuth, deleteUser, signOut } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase"; // import Firestore db

// Function to delete user and corresponding Firestore document
async function apiSignout(id) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.log("No user is currently authenticated.");
    return;
  }

  try {
    // Delete the corresponding document from the Firestore collection using the user's UID
    const userDocRef = doc(db, "students", id); // Assuming the collection is named 'users'
    await deleteDoc(userDocRef);
    console.log("User document deleted successfully from Firestore");

    // Sign out the user
    await signOut(auth);
    console.log("User signed out successfully");

    // Delete the user account from Firebase Authentication
    await deleteUser(user);
    console.log("User account deleted successfully");
  } catch (error) {
    console.error("Error during signout and deletion process:", error);
  }
}

export { apiSignout };
