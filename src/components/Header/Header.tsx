import { NavLink } from "react-router-dom";
import css from "./Header.module.css";
import { useState } from "react";
import Modal from "../Modal/Modal";
import RegisterForm from "../RegisterForm/RegisterForm";
import { useAuth } from "../../context/useAuth";
import { logoutUser } from "../../firebase/auth";
import LoginForm from "../LoginForm/LoginForm";

const Header = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const { user, loading } = useAuth();

  return (
    <>
      {isRegisterModalOpen && (
        <Modal onClose={() => setIsRegisterModalOpen(false)}>
          <RegisterForm onSuccess={() => setIsRegisterModalOpen(false)} />
        </Modal>
      )}
      {isLoginModalOpen && (
        <Modal onClose={() => setIsLoginModalOpen(false)}>
          <LoginForm onSuccess={() => setIsLoginModalOpen(false)} />
        </Modal>
      )}
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

          {!loading && (
            <div className={css.authActions}>
              {user ? (
                <>
                  <span>{user.displayName}</span>

                  <button type="button" onClick={logoutUser}>
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => setIsLoginModalOpen(true)}>
                    Log In
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsRegisterModalOpen(true)}
                  >
                    Registration
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
