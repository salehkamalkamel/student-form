import { useQuery } from "@tanstack/react-query";
import { apiGetAllStudents } from "../services/apiGetAllStudents";

function useGetStudents() {
  const {
    data: students,
    isLoading: gettingStudents,
    error,
  } = useQuery({
    queryKey: ["students"],
    queryFn: apiGetAllStudents,
  });

  return { students, gettingStudents, error };
}

export { useGetStudents };
