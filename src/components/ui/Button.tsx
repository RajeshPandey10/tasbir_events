import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";

type Variant = "primary" | "outline" | "ghost" | "white";
type Size = "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary: "bg-coral text-white hover:bg-coral-deep",
  outline: "border border-current text-inherit hover:bg-white/10",
  ghost: "text-ink/70 hover:text-coral",
  white: "bg-white text-coral hover:bg-ivory",
};

const sizeClasses: Record<Size, string> = {
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

interface SharedProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

interface ButtonAsLink extends SharedProps {
  href: string;
}

interface ButtonAsButton extends SharedProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: undefined;
}

type ButtonProps = ButtonAsLink | ButtonAsButton;

const baseClasses = "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", className = "", children, ...rest },
  ref
) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if ("href" in rest && rest.href) {
    return (
      <Link href={rest.href} className={classes}>
        {children}
      </Link>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button ref={ref} className={`${classes} disabled:cursor-not-allowed disabled:opacity-60`} {...buttonRest}>
      {children}
    </button>
  );
});

export default Button;
