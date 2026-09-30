import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { registerUser } from "../../firebase/auth";
import toast from "react-hot-toast";
import { getAuthErrorMessage } from "../../utils/getAuthErrorMessage";
import css from "./RegisterForm.module.css";
import { useState } from "react";

interface RegisterFormProps {
  onSuccess: () => void;
}

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

const registerSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(16, "Name must be no more than 16 characters"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(12, "Password must be no more than 12 characters")
    .required("Password is required"),
});

const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await registerUser(data.name, data.email, data.password);

      toast.success("Registration successful!");
      onSuccess();
    } catch (error) {
      const message = getAuthErrorMessage(error);
      toast.error(message);
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.textWrapper}>
        <h2 className={css.title}>Registration</h2>

        <p className={css.description}>
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information.
        </p>
      </div>

      <div className={css.inputsWrapper}>
        <div className={css.inputErrorWrapper}>
          <input
            className={css.input}
            type="text"
            placeholder="Name"
            maxLength={16}
            {...register("name")}
          />
          {errors.name && <p className={css.error}>{errors.name.message}</p>}
        </div>

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
              maxLength={12}
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

      <button className={css.registerBtn} type="submit">
        Sign Up
      </button>
    </form>
  );
};

export default RegisterForm;
