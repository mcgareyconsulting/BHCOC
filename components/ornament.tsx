export function Ornament({
  className = "",
  color = "#C9A14A"
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      className={className}
      width="80"
      height="20"
      viewBox="0 0 80 20"
      fill="none"
      aria-hidden
    >
      <path
        d="M0 10 H30"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M50 10 H80"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="36" cy="10" r="2.2" fill={color} />
      <path
        d="M40 4 L44 10 L40 16 L36 10 Z"
        fill="none"
        stroke={color}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="44" cy="10" r="2.2" fill={color} />
    </svg>
  );
}
