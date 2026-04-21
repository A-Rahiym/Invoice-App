import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "destructive";
  fullWidth?: boolean;
}

export function Button({
  variant = "primary",
  className = "",
  fullWidth = false,
  ...props
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center
    rounded-full font-medium
    transition-all duration-200

    /* Responsive sizing */
    text-sm sm:text-base lg:text-lg
    px-4 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3

    /* Interaction */
    active:scale-[0.98]
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variantStyles = {
    primary: "btn-primary text-on-primary btn-primary-hover",
    secondary: "btn-secondary text-on-primary btn-secondary-hover",
    destructive: "btn-destructive text-on-primary btn-destructive-hover",
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    />
  );
}