type ScreenGritProps = {
  className?: string;
};

export default function ScreenGrit({ className = "" }: ScreenGritProps) {
  return (
    <div
      aria-hidden
      className={`screen-grit pointer-events-none absolute inset-0 z-40 opacity-[0.05] ${className}`}
    />
  );
}
