interface PhotoScrimProps {
  className?: string;
}

export default function PhotoScrim({ className = "" }: PhotoScrimProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.32)_30%,rgba(0,0,0,0.38)_58%,rgba(0,0,0,0.8)_100%)] ${className}`}
    />
  );
}
