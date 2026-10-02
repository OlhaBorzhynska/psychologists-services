import type { Psychologist } from "../../types/psychologist";
import css from "./PsychologistCard.module.css";
import { useState } from "react";
import Modal from "../Modal/Modal";
import AppointmentForm from "../AppointmentForm/AppointmentForm";
import { useFavorites } from "../../context/useFavorites";

interface PsychologistCardProps {
  psychologist: Psychologist;
}

const PsychologistCard = ({ psychologist }: PsychologistCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  const favorite = isFavorite(psychologist.id);

  return (
    <li className={css.card}>
      <div className={css.avatarWrapper}>
        <img
          className={css.avatar}
          src={psychologist.avatar_url}
          alt={psychologist.name}
        />
        <svg>
          <use href="/icons/sprite.svg#icon-active" />
        </svg>
      </div>

      <div className={css.header}>
        <p className={css.label}>Psychologist</p>

        <div className={css.ratingPriceBtnWrapper}>
          <svg className={css.iconStar}>
            <use href="/icons/sprite.svg#icon-Star" />
          </svg>
          <p className={css.rating}>Rating: {psychologist.rating}</p>

          <svg className={css.iconStroke}>
            <use href="/icons/sprite.svg#icon-stroke" />
          </svg>

          <p className={css.price}>
            Price / 1 hour:{" "}
            <span className={css.accent}>${psychologist.price_per_hour}</span>
          </p>

          <button
            className={css.favoriteButton}
            type="button"
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
            onClick={() => toggleFavorite(psychologist.id)}
          >
            {favorite ? (
              <svg className={css.iconHeartGreen}>
                <use href="/icons/sprite.svg#icon-heart-green" />
              </svg>
            ) : (
              <svg className={css.iconHeart}>
                <use href="/icons/sprite.svg#icon-heart" />
              </svg>
            )}
          </button>
        </div>
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
