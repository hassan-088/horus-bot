import { NavLink, useLocation } from 'react-router-dom';
import { Home, Map, Compass, Ticket, Settings } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/home', icon: Home, labelKey: 'home' as const },
  { path: '/map', icon: Map, labelKey: 'map' as const },
  { path: '/progress', icon: Compass, labelKey: 'tour' as const },
  { path: '/tickets', icon: Ticket, labelKey: 'tickets' as const },
  { path: '/settings', icon: Settings, labelKey: 'settings' as const },
];

export function BottomNav() {
  const { language } = useApp();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border pb-safe">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map(({ path, icon: Icon, labelKey }) => {
          const isActive = location.pathname === path;
          
          return (
            <NavLink
              key={path}
              to={path}
              replace
              className={cn(
                'flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 min-w-[64px]',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon 
                className={cn(
                  'w-5 h-5 transition-transform duration-200',
                  isActive && 'scale-110'
                )} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={cn(
                'text-xs font-medium transition-all duration-200',
                isActive && 'font-semibold'
              )}>
                {t(labelKey, language)}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
