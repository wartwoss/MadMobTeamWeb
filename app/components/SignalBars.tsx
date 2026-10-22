const BARS = ["h-[0.3em]", "h-[0.45em]", "h-[0.6em]", "h-[0.85em]"];

type SignalBarsProps = {
  className?: string;
};

export default function SignalBars({ className = "" }: SignalBarsProps) {
  return (
    <span
      className={`inline-flex items-end gap-[0.12em] ${className}`}
      aria-hidden="true"
    >
      {BARS.map((height, index) => (
        <span
          key={height}
          className={`w-[0.16em] origin-bottom animate-signal bg-orange-600 ${height}`}
          style={{ animationDelay: `${index * 0.15}s` }}
        />
      ))}
    </span>
  );
}
