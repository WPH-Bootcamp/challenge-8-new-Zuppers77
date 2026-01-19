export const movieKeys = {
  all: ['movies'] as const,
  trending: () => [...movieKeys.all, 'trending'] as const,
  upcoming: () => [...movieKeys.all, 'upcoming'] as const,
  nowPlaying: () => [...movieKeys.all, 'nowPlaying'] as const,
  popular: () => [...movieKeys.all, 'popular'] as const,
  detail: (movieId: string) => [...movieKeys.all, 'detail', movieId] as const,
  search: (query: string) => [...movieKeys.all, 'search', query] as const,
  genres: () => [...movieKeys.all, 'genres'] as const,
};
