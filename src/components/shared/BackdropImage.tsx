import { cn } from "../../lib/utils";

interface BackdropImageProps {
  src: string;
  alt?: string;
  className?: string;
  children?: React.ReactNode;
}

export const BackdropImage = ({ src, alt, className, children }: BackdropImageProps) => {
  if (!src) return null;

  return (
    <div className={cn("relative w-full h-full", className)}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: `url(${src})` }}
        role="img"
        aria-label={alt}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black z-0" />
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-transparent to-black/80 z-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};
