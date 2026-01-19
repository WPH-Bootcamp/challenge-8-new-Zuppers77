import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { cn } from "../../lib/utils";

interface CarouselArrowProps {
  direction: "left" | "right";
  onClick: () => void;
  visible: boolean;
  className?: string;
}

export const CarouselArrow = ({ direction, onClick, visible, className }: CarouselArrowProps) => {
  const isLeft = direction === "left";
  const Icon = isLeft ? ChevronLeftIcon : ChevronRightIcon;

  return (
    <div 
      className={cn(
        "absolute top-0 bottom-0 w-24 z-20 flex items-center transition-opacity duration-300 pointer-events-none",
        isLeft ? "left-0 bg-gradient-to-r justify-start" : "right-0 bg-gradient-to-l justify-end",
        "from-black to-transparent",
        visible ? "opacity-100" : "opacity-0",
        className
      )}
    >
      <button 
        onClick={onClick}
        disabled={!visible}
        className={cn(
          "pointer-events-auto p-3 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm border border-white/10 transition-all",
          isLeft ? "ml-2" : "mr-2",
          visible ? "visible scale-100" : "invisible scale-90"
        )}
        aria-label={isLeft ? "Scroll left" : "Scroll right"}
      >
        <Icon className="w-6 h-6" />
      </button>
    </div>
  );
};
