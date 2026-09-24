/** Original vector mark: a rising sun held by three lotus petals. */
export function BrandMark({className = ''}: {className?: string}) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={`brand-mark ${className}`}
    >
      <rect x="1" y="1" width="46" height="46" rx="15" fill="currentColor" />
      <g
        stroke="#f5e4c2"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M24 34c-7-4-9-10 0-19 9 9 7 15 0 19Z" />
        <path d="M24 34C15 34 10 29 9 22c7 0 12 4 15 12Zm0 0c9 0 14-5 15-12-7 0-12 4-15 12Z" />
        <path d="M16 38h16M24 8v3M14 12l2 2m18-2-2 2" />
        <path d="M19 14a7 7 0 0 1 10 0" />
      </g>
    </svg>
  );
}
