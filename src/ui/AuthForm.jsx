import { validateEmail } from "../helpers/helpers";
import Button from "./Button";
import Input from "./Input";
import Spinner from "./Spinner";

const MIN_PASSWORD_LENGTH = 8;

export default function AuthForm({
  onSubmit,
  isLoading,
  errors,
  mode,
  register,
  error,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col justify-center items-center gap-2"
    >
      <Input
        holder="Enter Your Email"
        heading="Email"
        id="email"
        disabled={isLoading}
        error={errors?.email?.message}
        {...register("email", {
          required: "Email is required",
          validate: validateEmail,
        })}
      />
      <Input
        holder="Enter Your Password"
        heading="Password"
        id="password"
        disabled={isLoading}
        error={errors?.password?.message}
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: MIN_PASSWORD_LENGTH,
            message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
          },
        })}
      />
      {error && (
        <p className="text-sm font-medium text-red-400">{`${error}`}</p>
      )}

      {/* Button content changes based on loading state */}
      <Button type="submit">
        {isLoading ? <Spinner /> : mode === "signUp" ? "Sign Up" : "Login"}
      </Button>
    </form>
  );
}
