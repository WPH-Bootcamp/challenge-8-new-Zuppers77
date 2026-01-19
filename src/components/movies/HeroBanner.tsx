import { Link } from "react-router-dom";
import type { Movie } from "../../types/movie";
import { TMDB_IMAGE_BASE_URL, IMAGE_SIZES } from "../../lib/constants";
import { Button } from "../ui/Button";
import { BackdropImage } from "../shared/BackdropImage";
import { TrailerButton } from "../shared/TrailerButton";

interface HeroBannerProps {
  movie: Movie;
}

export const HeroBanner = ({ movie }: HeroBannerProps) => {
  const backdropUrl = movie.backdrop_path
    ? `${TMDB_IMAGE_BASE_URL}/${IMAGE_SIZES.backdrop}${movie.backdrop_path}`
    : "";

  if (!backdropUrl) return null;

  return (
    <div className="w-full h-[85vh] md:h-[90vh]">
      <BackdropImage 
        src={backdropUrl} 
        alt={movie.title}
        className="h-full"
      >
        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 flex flex-col justify-center h-full pt-20 relative z-20">
          <div className="max-w-2xl space-y-6 animate-in slide-in-from-bottom-5 fade-in duration-700">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              {movie.title}
            </h1>
            
            <p className="text-gray-300 text-sm md:text-lg line-clamp-3 md:line-clamp-4 leading-relaxed max-w-xl">
              {movie.overview}
            </p>

            <div className="flex flex-col md:flex-row items-center gap-4 pt-4 w-full md:w-auto">
              <TrailerButton className="w-full md:w-auto px-8 py-3 text-lg justify-center" />
              <Link to={`/movie/${movie.id}`} className="w-full md:w-auto">
                <Button 
                  variant="outline" 
                  size="md" 
                  className="w-full md:w-auto justify-center bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 text-white px-12"
                >
                  See Detail
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </BackdropImage>
    </div>
  );
};
