import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { FloatingChatButton } from '@/components/chat/FloatingChatButton';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: ReactNode;
  hideNav?: boolean;
  hideChat?: boolean;
  className?: string;
}

// Pages that should NOT show bottom navigation
const noNavPages = ['/', '/onboarding', '/ar_view'];

// Pages that should NOT show the chat button
const noChatPages = ['/', '/onboarding', '/ar_view', '/qr_scan'];

export function MainLayout({ children, hideNav, hideChat, className }: MainLayoutProps) {
  const location = useLocation();
  
  const shouldShowNav = !hideNav && !noNavPages.includes(location.pathname);
  const shouldShowChat = !hideChat && !noChatPages.includes(location.pathname);

  return (
    <div className={cn('relative min-h-screen', className)}>
      {/* Page Content */}
      <div className={cn(
        'animate-page-enter',
        shouldShowNav && 'pb-20'
      )}>
        {children}
      </div>

      {/* Floating Chat Button - positioned above nav */}
      {shouldShowChat && <FloatingChatButton />}

      {/* Bottom Navigation - fixed at bottom */}
      {shouldShowNav && <BottomNav />}
    </div>
  );
}
