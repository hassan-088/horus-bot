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
    <div className="relative min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main
        className={cn(
          'flex-1 animate-page-enter',
          !hasCinematicHero && 'pt-[calc(env(safe-area-inset-top)+4.75rem)] lg:pt-20',
        )}
      >
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
