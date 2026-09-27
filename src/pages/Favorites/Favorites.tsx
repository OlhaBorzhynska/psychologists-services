import { useEffect, useState } from "react";
import { getPsychologists } from "../../firebase/psychologists";
import { useFavorites } from "../../context/useFavorites";
import PsychologistCard from "../../components/PsychologistCard/PsychologistCard";
import type { Psychologist } from "../../types/psychologist";
import type { FilterOption } from "../../types/filter";
import { filterPsychologists } from "../../utils/filterPsychologists";
import PsychologistsFilter from "../../components/PsychologistsFilter/PsychologistsFilter";

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
      } catch (error) {
        console.error("Failed to load psychologists:", error);
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
    return <p>Loading...</p>;
  }

  return (
    <main>
      <PsychologistsFilter
        filter={filter}
        onFilterChange={(value) => {
          setFilter(value);
          setVisibleCount(3);
        }}
      />

      {sortedFavorites.length === 0 ? (
        <p>You haven't added any psychologists to your favorites yet.</p>
      ) : (
        <ul>
          {visibleFavorites.map((psychologist) => (
            <PsychologistCard
              key={psychologist.id}
              psychologist={psychologist}
            />
          ))}
        </ul>
      )}
      {visibleCount < sortedFavorites.length && (
        <button
          type="button"
          onClick={() => setVisibleCount((prev) => prev + 3)}
        >
          Load more
        </button>
      )}
    </main>
  );
};

export default Favorites;
