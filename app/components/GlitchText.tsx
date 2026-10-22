type GlitchTextProps = {
  children: string;
  className?: string;
};

export default function GlitchText({ children, className = "" }: GlitchTextProps) {
  return (
    <span
      className={`glitch ${className}`}
      data-text={children}
      aria-label={children}
    >
      <span aria-hidden="true">{children}</span>
    </span>
  );
}
