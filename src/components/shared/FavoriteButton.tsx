import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { cn } from "../../lib/utils";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
}

export const FavoriteButton = ({ isFavorite, onClick, className }: FavoriteButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group/btn max-content p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-colors shrink-0",
        className
      )}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? (
        <HeartIconSolid className="w-5 h-5 text-red-500" />
      ) : (
        <HeartIcon className="w-5 h-5 text-white group-hover/btn:text-red-500 transition-colors" />
      )}
    </button>
  );
};
