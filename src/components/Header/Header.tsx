import { useState } from "react";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import css from "./Header.module.css";
import Modal from "../Modal/Modal";
import RegisterForm from "../RegisterForm/RegisterForm";
import LoginForm from "../LoginForm/LoginForm";
import { useAuth } from "../../context/useAuth";
import { logoutUser } from "../../firebase/auth";

interface HeaderProps {
  isHomePage: boolean;
}

const Header = ({ isHomePage }: HeaderProps) => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, loading } = useAuth();

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  const openLoginModal = () => {
    setIsMenuOpen(false);
    setIsLoginModalOpen(true);
  };

  const openRegisterModal = () => {
    setIsMenuOpen(false);
    setIsRegisterModalOpen(true);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsMenuOpen(false);
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
          <NavLink to="/" className={css.logo} onClick={closeMobileMenu}>
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

          <button
            className={css.menuButton}
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg className={css.iconClose}>
                <use href="/icons/sprite.svg#icon-Close" />
              </svg>
            ) : (
              <svg className={css.iconBurgerMenu}>
                <use href="/icons/sprite.svg#icon-burger-menu" />
              </svg>
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className={css.mobileMenu}>
            <nav className={css.mobileNavigation}>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `${css.mobileNavLink} ${isActive ? css.mobileActive : ""}`
                }
                onClick={closeMobileMenu}
              >
                Home
              </NavLink>

              <NavLink
                to="/psychologists"
                className={({ isActive }) =>
                  `${css.mobileNavLink} ${isActive ? css.mobileActive : ""}`
                }
                onClick={closeMobileMenu}
              >
                Psychologists
              </NavLink>

              {!loading && user && (
                <NavLink
                  to="/favorites"
                  className={({ isActive }) =>
                    `${css.mobileNavLink} ${isActive ? css.mobileActive : ""}`
                  }
                  onClick={closeMobileMenu}
                >
                  Favorites
                </NavLink>
              )}
            </nav>

            {!loading && (
              <div className={css.mobileAuthActions}>
                {user ? (
                  <>
                    <div className={css.mobileUser}>
                      <span className={css.userAvatar}>
                        <svg>
                          <use href="/icons/sprite.svg#icon-user" />
                        </svg>
                      </span>

                      <p className={css.userName}>{user.displayName}</p>
                    </div>

                    <button
                      className={css.mobileLogout}
                      type="button"
                      onClick={handleLogout}
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className={css.mobileLogin}
                      type="button"
                      onClick={openLoginModal}
                    >
                      Log In
                    </button>

                    <button
                      className={css.mobileRegister}
                      type="button"
                      onClick={openRegisterModal}
                    >
                      Registration
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
