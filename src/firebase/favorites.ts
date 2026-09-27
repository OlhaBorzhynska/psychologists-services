import { get, ref, remove, set } from "firebase/database";

import { database } from "./database";

export const addFavorite = async (
  userId: string,
  psychologistId: string,
): Promise<void> => {
  const favoriteRef = ref(
    database,
    `users/${userId}/favorites/${psychologistId}`,
  );

  await set(favoriteRef, true);
};

export const removeFavorite = async (
  userId: string,
  psychologistId: string,
): Promise<void> => {
  const favoriteRef = ref(
    database,
    `users/${userId}/favorites/${psychologistId}`,
  );

  await remove(favoriteRef);
};

export const getFavorites = async (userId: string): Promise<string[]> => {
  const favoritesRef = ref(database, `users/${userId}/favorites`);

  const snapshot = await get(favoritesRef);

  if (!snapshot.exists()) {
    return [];
  }

  return Object.keys(snapshot.val());
};
