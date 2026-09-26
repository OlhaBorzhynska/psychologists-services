import { useEffect, useState } from "react";
import { getPsychologists } from "../../firebase/psychologists";
import type { Psychologist } from "../../types/psychologist";
import PsychologistCard from "../../components/PsychologistCard/PsychologistCard";
import css from "./Psychologists.module.css";

type FilterOption =
  | "a-to-z"
  | "z-to-a"
  | "less-than-10"
  | "greater-than-10"
  | "popular"
  | "not-popular"
  | "show-all";

const filterOptions: { value: FilterOption; label: string }[] = [
  { value: "a-to-z", label: "A to Z" },
  { value: "z-to-a", label: "Z to A" },
  { value: "less-than-10", label: "Less than 10$" },
  { value: "greater-than-10", label: "Greater than 10$" },
  { value: "popular", label: "Popular" },
  { value: "not-popular", label: "Not popular" },
  { value: "show-all", label: "Show all" },
];

const Psychologists = () => {
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [filter, setFilter] = useState<FilterOption>("show-all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchPsychologists = async () => {
      const data = await getPsychologists();
      setPsychologists(data);
    };

    fetchPsychologists();
  }, []);

  let filteredPsychologists = [...psychologists];

  switch (filter) {
    case "a-to-z":
      filteredPsychologists.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case "z-to-a":
      filteredPsychologists.sort((a, b) => b.name.localeCompare(a.name));
      break;

    case "less-than-10":
      filteredPsychologists = filteredPsychologists.filter(
        (psychologist) => psychologist.price_per_hour < 10,
      );
      break;

    case "greater-than-10":
      filteredPsychologists = filteredPsychologists.filter(
        (psychologist) => psychologist.price_per_hour > 10,
      );
      break;

    case "popular":
      filteredPsychologists.sort((a, b) => b.rating - a.rating);
      break;

    case "not-popular":
      filteredPsychologists.sort((a, b) => a.rating - b.rating);
      break;

    case "show-all":
      break;
  }

  const visiblePsychologists = filteredPsychologists.slice(0, visibleCount);

  return (
    <main className={css.page}>
      <h1 className={css.title}>Psychologists</h1>

      <div className={css.filterWrapper}>
        <p className={css.filterLabel}>Filters</p>

        <button
          className={css.filterButton}
          type="button"
          onClick={() => setIsFilterOpen((prev) => !prev)}
        >
          <span>
            {filterOptions.find((option) => option.value === filter)?.label}
          </span>

          <span>{isFilterOpen ? "▲" : "▼"}</span>
        </button>

        {isFilterOpen && (
          <ul className={css.filterOptions}>
            {filterOptions.map((option) => (
              <li key={option.value}>
                <button
                  className={css.filterOption}
                  type="button"
                  onClick={() => {
                    setFilter(option.value);
                    setVisibleCount(3);
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

      <ul className={css.psychologistsList}>
        {visiblePsychologists.map((psychologist) => (
          <PsychologistCard
            key={psychologist.name}
            psychologist={psychologist}
          />
        ))}
      </ul>

      {visibleCount < filteredPsychologists.length && (
        <button
          className={css.loadMoreButton}
          type="button"
          onClick={() => setVisibleCount((prev) => prev + 3)}
        >
          Load more
        </button>
      )}
    </main>
  );
};

export default Psychologists;
