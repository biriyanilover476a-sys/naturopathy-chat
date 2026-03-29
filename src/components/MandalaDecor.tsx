const MandalaDecor = ({ className = "", size = 120 }: { className?: string; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    className={`opacity-[0.12] ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outer circle */}
    <circle cx="60" cy="60" r="58" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="60" cy="60" r="28" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="60" cy="60" r="16" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="60" cy="60" r="6" fill="currentColor" fillOpacity="0.3" />
    {/* Petals */}
    {Array.from({ length: 12 }).map((_, i) => (
      <g key={i} transform={`rotate(${i * 30} 60 60)`}>
        <ellipse cx="60" cy="20" rx="6" ry="14" stroke="currentColor" strokeWidth="0.5" fill="currentColor" fillOpacity="0.04" />
        <line x1="60" y1="10" x2="60" y2="52" stroke="currentColor" strokeWidth="0.3" />
      </g>
    ))}
    {/* Inner petals */}
    {Array.from({ length: 8 }).map((_, i) => (
      <g key={`inner-${i}`} transform={`rotate(${i * 45 + 22.5} 60 60)`}>
        <ellipse cx="60" cy="34" rx="4" ry="10" stroke="currentColor" strokeWidth="0.5" fill="currentColor" fillOpacity="0.06" />
      </g>
    ))}
    {/* Dots */}
    {Array.from({ length: 16 }).map((_, i) => {
      const angle = (i * 22.5 * Math.PI) / 180;
      return (
        <circle
          key={`dot-${i}`}
          cx={60 + 46 * Math.cos(angle)}
          cy={60 + 46 * Math.sin(angle)}
          r="1.5"
          fill="currentColor"
          fillOpacity="0.4"
        />
      );
    })}
  </svg>
);

export default MandalaDecor;
