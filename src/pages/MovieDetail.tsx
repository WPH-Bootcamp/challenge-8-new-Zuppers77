import { useParams } from "react-router-dom";
import { StarIcon, VideoCameraIcon, UserGroupIcon, CalendarIcon } from "@heroicons/react/24/outline";
import { FavoriteButton } from "../components/shared/FavoriteButton";
import { TrailerButton } from "../components/shared/TrailerButton";
import { useMovieDetail } from "../hooks/query/useMovieDetail";
import { useFavorites } from "../hooks/useFavorites";
import { TMDB_IMAGE_BASE_URL, IMAGE_SIZES } from "../lib/constants";
import { formatRating, formatDate } from "../lib/utils";
import { Skeleton } from "../components/ui/Skeleton";
import { BackdropImage } from "../components/shared/BackdropImage";
import { StatsCard } from "../components/shared/StatsCard";
import { MoviePoster } from "../components/shared/MoviePoster";

export default function MovieDetail() {
  const { id } = useParams();
  const { data: movie, isLoading } = useMovieDetail(id);
  const { isFavorite, toggleFavorite } = useFavorites();

  const isFav = movie ? isFavorite(movie.id) : false;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black relative">
        <Skeleton className="w-full h-[85vh] md:h-[90vh] bg-zinc-900" />
        <div className="max-w-7xl mx-auto px-4 -mt-32 relative z-10">
           <div className="flex flex-row gap-4 md:gap-8 items-end">
             <Skeleton className="w-[140px] md:w-[300px] aspect-2/3 rounded-xl shrink-0" />
             <div className="space-y-4 flex-1">
               <Skeleton className="h-4 md:h-10 w-3/4" />
               <Skeleton className="h-4 md:h-6 w-1/4" />
             </div>
           </div>
        </div>
      </div>
    );
  }

  if (!movie) return <div className="text-white text-center pt-20">Movie Not Found</div>;

  const backdropUrl = movie.backdrop_path ? `${TMDB_IMAGE_BASE_URL}/${IMAGE_SIZES.backdrop}${movie.backdrop_path}` : "";

  const ageRating = movie.adult ? "18+" : "All ages";

  return (
    <div className="min-h-screen bg-black font-sans text-white">
      {/* Backdrop Section */}
      <div className="w-full h-[50vh] md:h-[80vh]">
        <BackdropImage
          src={backdropUrl}
          className="h-full"
        >
          {/* Content Container */}
          <div className="max-w-7xl mx-auto px-4 h-full relative z-10 flex items-end">
            <div className="flex flex-row gap-4 md:gap-8 w-full -mb-16 md:mb-0">
              
              {/* Poster (Responsive) */}
              <div className="w-[120px] md:w-[300px] shrink-0 rounded-xl overflow-hidden shadow-2xl border-2 md:border-4 border-white/10">
                <MoviePoster posterPath={movie.poster_path} alt={movie.title} />
              </div>

              {/* Details (Right) */}
              <div className="flex-1 space-y-4 md:space-y-6 mb-2 md:mb-8">
                <div className="space-y-1 md:space-y-2">
                  <h1 className="text-xl md:text-5xl font-bold leading-tight line-clamp-2 md:line-clamp-none">{movie.title}</h1>
                  <div className="flex items-center gap-4 text-gray-300 text-xs md:text-base">
                    <span className="flex items-center gap-1 md:gap-2">
                       <CalendarIcon className="w-4 h-4 md:w-5 md:h-5" />
                       {formatDate(movie.release_date)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons (Desktop Only) */}
                <div className="hidden md:flex items-center gap-4">
                   <TrailerButton className="px-8 py-3 text-base" />
                   <FavoriteButton 
                    isFavorite={isFav} 
                    onClick={() => toggleFavorite(movie)}
                   />
                </div>

                {/* Info Stats Grid (Desktop Only) */}
                <div className="hidden md:grid grid-cols-3 gap-4 max-w-2xl mt-8">
                   <StatsCard 
                      icon={<StarIcon className="w-6 h-6 fill-yellow-500 text-yellow-500" />}
                      label="Rating"
                      value={`${formatRating(movie.vote_average)}/10`}
                   />
                   <StatsCard 
                      icon={<VideoCameraIcon className="w-6 h-6 text-white" />}
                      label="Genre"
                      value={<div className="truncate px-2">{movie.genres[0]?.name || "N/A"}</div>}
                   />
                   <StatsCard 
                      icon={<UserGroupIcon className="w-6 h-6 text-white" />}
                      label="Age Limit"
                      value={ageRating}
                   />
                </div>
              </div>
            </div>
          </div>
        </BackdropImage>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-24 pb-12 md:py-16 space-y-8 md:space-y-12">
         {/* Mobile Action Buttons & Stats */}
         <div className="md:hidden space-y-6">
            <div className="flex items-center gap-4">
                 <TrailerButton className="flex-1 w-full px-4 py-3 text-sm justify-center" />
                 <FavoriteButton 
                  isFavorite={isFav} 
                  onClick={() => toggleFavorite(movie)} 
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-md"
                 />
            </div>

            <div className="grid grid-cols-3 gap-3">
                 <StatsCard 
                    icon={<StarIcon className="w-5 h-5 text-yellow-500" />}
                    label="Rating"
                    value={`${formatRating(movie.vote_average)}/10`}
                    className="p-3 bg-white/5"
                 />
                 <StatsCard 
                    icon={<VideoCameraIcon className="w-5 h-5 text-white" />}
                    label="Genre"
                    value={<div className="truncate px-1">{movie.genres[0]?.name || "N/A"}</div>}
                    className="p-3 bg-white/5"
                 />
                 <StatsCard 
                    icon={<UserGroupIcon className="w-5 h-5 text-white" />}
                    label="Age Limit"
                    value={ageRating}
                    className="p-3 bg-white/5"
                 />
            </div>
         </div>

         {/* Overview */}
          <div className="w-full">
            <h3 className="text-3xl font-bold mb-4">Overview</h3>
            <p className="text-gray-300 leading-relaxed text-lg">
               {movie.overview}
            </p>
         </div>

         {/* Cast & Crew */}
         <div>
            <h3 className="text-3xl font-bold mb-8">Cast & Crew</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {movie.credits?.cast?.slice(0, 6).map((person) => (
                 <div key={`cast-${person.id}`} className="flex items-center gap-4">
                    <div className="w-16 h-22 aspect-2/3 rounded-lg overflow-hidden bg-zinc-800 shrink-0">
                       {person.profile_path ? (
                         <img src={`${TMDB_IMAGE_BASE_URL}/${IMAGE_SIZES.profile}${person.profile_path}`} alt={person.name} className="w-full h-full object-cover" />
                       ) : (
                         <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">N/A</div>
                       )}
                    </div>
                    <div>
                       <div className="text-lg font-bold text-white">{person.name}</div>
                       <div className="text-gray-400">{person.character}</div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}


