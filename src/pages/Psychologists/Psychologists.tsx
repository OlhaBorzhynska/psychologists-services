import { useEffect, useState } from "react";
import { getPsychologists } from "../../firebase/psychologists";
import type { Psychologist } from "../../types/psychologist";
import PsychologistCard from "../../components/PsychologistCard/PsychologistCard";

const Psychologists = () => {
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const fetchPsychologists = async () => {
      const data = await getPsychologists();
      setPsychologists(data);
    };

    fetchPsychologists();
  }, []);

  const visiblePsychologists = psychologists.slice(0, visibleCount);

  return (
    <div>
      <h1>Psychologists page</h1>
      <ul>
        {visiblePsychologists.map((psychologist) => (
          <PsychologistCard
            key={psychologist.name}
            psychologist={psychologist}
          />
        ))}
      </ul>
      {visibleCount < psychologists.length && (
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
