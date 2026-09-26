import type { Psychologist } from "../../types/psychologist";
import css from "./AppointmentForm.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { toast } from "react-hot-toast";

interface AppointmentFormProps {
  psychologist: Psychologist;
  onSuccess: () => void;
}

interface AppointmentFormData {
  name: string;
  phone: string;
  time: string;
  email: string;
  comment?: string;
}

const appointmentSchema = yup.object({
  name: yup.string().required("Name is required"),
  phone: yup.string().required("Phone number is required"),
  time: yup.string().required("Time is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  comment: yup.string(),
});

const AppointmentForm = ({ psychologist, onSuccess }: AppointmentFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: yupResolver(appointmentSchema),
  });

  const onSubmit = (data: AppointmentFormData) => {
    console.log(data);
    toast.success("Your appointment request has been sent!");
    onSuccess();
  };

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Make an appointment with a psychologist</h2>

      <p className={css.description}>
        You are on the verge of changing your life for the better. Fill out the
        short form below to book your personal appointment with a professional
        psychologist. We guarantee confidentiality and respect for your privacy.
      </p>

      <div className={css.psychologist}>
        <img
          className={css.avatar}
          src={psychologist.avatar_url}
          alt={psychologist.name}
        />

        <div>
          <p className={css.psychologistLabel}>Your psychologist</p>
          <p className={css.psychologistName}>{psychologist.name}</p>
        </div>
      </div>

      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            className={css.input}
            type="text"
            placeholder="Name"
            {...register("name")}
          />
          {errors.name && <p className={css.error}>{errors.name.message}</p>}
        </div>

        <div className={css.row}>
          <div>
            <input
              className={css.input}
              type="tel"
              placeholder="Phone"
              {...register("phone")}
            />
            {errors.phone && (
              <p className={css.error}>{errors.phone.message}</p>
            )}
          </div>

          <div>
            <input className={css.input} type="time" {...register("time")} />
            {errors.time && <p className={css.error}>{errors.time.message}</p>}
          </div>
        </div>

        <div>
          <input
            className={css.input}
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && <p className={css.error}>{errors.email.message}</p>}
        </div>

        <textarea
          className={css.textarea}
          placeholder="Comment"
          rows={4}
          {...register("comment")}
        />

        <button className={css.submitButton} type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
