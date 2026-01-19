import { useState } from "react";
import { cn } from "../../lib/utils";
import { TMDB_IMAGE_BASE_URL, IMAGE_SIZES } from "../../lib/constants";
import { Skeleton } from "../ui/Skeleton";

interface MoviePosterProps {
  posterPath: string | null;
  alt: string;
  className?: string;
}

export const MoviePoster = ({ posterPath, alt, className }: MoviePosterProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const src = posterPath ? `${TMDB_IMAGE_BASE_URL}/${IMAGE_SIZES.poster}${posterPath}` : null;

  return (
    <div className={cn("relative aspect-2/3 bg-zinc-800 overflow-hidden", className)}>
      {isLoading && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}
      
      {src && !error ? (
        <img
          src={src}
          alt={alt}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            isLoading ? "opacity-0" : "opacity-100"
          )}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setError(true);
          }}
        />
      ) : (
        !isLoading && (
          <div className="flex items-center justify-center w-full h-full text-zinc-500 text-xs text-center p-2">
            No Image
          </div>
        )
      )}
    </div>
  );
};
