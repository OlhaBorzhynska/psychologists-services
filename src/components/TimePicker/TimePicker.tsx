import { useEffect, useRef, useState } from "react";
import css from "./TimePicker.module.css";

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
}

const generateTimeOptions = (): string[] => {
  const options: string[] = [];

  for (let hour = 9; hour <= 18; hour++) {
    for (const minute of [0, 30]) {
      if (hour === 18 && minute === 30) continue;

      options.push(
        `${String(hour).padStart(2, "0")}  :  ${String(minute).padStart(2, "0")}`,
      );
    }
  }

  return options;
};

const timeOptions = generateTimeOptions();

const TimePicker = ({ value, onChange }: TimePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const pickerRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!isOpen || !value || !optionsRef.current) return;

    const selectedOption = optionsRef.current.querySelector(
      `[data-time="${value}"]`,
    );

    if (selectedOption) {
      selectedOption.scrollIntoView({
        block: "center",
        behavior: "instant",
      });
    }
  }, [isOpen, value]);

  const handleSelect = (time: string) => {
    onChange(time);
    setIsOpen(false);
  };

  return (
    <div className={css.wrapper} ref={pickerRef}>
      <button
        type="button"
        className={`${css.input} ${isOpen ? css.inputActive : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={value ? css.value : css.placeholder}>
          {value || "00:00"}
        </span>

        <svg className={css.clockIcon}>
          <use href="/icons/sprite.svg#icon-clock" />
        </svg>
      </button>

      {isOpen && (
        <div className={css.dropdown}>
          <p className={css.text}>Meeting time</p>
          <div className={css.options} ref={optionsRef}>
            {timeOptions.map((time) => (
              <button
                key={time}
                type="button"
                data-time={time}
                className={`${css.option} ${
                  time === value ? css.selected : ""
                }`}
                onClick={() => handleSelect(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePicker;
