import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiSignout } from "../services/apiSignout";

function useSignout() {
  const queryClient = useQueryClient();
  const {
    mutate: signOut,
    isPending: isSigningOut,
    error,
  } = useMutation({
    mutationFn: (id) => apiSignout(id),
    onSuccess: () => queryClient.invalidateQueries(["students"]),
  });

  return { signOut, isSigningOut, error };
}

export { useSignout };
