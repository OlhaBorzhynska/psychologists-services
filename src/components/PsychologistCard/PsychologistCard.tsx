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

          <span className={css.stroke}></span>

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

      <ul className={css.detailsList}>
        <li className={css.detailsItem}>
          {" "}
          <p className={css.detailsText}>
            Experience:{" "}
            <span className={css.detailsTextAccent}>
              {psychologist.experience}
            </span>
          </p>
        </li>

        <li className={css.detailsItem}>
          <p className={css.detailsText}>
            License:{" "}
            <span className={css.detailsTextAccent}>
              {psychologist.license}
            </span>
          </p>
        </li>

        <li className={css.detailsItem}>
          <p className={css.detailsText}>
            Specialization:{" "}
            <span className={css.detailsTextAccent}>
              {psychologist.specialization}
            </span>
          </p>
        </li>

        <li className={css.detailsItem}>
          <p className={css.detailsText}>
            Initial_consultation:{" "}
            <span className={css.detailsTextAccent}>
              {psychologist.initial_consultation}
            </span>
          </p>
        </li>
      </ul>

      <p className={`${css.about} ${isExpanded ? css.aboutExpanded : ""}`}>
        {psychologist.about}
      </p>

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
        <ul className={css.reviewsList}>
          {psychologist.reviews.slice(0, 2).map((review) => (
            <li key={review.reviewer}>
              <div className={css.avatarRatingWrapper}>
                <div className={css.avatarName}>
                  {review.reviewer.charAt(0).toUpperCase()}
                </div>

                <div className={css.nameRatingWrapper}>
                  <h3 className={css.nameReviewer}>{review.reviewer}</h3>

                  <div className={css.ratingReview}>
                    <svg className={css.starReview}>
                      <use href="/icons/sprite.svg#icon-Star" />
                    </svg>
                    <p className={css.ratingReviewNumber}>{review.rating}</p>
                  </div>
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
