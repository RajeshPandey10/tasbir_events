import { ReactNode } from "react";

const fieldClasses =
  "rounded-md border border-blush bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-coral";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  children: ReactNode;
  className?: string;
}

export function FormField({ label, htmlFor, children, className = "" }: FormFieldProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={htmlFor} className="text-sm text-ink/70">
        {label}
      </label>
      {children}
    </div>
  );
}

export function fieldInputClasses(extra = ""): string {
  return `${fieldClasses} ${extra}`;
}
