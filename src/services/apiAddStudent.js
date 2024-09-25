import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

async function addNewUser(userData) {
  try {
    // Add a new document to the "users" collection with the provided data
    const docRef = await addDoc(collection(db, "students"), {
      name: userData.name,
      email: userData.email,
      age: userData.age,
      nationality: userData.nationality,
      nationalID: userData.nationalID,
      educationLevel: userData.educationLevel,
    });

    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
}

export { addNewUser };
