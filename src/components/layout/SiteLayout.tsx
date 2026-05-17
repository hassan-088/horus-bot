import { Outlet } from 'react-router-dom';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';

/**
 * Public marketing + booking layout.
 *
 * IMPORTANT: This layout intentionally does NOT include any app-shell
 * elements (no BottomNav, no FloatingChatButton, no mobile-app chrome).
 * Every route in the production website is rendered through this layout.
 */
export function SiteLayout() {
  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 animate-page-enter">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
