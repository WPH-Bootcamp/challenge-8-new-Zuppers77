import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";
import { API_ENDPOINTS } from "../../lib/constants";
import { movieKeys } from "./keys";
import type { Genre } from "../../types/movie";

interface GenreResponse {
  genres: Genre[];
}

export const useGenres = () => {
  return useQuery({
    queryKey: movieKeys.genres(),
    queryFn: async () => {
      const { data } = await api.get<GenreResponse>(API_ENDPOINTS.GENRES);
      return data.genres;
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};
