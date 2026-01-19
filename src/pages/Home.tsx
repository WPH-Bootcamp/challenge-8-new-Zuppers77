import { useTrendingMovies } from "../hooks/query/useTrendingMovies";
import { useUpcomingMovies } from "../hooks/query/useUpcomingMovies";
import { HeroBanner } from "../components/movies/HeroBanner";
import { MovieCarousel } from "../components/movies/MovieCarousel";
import { UpcomingMovies } from "../components/movies/UpcomingMovies";
import { Skeleton } from "../components/ui/Skeleton";

import { useNowPlayingMovies } from "../hooks/query/useNowPlayingMovies";

export default function Home() {
  const { data: trendingMovies, isLoading: loadingTrending } = useTrendingMovies();
  const { data: nowPlayingMovies, isLoading: loadingNowPlaying } = useNowPlayingMovies();
  const { 
    data: upcomingMovies, 
    isLoading: loadingUpcoming, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useUpcomingMovies();

  if (loadingTrending || loadingUpcoming || loadingNowPlaying) {
    return (
      <div className="min-h-screen bg-black">
        {/* Hero Skeleton */}
        <div className="h-[85vh] w-full relative">
           <Skeleton className="w-full h-full bg-zinc-900" />
           <div className="absolute inset-0 bg-linear-to-t from-black to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 space-y-8 -mt-20 relative z-10">
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <div className="flex gap-4 overflow-hidden">
               {[...Array(5)].map((_, i) => (
                 <Skeleton key={i} className="min-w-[200px] h-[300px] rounded-xl" />
               ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const heroMovie = nowPlayingMovies?.[0];
  
  return (
    <div className="bg-black min-h-screen">
      {heroMovie && <HeroBanner movie={heroMovie} />}
      
      <div className="relative z-10 -mt-10 md:-mt-20 space-y-8 md:space-y-12 bg-linear-to-b from-transparent via-black/80 to-black">
        {trendingMovies && (
          <MovieCarousel 
            title="Trending Now" 
            movies={trendingMovies.slice(0, 10)} 
          />
        )}
        
        {upcomingMovies && upcomingMovies.length > 0 && (
          <UpcomingMovies
            title="New Release"
            movies={upcomingMovies}
            onLoadMore={hasNextPage ? fetchNextPage : undefined}
            isLoadingMore={isFetchingNextPage}
          />
        )}
      </div>
    </div>
  );
}
