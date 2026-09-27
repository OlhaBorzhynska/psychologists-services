import { useCallback, useEffect, useState, type ReactNode } from "react";

import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../firebase/favorites";

import { useAuth } from "./useAuth";
import { FavoritesContext } from "./FavoritesContext";
import { toast } from "react-hot-toast";

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const { user } = useAuth();

  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadFavorites = async () => {
      if (!user) {
        setFavoriteIds([]);
        return;
      }

      setIsLoading(true);

      try {
        const favorites = await getFavorites(user.uid);
        setFavoriteIds(favorites);
      } catch (error) {
        console.error("Failed to load favorites:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, [user]);

  const toggleFavorite = useCallback(
    async (psychologistId: string) => {
      if (!user) {
        toast.error("Please log in to add psychologists to favorites.");
        return;
      }

      const alreadyFavorite = favoriteIds.includes(psychologistId);

      try {
        if (alreadyFavorite) {
          await removeFavorite(user.uid, psychologistId);

          setFavoriteIds((prev) => prev.filter((id) => id !== psychologistId));
        } else {
          await addFavorite(user.uid, psychologistId);

          setFavoriteIds((prev) => [...prev, psychologistId]);
        }
      } catch (error) {
        console.error("Failed to update favorites:", error);
      }
    },
    [user, favoriteIds],
  );

  const isFavorite = useCallback(
    (psychologistId: string) => {
      return favoriteIds.includes(psychologistId);
    },
    [favoriteIds],
  );

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        toggleFavorite,
        isFavorite,
        isLoading,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
