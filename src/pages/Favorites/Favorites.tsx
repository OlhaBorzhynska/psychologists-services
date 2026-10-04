import { useEffect, useState } from "react";
import { getPsychologists } from "../../firebase/psychologists";
import { useFavorites } from "../../context/useFavorites";
import PsychologistCard from "../../components/PsychologistCard/PsychologistCard";
import type { Psychologist } from "../../types/psychologist";
import type { FilterOption } from "../../types/filter";
import { filterPsychologists } from "../../utils/filterPsychologists";
import PsychologistsFilter from "../../components/PsychologistsFilter/PsychologistsFilter";
import css from "./Favorites.module.css";
import { toast } from "react-hot-toast";
import Loader from "../../components/Loader/Loader";

const Favorites = () => {
  const { favoriteIds, isLoading: isFavoritesLoading } = useFavorites();
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [isPsychologistsLoading, setIsPsychologistsLoading] = useState(true);
  const [filter, setFilter] = useState<FilterOption>("show-all");
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const loadPsychologists = async () => {
      try {
        const data = await getPsychologists();
        setPsychologists(data);
      } catch {
        toast.error("Something went wrong. Please try again.");
      } finally {
        setIsPsychologistsLoading(false);
      }
    };

    loadPsychologists();
  }, []);

  const favoritePsychologists = psychologists.filter((psychologist) =>
    favoriteIds.includes(psychologist.id),
  );

  const sortedFavorites = filterPsychologists(favoritePsychologists, filter);

  const visibleFavorites = sortedFavorites.slice(0, visibleCount);

  if (isFavoritesLoading || isPsychologistsLoading) {
    return <Loader />;
  }

  return (
    <main className="container">
      <div className={css.page}>
        {sortedFavorites.length === 0 ? (
          <p className={css.textAnyFavorites}>
            You haven't added any psychologists to your favorites yet.
          </p>
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
              {visibleFavorites.map((psychologist) => (
                <PsychologistCard
                  key={psychologist.id}
                  psychologist={psychologist}
                />
              ))}
            </ul>
          </>
        )}
        {visibleCount < sortedFavorites.length && (
          <button
            type="button"
            className={css.loadMoreButton}
            onClick={() => setVisibleCount((prev) => prev + 3)}
          >
            Load more
          </button>
        )}
      </div>
    </main>
  );
};

export default Favorites;
