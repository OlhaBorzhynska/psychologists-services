import { useState } from "react";
import type { FilterOption } from "../../types/filter";
import css from "./PsychologistsFilter.module.css";

interface PsychologistsFilterProps {
  filter: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
}

const filterOptions: { value: FilterOption; label: string }[] = [
  { value: "a-to-z", label: "A to Z" },
  { value: "z-to-a", label: "Z to A" },
  { value: "less-than-10", label: "Less than 10$" },
  { value: "greater-than-10", label: "Greater than 10$" },
  { value: "popular", label: "Popular" },
  { value: "not-popular", label: "Not popular" },
  { value: "show-all", label: "Show all" },
];

const PsychologistsFilter = ({
  filter,
  onFilterChange,
}: PsychologistsFilterProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const selectedOption = filterOptions.find(
    (option) => option.value === filter,
  );

  return (
    <div className={css.filterWrapper}>
      <p className={css.filterLabel}>Filters</p>

      <button
        className={css.filterButton}
        type="button"
        onClick={() => setIsFilterOpen((prev) => !prev)}
      >
        <span>{selectedOption?.label}</span>

        <div className={css.svgWrapper}>
          {isFilterOpen ? (
            <svg>
              <use href="/icons/sprite.svg#icon-up" />
            </svg>
          ) : (
            <svg>
              <use href="/icons/sprite.svg#icon-down" />
            </svg>
          )}
        </div>
      </button>

      {isFilterOpen && (
        <ul className={css.filterOptions}>
          {filterOptions.map((option) => (
            <li key={option.value}>
              <button
                className={css.filterOption}
                type="button"
                onClick={() => {
                  onFilterChange(option.value);
                  setIsFilterOpen(false);
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PsychologistsFilter;
