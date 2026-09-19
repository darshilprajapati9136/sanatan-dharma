import {getTranslations} from 'next-intl/server';
import {NavigationLink as Link} from './navigation-link';
import {Icon, type IconName} from '@/components/ui/icon';

const items = [
  {href: '/', key: 'today', icon: 'home'},
  {href: '/learn', key: 'learn', icon: 'book'},
  {href: '/search', key: 'search', icon: 'search'},
  {href: '/ask', key: 'askDharma', icon: 'chat'},
  {href: '/practise', key: 'practise', icon: 'flame'}
] as const;

export async function MobileNav() {
  const t = await getTranslations('nav');

  return (
    <nav
      aria-label="Mobile primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur md:hidden"
    >
      <div className="mx-auto grid max-w-md grid-cols-5 px-1 pb-[env(safe-area-inset-bottom)]">
        {items.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            aria-label={t(item.key)}
            className="flex flex-col items-center gap-1 py-2.5 text-foreground transition-colors active:opacity-70"
          >
            <Icon name={item.icon as IconName} className="h-5 w-5" />
            <span className="text-[0.65rem] font-medium">{t(item.key)}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}