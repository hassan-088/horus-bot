import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  withBottomNav?: boolean;
  background?: 'default' | 'home' | 'map';
}

export function PageContainer({
  children,
  className,
  withBottomNav = true,
  background = 'default',
}: PageContainerProps) {
  const bgClass = {
    default: 'bg-background',
    home: 'bg-home-bg',
    map: 'bg-map-bg',
  }[background];

  return (
    <main
      className={cn(
        'min-h-screen',
        bgClass,
        withBottomNav && 'pb-20',
        className
      )}
    >
      {children}
    </main>
  );
}
