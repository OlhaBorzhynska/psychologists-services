import { NavLink } from "react-router-dom";
import css from "./Home.module.css";

const Home = () => {
  return (
    <main className="container">
      <section className={css.hero}>
        <div className={css.сontentWrapper}>
          <h1 className={css.heroTitle}>
            The road to the
            <span className={css.heroTitleAccent}> depths</span> of the human
            soul
          </h1>

          <p className={css.heroText}>
            We help you to reveal your potential, overcome challenges and find a
            guide in your own life with the help of our experienced
            psychologists.
          </p>

          <NavLink to="/psychologists" className={css.heroButton}>
            Get started
            <svg>
              <use href="/icons/sprite.svg#icon-Arrow" />
            </svg>
          </NavLink>
        </div>

        <div className={css.imageWrapper}>
          <img
            src="/images/hero-image.webp"
            alt="Psychologist"
            className={css.heroImage}
          />
        </div>
      </section>
    </main>
  );
};

export default Home;
