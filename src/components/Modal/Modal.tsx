import { useEffect } from "react";
import css from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          type="button"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg>
            <use href="/icons/sprite.svg#icon-Close" />
          </svg>
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
