import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { loginUser } from "../../firebase/auth";
import toast from "react-hot-toast";
import { getAuthErrorMessage } from "../../utils/getAuthErrorMessage";
import css from "./LoginForm.module.css";
import { useState } from "react";

interface LoginFormProps {
  onSuccess: () => void;
}

interface LoginFormValues {
  email: string;
  password: string;
}

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await loginUser(data.email, data.password);
      toast.success("You have successfully logged in!");
      onSuccess();
    } catch (error) {
      const message = getAuthErrorMessage(error);
      toast.error(message);
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.textWrapper}>
        <h2 className={css.title}>Log In</h2>

        <p className={css.description}>
          Welcome back! Please enter your credentials to access your account and
          continue your search for a psychologist.
        </p>
      </div>

      <div className={css.inputsWrapper}>
        <div className={css.inputErrorWrapper}>
          <input
            className={css.input}
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && <p className={css.error}>{errors.email.message}</p>}
        </div>

        <div className={css.inputErrorWrapper}>
          <div className={css.passwordWrapper}>
            <input
              className={`${css.input} ${css.passwordInput}`}
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
            />

            <button
              className={css.passwordToggle}
              type="button"
              onClick={() => setIsPasswordVisible((prev) => !prev)}
              aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            >
              <svg className={css.passwordIcon}>
                <use
                  href={
                    isPasswordVisible
                      ? "/icons/sprite.svg#icon-eye"
                      : "/icons/sprite.svg#icon-eye-off"
                  }
                />
              </svg>
            </button>
          </div>

          {errors.password && (
            <p className={css.error}>{errors.password.message}</p>
          )}
        </div>
      </div>

      <button className={css.loginBtn} type="submit">
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
