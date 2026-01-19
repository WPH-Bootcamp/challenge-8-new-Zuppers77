import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MagnifyingGlassIcon, XMarkIcon, StarIcon } from "@heroicons/react/24/outline";
import { useDebounce } from "../../hooks/useDebounce";
import { useSearchMovies } from "../../hooks/query/useSearchMovies";
import { useFavorites } from "../../hooks/useFavorites";
import { formatRating } from "../../lib/utils";
import { cn } from "../../lib/utils";
import { MoviePoster } from "./MoviePoster";

interface SearchBarProps {
  onSearch?: () => void;
  className?: string;
  autoFocus?: boolean;
  placeholder?: string;
}

export const SearchBar = ({ onSearch, className, autoFocus = false, placeholder = "Search Movie..." }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const debouncedQuery = useDebounce(query, 500);
  const navigate = useNavigate();
  const location = useLocation();
  const { favorites } = useFavorites();
  const isFavoritesPage = location.pathname === "/favorites";

  const { data: searchData, isLoading: isSearchLoading } = useSearchMovies(isFavoritesPage ? "" : debouncedQuery);
  
  const suggestions = isFavoritesPage 
    ? favorites.filter(m => m.title.toLowerCase().includes(debouncedQuery.toLowerCase())).slice(0, 5)
    : searchData?.pages[0]?.results.slice(0, 5) || [];

  const isLoading = isFavoritesPage ? false : isSearchLoading;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q") || "";
    if (query !== q) {
      setQuery(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, location.pathname]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setShowSuggestions(newQuery.trim().length > 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isFavoritesPage) {
       const targetPath = query.trim() ? `/favorites?q=${encodeURIComponent(query)}` : '/favorites';
       navigate(targetPath);
       setShowSuggestions(false);
       onSearch?.();
       return;
    }

    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setShowSuggestions(false);
      onSearch?.();
    }
  };

  const handleSuggestionClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
    setShowSuggestions(false);
    setQuery("");
    onSearch?.();
  };

  const clearSearch = () => {
    setQuery("");
    setShowSuggestions(false);
    if (isFavoritesPage) {
      navigate('/favorites');
      onSearch?.();
    }
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <form onSubmit={handleSubmit} className="relative group">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400 group-focus-within:text-white transition-colors" />
        <input
          type="text"
          autoFocus={autoFocus}
          placeholder={placeholder}
          value={query}
          onChange={handleQueryChange}
          onFocus={() => query.trim() && setShowSuggestions(true)}
          className={cn(
            "w-full bg-zinc-800/50 text-sm text-white pl-10 pr-8 py-2 md:py-4 rounded-full md:rounded-2xl border border-transparent focus:border-white/20 focus:bg-zinc-800 focus:outline-none transition-all placeholder:text-gray-500",
          )}
        />
        {query && (
           <button
             type="button"
             onClick={clearSearch}
             className="absolute right-3 top-1/2 -translate-y-1/2 bg-zinc-800/80 rounded-full p-1 text-gray-400 hover:text-white"
           >
             <XMarkIcon className="w-4 h-4" />
           </button>
        )}
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="fixed left-0 right-0 top-[60px] bottom-0 bg-black/95 backdrop-blur-md md:absolute md:inset-auto md:top-full md:mt-2 md:bg-zinc-900 md:border md:border-white/10 md:rounded-xl md:shadow-2xl overflow-y-auto md:overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200 w-full md:min-w-[280px]">
          {isLoading ? (
            <div className="p-4 text-center text-gray-400 text-sm">Searching...</div>
          ) : suggestions.length > 0 ? (
            <ul>
              {suggestions.map((movie) => (
                <li 
                  key={movie.id} 
                  onClick={() => handleSuggestionClick(movie.id)} 
                  className="flex items-center gap-3 p-3 hover:bg-white/5 cursor-pointer border-b border-white/5 last:border-0 transition-colors"
                >
                   <MoviePoster 
                     posterPath={movie.poster_path} 
                     alt={movie.title}
                     className="w-10 h-14 rounded shrink-0"
                   />
                   <div className="flex-1 min-w-0">
                     <h4 className="text-white text-sm font-medium truncate">{movie.title}</h4>
                     <div className="flex items-center gap-2 text-xs text-gray-400">
                       <span className="text-yellow-500 font-bold flex items-center">
                          <StarIcon className="w-3 h-3 mr-1" />
                          {formatRating(movie.vote_average)}
                       </span>
                       <span>•</span>
                       <span>{movie.release_date?.split('-')[0] || 'N/A'}</span>
                     </div>
                   </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-400 text-sm">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};
