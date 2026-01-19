import { useFavorites } from "../hooks/useFavorites";
import { MovieList } from "../components/movies/MovieList";
import { EmptyState } from "../components/ui/EmptyState";
import DataNotFound from "../assets/images/data-not-found.png";

import { useSearchParams } from "react-router-dom";

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const filteredFavorites = favorites.filter(movie => 
    movie.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black pt-32 font-sans text-white">
      <div className="max-w-7xl mx-auto px-4">
        {filteredFavorites.length > 0 ? (
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Favorites </h1>
            {query && <h2 className="text-md md:text-xl text-gray-400">Found {filteredFavorites.length} results</h2>}
            <div className="flex flex-col">
              {filteredFavorites.map((movie) => (
                <MovieList
                  key={movie.id}
                  movie={movie}
                  isFavorite={true}
                  onToggleFavorite={() => toggleFavorite(movie)}
                />
              ))}
            </div>
          </div>
        ) : (
          <EmptyState
            image={DataNotFound}
            title={query ? "No match found" : "Data Empty"}
            description={query ? `No favorite movies match "${query}"` : "You don't have a favorite movie yet"}
            actionLabel="Explore Movie"
            actionLink="/"
          />
        )}
      </div>
    </div>
  );
}
