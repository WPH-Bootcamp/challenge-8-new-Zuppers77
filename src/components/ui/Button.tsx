import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
}

export const Button = ({
  className = "",
  variant = "primary",
  size = "md",
  icon,
  children,
  ...props
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-red-600 text-white hover:bg-red-700 border border-transparent",
    outline: "bg-transparent border border-white/30 text-white hover:bg-white/10",
    ghost: "bg-transparent text-gray-300 hover:text-white hover:bg-white/5",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-6 py-3 gap-2.5",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      {children}
    </button>
  );
};
