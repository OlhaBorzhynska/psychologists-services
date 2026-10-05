import { NavLink } from "react-router-dom";
import css from "./Home.module.css";
import PageMeta from "../../components/PageMeta/PageMeta";

const Home = () => {
  return (
    <>
      <PageMeta
        title="Psychologists Services — Find Your Psychologist"
        description="Find the right psychologist for you. Explore experienced specialists and choose a psychologist who can support you on your journey to better mental well-being."
      />

      <main className="container">
        <section className={css.hero}>
          <div>
            <h1 className={css.heroTitle}>
              The road to the
              <span className={css.heroTitleAccent}> depths</span> of the human
              soul
            </h1>

            <p className={css.heroText}>
              We help you to reveal your potential, overcome challenges and find
              a guide in your own life with the help of our experienced
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

            <div className={css.wrapperYellow}>
              <svg className={css.decorationYellow}>
                <use href="/icons/sprite.svg#icon-people" />
              </svg>
            </div>

            <div className={css.wrapperBlue}>
              <svg className={css.decorationBlue}>
                <use href="/icons/sprite.svg#icon-question" />
              </svg>
            </div>

            <div className={css.wrapperGreen}>
              <div className={css.wrapperDecorationGreen}>
                <svg className={css.decorationGreen}>
                  <use href="/icons/sprite.svg#icon-Check" />
                </svg>
              </div>

              <div className={css.wrapperTextGreen}>
                <p className={css.textDecorationGreen}>
                  Experienced psychologists
                </p>
                <p className={css.numberDecorationGreen}>15,000</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
