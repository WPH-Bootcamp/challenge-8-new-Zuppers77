import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";
import { movieKeys } from "./keys";
import type { MovieDetail } from "../../types/movie";

export const useMovieDetail = (movieId: string | undefined) => {
  return useQuery({
    queryKey: movieKeys.detail(movieId || ""),
    queryFn: async () => {
      if (!movieId) throw new Error("Movie ID is required");
      const { data } = await api.get<MovieDetail>(`/movie/${movieId}`, {
        params: {
          append_to_response: "credits",
        },
      });
      return data;
    },
    enabled: !!movieId,
  });
};
