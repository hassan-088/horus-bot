import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  withBottomNav?: boolean;
  withPadding?: boolean;
  background?: 'default' | 'home' | 'map' | 'gradient';
}

export function PageContainer({
  children,
  className,
  withBottomNav = true,
  withPadding = false,
  background = 'default',
}: PageContainerProps) {
  const bgClass = {
    default: 'bg-background',
    home: 'bg-home-bg',
    map: 'bg-map-bg',
    gradient: 'bg-gradient-sand',
  }[background];

  return (
    <main
      className={cn(
        'min-h-screen relative',
        bgClass,
        withBottomNav && 'pb-24',
        withPadding && 'px-4',
        className
      )}
    >
      {/* Subtle pattern overlay for texture */}
      <div className="absolute inset-0 hieroglyph-pattern opacity-30 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </main>
  );
}
