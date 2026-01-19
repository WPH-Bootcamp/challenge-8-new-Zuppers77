import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";
import { API_ENDPOINTS } from "../../lib/constants";
import { movieKeys } from "./keys";
import type { Movie, PaginatedResponse } from "../../types/movie";

export const useSearchMovies = (query: string) => {
  return useInfiniteQuery({
    queryKey: movieKeys.search(query),
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await api.get<PaginatedResponse<Movie>>(API_ENDPOINTS.SEARCH, {
        params: {
          query,
          page: pageParam,
        },
      });
      return data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: !!query,
  });
};
