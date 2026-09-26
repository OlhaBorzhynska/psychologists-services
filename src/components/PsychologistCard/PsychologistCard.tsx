import type { Psychologist } from "../../types/psychologist";
import css from "./PsychologistCard.module.css";
import { useState } from "react";
import Modal from "../Modal/Modal";
import AppointmentForm from "../AppointmentForm/AppointmentForm";

interface PsychologistCardProps {
  psychologist: Psychologist;
}

const PsychologistCard = ({ psychologist }: PsychologistCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);

  return (
    <li className={css.card}>
      <div className={css.header}>
        <img
          className={css.avatar}
          src={psychologist.avatar_url}
          alt={psychologist.name}
        />

        <div className={css.headerInfo}>
          <p className={css.label}>Psychologist</p>

          <p>Rating: {psychologist.rating}</p>

          <p>${psychologist.price_per_hour}/hour</p>
        </div>

        <button
          className={css.favoriteButton}
          type="button"
          aria-label="Add to favorites"
        >
          ♡
        </button>
      </div>

      <h2 className={css.name}>{psychologist.name}</h2>

      <div className={css.details}>
        <p>Experience: {psychologist.experience}</p>

        <p>License: {psychologist.license}</p>

        <p>Specialization: {psychologist.specialization}</p>

        <p>Initial consultation: {psychologist.initial_consultation}</p>
      </div>

      <p className={css.about}>{psychologist.about}</p>

      {!isExpanded && (
        <button
          className={css.readMoreButton}
          type="button"
          onClick={() => setIsExpanded(true)}
        >
          Read more
        </button>
      )}

      {isExpanded && (
        <ul className={css.reviews}>
          {psychologist.reviews.slice(0, 2).map((review) => (
            <li key={review.reviewer} className={css.review}>
              <div className={css.avatarRatingWrapper}>
                <div className={css.avatarName}>
                  {review.reviewer.charAt(0).toUpperCase()}
                </div>

                <div className={css.nameRatingWrapper}>
                  <h3 className={css.name}>{review.reviewer}</h3>

                  <p className={css.rating}>
                    <span className={css.star}>★</span>
                    {review.rating}
                  </p>
                </div>
              </div>

              <p className={css.comment}>{review.comment}</p>
            </li>
          ))}
        </ul>
      )}

      {isExpanded && (
        <button
          className={css.appointmentButton}
          type="button"
          onClick={() => setIsAppointmentOpen(true)}
        >
          Make an appointment
        </button>
      )}

      {isAppointmentOpen && (
        <Modal onClose={() => setIsAppointmentOpen(false)}>
          <AppointmentForm
            psychologist={psychologist}
            onSuccess={() => setIsAppointmentOpen(false)}
          />
        </Modal>
      )}
    </li>
  );
};

export default PsychologistCard;
