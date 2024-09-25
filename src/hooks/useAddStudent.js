import { useMutation } from "@tanstack/react-query";
import { addNewUser } from "../services/apiAddStudent";
function useAddStudent() {
  const {
    mutate: addStudent,
    isPending: addingStudent,
    error,
  } = useMutation({
    mutationFn: (userData) => addNewUser(userData),
  });
  return { addStudent, addingStudent, error };
}

export { useAddStudent };
