import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

async function apiUpdateStudent(id, updatedData) {
  try {
    // Create a reference to the specific student document by its ID
    const studentDocRef = doc(db, "students", id);

    // Update the document with the new data
    await updateDoc(studentDocRef, updatedData);

    console.log(`Student with ID ${id} updated successfully.`);
  } catch (err) {
    console.log("Error updating student:", err);
    throw err; // Optionally, re-throw the error
  }
}

export { apiUpdateStudent };
