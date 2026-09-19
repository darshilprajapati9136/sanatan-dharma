import type {SVGProps} from 'react';

export type IconName =
  | 'sunrise'
  | 'sunset'
  | 'moon'
  | 'clock'
  | 'home'
  | 'book'
  | 'search'
  | 'chat'
  | 'bookmark'
  | 'user'
  | 'menu'
  | 'close'
  | 'chevronDown'
  | 'chevronRight'
  | 'globe'
  | 'sparkles'
  | 'check'
  | 'logout'
  | 'arrowRight'
  | 'calendar'
  | 'info'
  | 'flame'
  | 'lotus'
  | 'temple';

const paths: Record<IconName, React.ReactNode> = {
  sunrise: (
    <>
      <path d="M3 17h18M5 21h14M7 17a5 5 0 0 1 10 0M12 2v4M3 9l3 2m15-2-3 2M9 5l3-3 3 3" />
    </>
  ),
  sunset: (
    <>
      <path d="M3 17h18M5 21h14M7 17a5 5 0 0 1 10 0M12 2v6M3 9l3 2m15-2-3 2M9 5l3 3 3-3" />
    </>
  ),
  moon: <path d="M20 14a8 8 0 0 1-10-10 9 9 0 1 0 10 10Z" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  home: (
    <>
      <path d="M3 10.5 12 3.75l9 6.75" />
      <path d="M5.25 9.75v10.5h13.5V9.75" />
      <path d="M9.75 20.25v-6h4.5v6" />
    </>
  ),
  book: (
    <>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.35-4.35" />
    </>
  ),
  chat: (
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  ),
  bookmark: <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />,
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
    </>
  ),
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  chevronRight: <path d="m9 6 6 6-6 6" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 4l1.6 3.9L17.5 9.5l-3.9 1.6L12 15l-1.6-3.9L6.5 9.5l3.9-1.6z" />
      <path d="M18.5 14.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z" />
    </>
  ),
  check: <path d="M4 12.5 9.5 18 20 6.5" />,
  logout: (
    <>
      <path d="M9 3.5h10a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H9" />
      <path d="M15 12H3" />
      <path d="m6.5 8.5 3.5 3.5-3.5 3.5" />
    </>
  ),
  arrowRight: <path d="M4 12h16m-6-6 6 6-6 6" />,
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9.5h18M8 3v4M16 3v4" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 7.5h.01" />
    </>
  ),
  flame: (
    <path d="M12 3c1 2.5 4.5 4.8 4.5 8.5a4.5 4.5 0 0 1-9 0c0-1.5.7-2.7 1.7-3.8.2 1 .9 1.8 1.8 2.2-.2-2.3.3-4.9 1-6.9z" />
  ),
  lotus: (
    <>
      <path d="M12 4c1.5 2 1.5 5 0 7-1.5-2-1.5-5 0-7z" />
      <path d="M5 8c2.5.5 4.5 2.5 5 5-2.5-.5-4.5-2.5-5-5z" />
      <path d="M19 8c-2.5.5-4.5 2.5-5 5 2.5-.5 4.5-2.5 5-5z" />
      <path d="M4 16c2.5 2 5 3 8 3s5.5-1 8-3" />
    </>
  ),
  temple: (
    <>
      <path d="M3 9.5 12 4l9 5.5" />
      <path d="M5.5 9.5V18M10 9.5V18M14 9.5V18M18.5 9.5V18" />
      <path d="M3 18h18" />
      <path d="M4.5 21h15" />
    </>
  )
};

export function Icon({
  name,
  className
}: {
  name: IconName;
  className?: string;
} & Omit<SVGProps<SVGSVGElement>, 'name'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className ?? 'h-5 w-5'}
    >
      {paths[name]}
    </svg>
  );
}
