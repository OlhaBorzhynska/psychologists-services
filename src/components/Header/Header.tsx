import { NavLink } from "react-router-dom";

import css from "./Header.module.css";

const Header = () => {
  return (
    <header className={css.header}>
      <div className="container">
        <NavLink to="/" className={css.logo}>
          Psychologists
        </NavLink>

        <nav className={css.navigation}>
          <NavLink to="/" className={css.navLink}>
            Home
          </NavLink>

          <NavLink to="/psychologists" className={css.navLink}>
            Psychologists
          </NavLink>
        </nav>

        <div className={css.authActions}>
          <button type="button">Log In</button>
          <button type="button">Registration</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
