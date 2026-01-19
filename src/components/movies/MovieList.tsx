import { Link } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/outline";
import { FavoriteButton } from "../shared/FavoriteButton";
import { TrailerButton } from "../shared/TrailerButton";
import { MoviePoster } from "../shared/MoviePoster";
import { formatRating } from "../../lib/utils";
import type { Movie } from "../../types/movie";

interface MovieListProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: (movie: Movie) => void;
}

export const MovieList = ({ movie, isFavorite, onToggleFavorite }: MovieListProps) => {
  return (
    <div className="relative border-b border-white/20 last:border-none py-6 md:py-8">
      
      <div className="flex gap-4 md:gap-8">
        {/* Poster */}
        <Link to={`/movie/${movie.id}`} className="shrink-0 w-[100px] md:w-[150px] aspect-2/3 rounded-xl overflow-hidden bg-zinc-800">
           <MoviePoster posterPath={movie.poster_path} alt={movie.title} />
        </Link>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-between md:justify-start">
          <div className="space-y-2 md:space-y-4">
             <div className="flex justify-between items-start gap-2">
                <Link to={`/movie/${movie.id}`} className="block">
                   <h2 className="text-base md:text-2xl font-bold hover:text-red-500 transition-colors">{movie.title}</h2>
                </Link>
             </div>
             
             <div className="flex items-center gap-2 text-xs md:text-sm font-semibold">
               <StarIcon className="w-4 h-4 md:w-5 md:h-5 fill-yellow-500 text-yellow-500" />
               <span>{formatRating(movie.vote_average)}/10</span>
             </div>

             <p className="text-gray-400 text-xs md:text-sm leading-relaxed line-clamp-3 md:line-clamp-2 max-w-2xl">
               {movie.overview}
             </p>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:block pt-4">
             <div className="flex items-center gap-3">
                 <Link to={`/movie/${movie.id}`}>
                     <TrailerButton className="px-6 py-2 text-sm" />
                 </Link>
             </div>
          </div>
        </div>

        {/* Desktop Favorite Button (Right aligned) */}
        <FavoriteButton 
           isFavorite={isFavorite} 
           onClick={() => onToggleFavorite(movie)} 
           className="hidden md:block self-start"
        />
      </div>

      <div className="md:hidden flex items-center gap-3 mt-4">
          <Link to={`/movie/${movie.id}`} className="flex-1">
             <TrailerButton className="w-full justify-center px-4 py-3 text-sm" />
          </Link>
          <FavoriteButton 
             isFavorite={isFavorite} 
             onClick={() => onToggleFavorite(movie)} 
             className="bg-zinc-800/50 border-white/10 p-3"
          />
      </div>
    </div>
  );
};
