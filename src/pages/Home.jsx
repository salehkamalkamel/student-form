import Container from "../ui/Container";
import Button from "../ui/Button";
import SupText from "../ui/SupText";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "../hooks/useSignUp";
import { useLogin } from "../hooks/useLogin";
import AuthForm from "../ui/AuthForm";

export default function Home() {
  const [mode, setMode] = useState("login"); // "login" or "signUp"
  const navigate = useNavigate();

  // Hooks for handling signup and login
  const { signup, isSigningUp, error: signUpError } = useSignUp();
  const { login, isLoggingIn, error: loginError } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const isLoading = isSigningUp || isLoggingIn;
  const error = signUpError?.message || loginError?.message;

  const handleAuth = (data) => {
    if (mode === "signUp") {
      signup(
        { email: data.email, password: data.password },
        {
          onSuccess: (userData) => {
            if (userData) {
              navigate(`/dataForm/${userData.uid}`);
            }
          },
        }
      );
    } else if (mode === "login") {
      login(
        { email: data.email, password: data.password },
        {
          onSuccess: (userData) => {
            if (userData) {
              navigate(`/dataForm/${userData.uid}`);
            }
          },
        }
      );
    }
  };

  const switchMode = () => {
    setMode((prevMode) => (prevMode === "login" ? "signUp" : "login"));
  };

  return (
    <Container className="flex flex-col justify-center items-center gap-4 mt-8">
      {/* Dynamic form for login/signup */}
      <AuthForm
        mode={mode}
        onSubmit={handleSubmit(handleAuth)}
        isLoading={isLoading}
        errors={errors}
        error={error}
        register={register}
      />
      {/* Additional options below the form */}
      {mode === "login" ? (
        <>
          <SupText>New User</SupText>
          <Button onClick={switchMode}>Sign Up</Button>
        </>
      ) : (
        <>
          <SupText>Have an account?</SupText>
          <Button onClick={switchMode}>Login</Button>
        </>
      )}
    </Container>
  );
}
