import { Link } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/solid";
import type { Movie } from "../../types/movie";
import { formatRating } from "../../lib/utils";
import { MoviePoster } from "../shared/MoviePoster";
import { Card } from "../ui/Card";

interface MovieCardProps {
  movie: Movie;
  rank?: number;
}

export const MovieCard = ({ movie, rank }: MovieCardProps) => {


  return (
    <Link to={`/movie/${movie.id}`} className="block group">
      <Card className="h-full bg-transparent border-0">
        <div className="relative rounded-xl overflow-hidden mb-3">
          {/* Rank Badge */}
          {rank && (
            <div className="absolute top-2 left-2 w-8 h-8 md:w-10 md:h-10 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 z-10">
              <span className="font-bold text-white text-sm md:text-base">{rank}</span>
            </div>
          )}
          
          <MoviePoster posterPath={movie.poster_path} alt={movie.title} />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 pointer-events-none" />
        </div>

        <div className="space-y-1">
          <h3 className="font-semibold text-white group-hover:text-primary transition-colors line-clamp-1">
            {movie.title}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <StarIcon className="w-4 h-4 text-yellow-400" />
            <span>{formatRating(movie.vote_average)}/10</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};
