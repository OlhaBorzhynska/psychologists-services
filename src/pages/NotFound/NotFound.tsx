import { Link } from "react-router-dom";
import css from "./NotFound.module.css";

const NotFound = () => {
  return (
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
  );
};

export default NotFound;
