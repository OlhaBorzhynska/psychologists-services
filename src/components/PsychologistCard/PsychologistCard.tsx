import type { Psychologist } from "../../types/psychologist";
import css from "./PsychologistCard.module.css";

interface PsychologistCardProps {
  psychologist: Psychologist;
}

const PsychologistCard = ({ psychologist }: PsychologistCardProps) => {
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

      <button className={css.readMoreButton} type="button">
        Read more
      </button>
    </li>
  );
};

export default PsychologistCard;
