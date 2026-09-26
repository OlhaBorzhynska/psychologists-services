import { useEffect, useState } from "react";
import { getPsychologists } from "../../firebase/psychologists";
import type { Psychologist } from "../../types/psychologist";
import PsychologistCard from "../../components/PsychologistCard/PsychologistCard";

type FilterOption =
  | "a-to-z"
  | "z-to-a"
  | "less-than-10"
  | "greater-than-10"
  | "popular"
  | "not-popular"
  | "show-all";

const Psychologists = () => {
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [filter, setFilter] = useState<FilterOption>("show-all");

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
    <div>
      <h1>Psychologists page</h1>

      <select
        value={filter}
        onChange={(event) => {
          setFilter(event.target.value as FilterOption);
          setVisibleCount(3);
        }}
      >
        <option value="a-to-z">A to Z</option>
        <option value="z-to-a">Z to A</option>
        <option value="less-than-10">Less than 10$</option>
        <option value="greater-than-10">Greater than 10$</option>
        <option value="popular">Popular</option>
        <option value="not-popular">Not popular</option>
        <option value="show-all">Show all</option>
      </select>

      <ul>
        {visiblePsychologists.map((psychologist) => (
          <PsychologistCard
            key={psychologist.name}
            psychologist={psychologist}
          />
        ))}
      </ul>

      {visibleCount < filteredPsychologists.length && (
        <button
          type="button"
          onClick={() => setVisibleCount((prev) => prev + 3)}
        >
          Load more
        </button>
      )}
    </div>
  );
};

export default Psychologists;
