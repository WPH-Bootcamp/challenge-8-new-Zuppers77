import type { HTMLAttributes } from "react";

export const Card = ({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`relative overflow-hidden rounded-xl ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
