import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.wrapper} role="status" aria-label="Loading">
      <span className={css.spinner} aria-hidden="true"></span>
    </div>
  );
};

export default Loader;
