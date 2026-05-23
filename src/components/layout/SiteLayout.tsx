import { Outlet, useLocation } from 'react-router-dom';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';
import { cn } from '@/lib/utils';

const cinematicRoutes = new Set(['/', '/experience', '/app', '/about']);

/**
 * Public marketing + booking layout.
 *
 * IMPORTANT: This layout intentionally does NOT include any app-shell
 * elements (no BottomNav, no FloatingChatButton, no mobile-app chrome).
 * Every route in the production website is rendered through this layout.
 */
export function SiteLayout() {
  const { pathname } = useLocation();
  const hasCinematicHero = cinematicRoutes.has(pathname);

  return (
    <div className="relative flex min-h-screen w-full max-w-full flex-col overflow-x-clip bg-background">
      <SiteHeader />
      <main
        className={cn(
          'min-w-0 flex-1 animate-page-enter',
          !hasCinematicHero && 'pt-[calc(env(safe-area-inset-top)+4.75rem)] lg:pt-20',
        )}
      >
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
