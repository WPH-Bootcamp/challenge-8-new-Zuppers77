import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";
import { API_ENDPOINTS } from "../../lib/constants";
import { movieKeys } from "./keys";
import type { Movie, PaginatedResponse } from "../../types/movie";

export const useNowPlayingMovies = () => {
  return useQuery({
    queryKey: movieKeys.nowPlaying(),
    queryFn: async () => {
      const { data } = await api.get<PaginatedResponse<Movie>>(API_ENDPOINTS.NOW_PLAYING);
      return data.results;
    },
  });
};
