import { useEffect, useState } from "react";
import { getPsychologists } from "../../firebase/psychologists";
import type { Psychologist } from "../../types/psychologist";
import PsychologistCard from "../../components/PsychologistCard/PsychologistCard";
import PsychologistsFilter from "../../components/PsychologistsFilter/PsychologistsFilter";
import css from "./Psychologists.module.css";
import type { FilterOption } from "../../types/filter";
import { filterPsychologists } from "../../utils/filterPsychologists";
import PageMeta from "../../components/PageMeta/PageMeta";
import Loader from "../../components/Loader/Loader";

const Psychologists = () => {
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [filter, setFilter] = useState<FilterOption>("show-all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPsychologists = async () => {
      try {
        const data = await getPsychologists();
        setPsychologists(data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPsychologists();
  }, []);

  const filteredPsychologists = filterPsychologists(psychologists, filter);

  const visiblePsychologists = filteredPsychologists.slice(0, visibleCount);

  return (
    <>
      <PageMeta
        title="Psychologists — Find Your Specialist"
        description="Browse our psychologists, learn about their experience and specializations, and find a specialist who matches your needs."
      />

      <main className="container">
        <div className={css.page}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <PsychologistsFilter
                filter={filter}
                onFilterChange={(value) => {
                  setFilter(value);
                  setVisibleCount(3);
                }}
              />

              <ul className={css.psychologistsList}>
                {visiblePsychologists.map((psychologist) => (
                  <PsychologistCard
                    key={psychologist.id}
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
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Psychologists;
