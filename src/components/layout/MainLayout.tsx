import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { FloatingChatButton } from '@/components/chat/FloatingChatButton';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: ReactNode;
  hideNav?: boolean;
  hideChat?: boolean;
  className?: string;
}

// Public marketing site routes — show SiteHeader/SiteFooter, hide app nav/chat
const publicRoutes = ['/', '/about', '/experience', '/tickets-info', '/app', '/faq', '/contact', '/tickets-mine', '/book'];

// App-only pages that should NOT show bottom navigation
const noNavPages = ['/launch', '/onboarding', '/ar_view'];

// App-only pages that should NOT show the chat button
const noChatPages = ['/launch', '/onboarding', '/ar_view', '/qr_scan'];

export function MainLayout({ children, hideNav, hideChat, className }: MainLayoutProps) {
  const location = useLocation();
  const isPublic = publicRoutes.includes(location.pathname);

  if (isPublic) {
    return (
      <div className={cn('relative min-h-screen flex flex-col bg-background', className)}>
        <SiteHeader />
        <main className="flex-1 animate-page-enter">{children}</main>
        <SiteFooter />
      </div>
    );
  }

  const shouldShowNav = !hideNav && !noNavPages.includes(location.pathname);
  const shouldShowChat = !hideChat && !noChatPages.includes(location.pathname);

  return (
    <div className={cn('relative min-h-screen', className)}>
      <div className={cn('animate-page-enter', shouldShowNav && 'pb-20')}>{children}</div>
      {shouldShowChat && <FloatingChatButton />}
      {shouldShowNav && <BottomNav />}
    </div>
  );
}
