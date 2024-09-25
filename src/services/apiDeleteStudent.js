import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

async function apiDeleteStudent(studentId) {
  try {
    const studentDocRef = doc(db, "students", studentId);

    await deleteDoc(studentDocRef);
  } catch (err) {
    console.log(err);
  }
}

export { apiDeleteStudent };
