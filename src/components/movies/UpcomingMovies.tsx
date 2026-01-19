import type { Movie } from "../../types/movie";
import { MovieCard } from "./MovieCard";
import { LoadMoreButton } from "../shared/LoadMoreButton";

interface UpcomingMoviesProps {
  title: string;
  movies: Movie[];
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
}

export const UpcomingMovies = ({ title, movies, onLoadMore, isLoadingMore }: UpcomingMoviesProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
      
      <div className="relative">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 md:gap-x-6 gap-y-6 md:gap-y-12">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {onLoadMore && (
          <LoadMoreButton 
            onClick={onLoadMore} 
            isLoading={isLoadingMore || false} 
          />
        )}
      </div>
    </div>
  );
};
