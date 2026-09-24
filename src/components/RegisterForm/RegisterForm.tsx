import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { registerUser } from "../../firebase/auth";
import toast from "react-hot-toast";

import styles from "./RegisterForm.module.css";

interface RegisterFormProps {
  onSuccess: () => void;
}

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

const schema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(16, "Name must be no more than 16 characters"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(12, "Password must be no more than 12 characters")
    .required("Password is required"),
});

const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await registerUser(data.name, data.email, data.password);

      toast.success("Registration successful!");
      onSuccess();
    } catch {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2>Registration</h2>

      <p>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
      </p>

      <input type="text" maxLength={16} {...register("name")} />
      {errors.name && <p>{errors.name.message}</p>}

      <input type="email" {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}

      <input type="password" maxLength={12} {...register("password")} />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default RegisterForm;
