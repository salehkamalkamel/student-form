import { useMutation } from "@tanstack/react-query";
import { apiSignUp } from "../services/apiSignUp";

function useSignUp() {
  const {
    mutate: signup,
    isPending: isSigningUp,
    error,
    data,
  } = useMutation({
    mutationFn: ({ email, password }) => apiSignUp(email, password),
    onError: (error) => error.message,
  });
  return { signup, isSigningUp, error, data };
}

export { useSignUp };
