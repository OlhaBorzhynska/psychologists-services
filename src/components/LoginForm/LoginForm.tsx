import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { loginUser } from "../../firebase/auth";
import toast from "react-hot-toast";
import { getAuthErrorMessage } from "../../utils/getAuthErrorMessage";

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Log In</h2>

      <p>
        Welcome back! Please enter your credentials to access your account and
        continue your search for a psychologist.
      </p>
      <input type="email" {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}

      <input type="password" {...register("password")} />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit">Log In</button>
    </form>
  );
};

export default LoginForm;
