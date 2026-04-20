import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  const baseClasses = "px-4 py-2 rounded-full transition";
  const variantClasses =
    variant === "primary"
      ? "bg-primary text-white hover:bg-primary-hover"
      : "bg-secondary text-white hover:bg-danger-hover";

  return <button className={`${baseClasses} ${variantClasses} ${className}`} {...props} />;
}