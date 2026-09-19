'use client';
import type {ComponentProps} from 'react';
import {Link, usePathname} from '@/i18n/navigation';
/** Shared current-page state and close-on-navigation behavior for the mobile menu. */
export function NavigationLink(props: ComponentProps<typeof Link>) {
  const pathname = usePathname();
  const href =
    typeof props.href === 'string' ? props.href : props.href.pathname;
  const active =
    href === '/'
      ? pathname === '/'
      : Boolean(href && (pathname === href || pathname.startsWith(`${href}/`)));
  return (
    <Link
      {...props}
      aria-current={active ? 'page' : undefined}
      onClick={(event) => {
        props.onClick?.(event);
        if (!event.defaultPrevented)
          event.currentTarget.closest('details')?.removeAttribute('open');
      }}
    />
  );
}
