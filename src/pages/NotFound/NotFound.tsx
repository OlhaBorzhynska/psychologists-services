import { Link } from "react-router-dom";
import css from "./NotFound.module.css";
import PageMeta from "../../components/PageMeta/PageMeta";

const NotFound = () => {
  return (
    <>
      <PageMeta
        title="Page Not Found - Psychologists Services"
        description="The page you're looking for doesn't exist. Return to Psychologists Services and find the right specialist for you."
      />
      <main className={css.page}>
        <div className={css.content}>
          <p className={css.code}>404</p>

          <h1 className={css.title}>Page not found</h1>

          <p className={css.description}>
            Oops! The page you're looking for doesn't exist or may have been
            moved.
          </p>

          <Link to="/psychologists" className={css.button}>
            Back to psychologists
          </Link>
        </div>
      </main>
    </>
  );
};

export default NotFound;
