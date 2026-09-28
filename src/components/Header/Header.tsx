import { NavLink } from "react-router-dom";
import css from "./Header.module.css";
import { useState } from "react";
import Modal from "../Modal/Modal";
import RegisterForm from "../RegisterForm/RegisterForm";
import { useAuth } from "../../context/useAuth";
import { logoutUser } from "../../firebase/auth";
import LoginForm from "../LoginForm/LoginForm";
import toast from "react-hot-toast";

interface HeaderProps {
  isHomePage: boolean;
}

const Header = ({ isHomePage }: HeaderProps) => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const { user, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("You have successfully logged out!");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

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
      <header
        className={`${css.header} ${
          isHomePage ? css.homeHeader : css.innerHeader
        }`}
      >
        <div className={css.container}>
          <NavLink to="/" className={css.logo}>
            <svg>
              <use href="/icons/sprite.svg#icon-psychologistsservices" />
            </svg>
          </NavLink>

          <nav className={css.navigation}>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${css.navLink} ${isActive ? css.active : ""}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/psychologists"
              className={({ isActive }) =>
                `${css.navLink} ${isActive ? css.active : ""}`
              }
            >
              Psychologists
            </NavLink>

            {!loading && user && (
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  `${css.navLink} ${isActive ? css.active : ""}`
                }
              >
                Favorites
              </NavLink>
            )}
          </nav>

          {!loading && (
            <div
              className={`${css.authActions} ${
                user ? css.authenticated : css.unauthenticated
              }`}
            >
              {user ? (
                <>
                  <div className={css.user}>
                    <span className={css.userAvatar}>
                      <svg>
                        <use href="/icons/sprite.svg#icon-user" />
                      </svg>
                    </span>
                    <p className={css.userName}>{user.displayName}</p>
                  </div>

                  <button
                    className={css.btnLogout}
                    type="button"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    className={css.btnLogin}
                    type="button"
                    onClick={() => setIsLoginModalOpen(true)}
                  >
                    Log In
                  </button>

                  <button
                    className={css.btnRegister}
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
