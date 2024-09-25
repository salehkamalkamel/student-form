import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDeleteStudent } from "../services/apiDeleteStudent";

function useDeleteStudent() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteStudent,
    isPending: deletingStudent,
    error,
  } = useMutation({
    mutationFn: (studentId) => apiDeleteStudent(studentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
    },
  });

  return { deleteStudent, deletingStudent, error };
}

export { useDeleteStudent };
