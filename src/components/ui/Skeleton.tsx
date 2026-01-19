interface SkeletonProps {
  className?: string;
  variant?: "rect" | "circle"; 
}

export const Skeleton = ({ className = "", variant = "rect" }: SkeletonProps) => {
  const baseStyles = "animate-pulse bg-zinc-800";
  const shapes = {
    rect: "rounded-md",
    circle: "rounded-full",
  };

  return <div className={`${baseStyles} ${shapes[variant]} ${className}`} />;
};
