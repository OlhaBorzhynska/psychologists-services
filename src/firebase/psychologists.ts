import { get, ref } from "firebase/database";

import { database } from "./database";
import type { Psychologist } from "../types/psychologist";

export const getPsychologists = async (): Promise<Psychologist[]> => {
  const psychologistsRef = ref(database, "psychologists");

  const snapshot = await get(psychologistsRef);

  if (!snapshot.exists()) {
    return [];
  }

  return Object.entries(snapshot.val()).map(([id, psychologist]) => ({
    id,
    ...(psychologist as Omit<Psychologist, "id">),
  }));
};
