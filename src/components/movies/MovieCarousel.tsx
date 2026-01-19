import { useRef, useState, useEffect } from "react";
import type { Movie } from "../../types/movie";
import { MovieCard } from "./MovieCard";
import { CarouselArrow } from "../shared/CarouselArrow";

interface MovieCarouselProps {
  title: string;
  movies: Movie[];
}

export const MovieCarousel = ({ title, movies }: MovieCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [movies]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === "left" ? -(current.offsetWidth / 2) : (current.offsetWidth / 2);
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="py-2 space-y-4 group/carousel relative">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{title}</h2>
      </div>

      <div className="relative">
        <div className="absolute inset-0 max-w-7xl mx-auto pointer-events-none px-4 z-10">
          {/* Left Arrow */}
          <CarouselArrow 
            direction="left" 
            onClick={() => scroll("left")} 
            visible={canScrollLeft} 
          />

          {/* Right Arrow */}
          <CarouselArrow 
            direction="right" 
            onClick={() => scroll("right")} 
            visible={canScrollRight} 
          />
        </div>

        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex overflow-x-auto gap-x-4 md:gap-x-6 gap-y-6 md:gap-y-12 snap-x snap-mandatory scrollbar-hide max-w-7xl mx-auto px-4 scroll-px-4 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {movies.map((movie, index) => (
            <div key={movie.id} className="min-w-[160px] md:min-w-[230px] snap-start">
              <MovieCard movie={movie} rank={index + 1} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
