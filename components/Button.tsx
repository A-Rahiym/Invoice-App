import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function Button({ variant = "primary", className = "", type = "button", ...props }: ButtonProps) {
  const baseClasses = "px-4 py-2 rounded-full transition";
  const variantClasses =
    variant === "primary"
      ? "bg-primary text-on-primary hover:bg-primary-hover"
      : "bg-secondary text-on-primary hover:bg-secondary-hover";

  return <button type={type} className={`${baseClasses} ${variantClasses} ${className} flex items-center justify-center`} {...props} />;
}