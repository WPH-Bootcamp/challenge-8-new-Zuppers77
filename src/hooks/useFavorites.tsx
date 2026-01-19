import { useState } from "react";
import { toast } from "sonner";
import { Toast } from "../components/ui/Toast";
import type { Movie } from "../types/movie";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  const saveFavorites = (updated: Movie[]) => {
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated);
  };

  const toggleFavorite = (movie: Movie) => {
    const exists = favorites.find((f) => f.id === movie.id);
    if (exists) {
      const updated = favorites.filter((f) => f.id !== movie.id);
      saveFavorites(updated);
      toast.custom(() => <Toast message="Removed from Favorites" type="error" />, { duration: 2000 });
    } else {
      const updated = [...favorites, movie];
      saveFavorites(updated);
      toast.custom(() => <Toast message="Success Add to Favorites" type="success" />, { duration: 2000 });
    }
  };

  const isFavorite = (movieId: number) => {
    return favorites.some((f) => f.id === movieId);
  };

  return { favorites, toggleFavorite, isFavorite };
};
