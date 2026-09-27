import { createContext } from "react";

export interface FavoritesContextValue {
  favoriteIds: string[];
  toggleFavorite: (psychologistId: string) => Promise<void>;
  isFavorite: (psychologistId: string) => boolean;
  isLoading: boolean;
}

export const FavoritesContext = createContext<
  FavoritesContextValue | undefined
>(undefined);
