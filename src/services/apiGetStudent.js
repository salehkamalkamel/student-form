import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

async function apiGetStudent(studentId) {
  try {
    const studentDocRef = doc(db, "students", studentId);
    const studentDoc = await getDoc(studentDocRef);

    if (studentDoc.exists()) {
      // Return the document data along with its ID
      return { id: studentDoc.id, data: studentDoc.data() };
    } else {
      console.log("No such document exists!");
      return null;
    }
  } catch (err) {
    console.log(err);
  }
}

export { apiGetStudent };
