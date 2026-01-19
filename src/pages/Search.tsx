import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MovieList } from "../components/movies/MovieList";
import { useSearchMovies } from "../hooks/query/useSearchMovies";
import { Skeleton } from "../components/ui/Skeleton";
import { useFavorites } from "../hooks/useFavorites";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const observerTarget = useRef<HTMLDivElement>(null);
  const { toggleFavorite, isFavorite } = useFavorites();

  const { 
    data, 
    isLoading, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage,
    isError
  } = useSearchMovies(query);

  const movies = data?.pages.flatMap(page => page.results) || [];
  const totalResults = data?.pages[0]?.total_results || 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Loading State (List Skeleton)
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black pt-24 max-w-7xl mx-auto px-4">
        <h2 className="text-xl font-bold text-white mb-6">Found 0 results</h2>
        <div className="space-y-6">
           {[...Array(5)].map((_, i) => (
             <div key={i} className="flex gap-4 md:gap-6 bg-zinc-900/50 p-4 rounded-xl border border-white/5">
                <Skeleton className="w-24 md:w-32 aspect-2/3 rounded-lg shrink-0" />
                <div className="flex-1 space-y-3">
                   <Skeleton className="h-6 w-3/4 md:w-1/2" />
                   <Skeleton className="h-4 w-20" />
                   <Skeleton className="h-16 w-full hidden md:block" />
                   <Skeleton className="h-10 w-32" />
                </div>
             </div>
           ))}
        </div>
      </div>
    );
  }

  // Error State
  if (isError) {
     return (
        <div className="min-h-screen bg-black pt-24 px-4 text-center text-red-500">
           Something went wrong. Please try again.
        </div>
     );
  }

  // Initial State (No Query)
  if (!query) {
    return (
      <div className="min-h-screen bg-black pt-24 px-4 flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center">
            <MagnifyingGlassIcon className="w-10 h-10 text-zinc-500" />
        </div>
        <h2 className="text-2xl font-bold text-white">Search Movies</h2>
        <p className="text-gray-400">Type something in the search bar to find movies.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="max-w-7xl mx-auto px-4">
        {movies.length > 0 && (
           <div className="mb-6 flex items-center justify-between">
              <h2 className="text-md md:text-xl text-gray-400">Found {totalResults} results</h2>
           </div>
        )}

        {movies.length > 0 ? (
          <div className="space-y-6">
             {movies.map((movie) => (
                <MovieList 
                  key={movie.id} 
                  movie={movie} 
                  isFavorite={isFavorite(movie.id)}
                  onToggleFavorite={() => toggleFavorite(movie)} 
                />
             ))}
             
             {/* Infinite Scroll Trigger */}
             <div ref={observerTarget} className="flex justify-center py-8">
               {isFetchingNextPage && (
                  <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
               )}
             </div>
          </div>
        ) : (
          // Empty State (Refined)
           <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
               <div className="relative">
                  <img
                    src="/src/assets/images/data-not-found.png" 
                    alt="Data Not Found" 
                    className="w-32 h-32 object-contain opacity-80"
                  />
               </div>
               <div className="space-y-2">
                  <h2 className="text-xl font-bold text-white">Data Not Found</h2>
                  <p className="text-gray-500 max-w-xs mx-auto">Try other keywords</p>
               </div>
            </div>
        )}
      </div>
    </div>
  );
}
