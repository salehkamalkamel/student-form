import { useQuery } from "@tanstack/react-query";
import { apiGetStudent } from "../services/apiGetStudent";

function useGetStudent(studentId) {
  const {
    data: student,
    isLoading: gettingStudent,
    error,
  } = useQuery({
    queryKey: ["student"],
    queryFn: () => apiGetStudent(studentId),
  });

  return { student, gettingStudent, error };
}

export { useGetStudent };
