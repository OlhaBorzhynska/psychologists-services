import { useEffect, useState } from "react";
import { getPsychologists } from "../../firebase/psychologists";
import type { Psychologist } from "../../types/psychologist";
import PsychologistCard from "../../components/PsychologistCard/PsychologistCard";
import PsychologistsFilter from "../../components/PsychologistsFilter/PsychologistsFilter";
import css from "./Psychologists.module.css";
import type { FilterOption } from "../../types/filter";
import { filterPsychologists } from "../../utils/filterPsychologists";

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

  const filteredPsychologists = filterPsychologists(psychologists, filter);

  const visiblePsychologists = filteredPsychologists.slice(0, visibleCount);

  return (
    <main className={css.page}>
      <h1 className={css.title}>Psychologists</h1>

      <PsychologistsFilter
        filter={filter}
        onFilterChange={(value) => {
          setFilter(value);
          setVisibleCount(3);
        }}
      />

      <ul className={css.psychologistsList}>
        {visiblePsychologists.map((psychologist) => (
          <PsychologistCard key={psychologist.id} psychologist={psychologist} />
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
