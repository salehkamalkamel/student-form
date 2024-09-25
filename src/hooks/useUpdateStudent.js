import { useMutation } from "@tanstack/react-query";
import { apiUpdateStudent } from "../services/apiUpdateStudent";

function useUpdateStudent() {
  const {
    mutate: updateStudent,
    isPending: updatingStudent,
    error,
  } = useMutation({
    mutationFn: ({ id, data }) => apiUpdateStudent(id, data),
  });
  return { updateStudent, updatingStudent, error };
}

export { useUpdateStudent };
