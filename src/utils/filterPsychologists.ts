import type { Psychologist } from "../types/psychologist";
import type { FilterOption } from "../types/filter";

export const filterPsychologists = (
  psychologists: Psychologist[],
  filter: FilterOption,
): Psychologist[] => {
  const filteredPsychologists = [...psychologists];

  switch (filter) {
    case "a-to-z":
      filteredPsychologists.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case "z-to-a":
      filteredPsychologists.sort((a, b) => b.name.localeCompare(a.name));
      break;

    case "less-than-10":
      filteredPsychologists.sort((a, b) => a.price_per_hour - b.price_per_hour);
      break;

    case "greater-than-10":
      filteredPsychologists.sort((a, b) => b.price_per_hour - a.price_per_hour);
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

  return filteredPsychologists;
};
