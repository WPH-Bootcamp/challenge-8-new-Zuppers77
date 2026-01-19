import { Button } from "../ui/Button";
import { cn } from "../../lib/utils";

interface LoadMoreButtonProps {
  onClick: () => void;
  isLoading: boolean;
  className?: string;
}

export const LoadMoreButton = ({ onClick, isLoading, className }: LoadMoreButtonProps) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-64 bg-linear-to-t from-black via-black/80 to-transparent flex items-center justify-center pt-20 z-10 pointer-events-none">
      <Button 
        variant="outline" 
        onClick={onClick}
        disabled={isLoading}
        className={cn(
          "w-full md:w-auto min-w-[200px] pointer-events-auto bg-black/50 backdrop-blur-sm border-white/20 hover:bg-white/10",
          isLoading && "opacity-70 cursor-not-allowed",
          className
        )}
      >
        {isLoading ? "Loading..." : "Load More"}
      </Button>
    </div>
  );
};
