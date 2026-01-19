import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";
import { API_ENDPOINTS } from "../../lib/constants";
import { movieKeys } from "./keys";
import type { Movie, PaginatedResponse } from "../../types/movie";

export const useUpcomingMovies = () => {
  return useInfiniteQuery({
    queryKey: movieKeys.upcoming(),
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await api.get<PaginatedResponse<Movie>>(API_ENDPOINTS.UPCOMING, {
        params: { page: pageParam },
      });
      return data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 1,
    select: (data) => {
      const allMovies = data.pages.flatMap((page) => page.results);
      
      // If only 1 page is loaded, limit to 15 items for the New Release Section
      if (data.pages.length === 1) {
        return allMovies.slice(0, 15);
      }
      
      return allMovies;
    },
  });
};
