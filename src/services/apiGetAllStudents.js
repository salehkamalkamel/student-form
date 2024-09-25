import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

async function apiGetAllStudents() {
  try {
    const studentsCollectionRef = collection(db, "students");
    const querySnapshot = await getDocs(studentsCollectionRef);
    const students = querySnapshot?.docs?.map((doc) => ({
      data: doc.data(),
      id: doc.id,
    }));
    return students;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export { apiGetAllStudents };
