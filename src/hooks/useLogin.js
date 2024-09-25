import { useMutation } from "@tanstack/react-query";
import { apiLogin } from "../services/apiLogin";

function useLogin() {
  const {
    mutate: login,
    isPending: isLoggingIn,
    error,
  } = useMutation({
    mutationFn: ({ email, password }) => apiLogin(email, password),
  });

  return { login, isLoggingIn, error }; // Return data so it can be used elsewhere
}

export { useLogin };
