import type {SVGProps} from 'react';

export type IconName =
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
  | 'info';

const paths: Record<IconName, React.ReactNode> = {
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
  chat: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
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