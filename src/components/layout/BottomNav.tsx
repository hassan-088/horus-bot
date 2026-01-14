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
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 bg-card/98 backdrop-blur-xl border-t border-border/50 shadow-[0_-4px_30px_-5px_rgba(0,0,0,0.15)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map(({ path, icon: Icon, labelKey }) => {
          // Check for exact match or if current path starts with the nav path
          const isActive = location.pathname === path || 
            (path !== '/home' && location.pathname.startsWith(path));
          
          return (
            <NavLink
              key={path}
              to={path}
              className={cn(
                'relative flex flex-col items-center justify-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-300 min-w-[60px] group',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground active:scale-95'
              )}
            >
              {/* Active background */}
              <div className={cn(
                'absolute inset-0 rounded-xl bg-primary/10 transition-all duration-300',
                isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              )} />
              
              {/* Icon container */}
              <div className="relative z-10">
                <Icon 
                  className={cn(
                    'w-5 h-5 transition-all duration-300',
                    isActive && 'drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]'
                  )} 
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </div>
              
              {/* Label */}
              <span className={cn(
                'relative z-10 text-[10px] transition-all duration-300 leading-tight',
                isActive ? 'font-semibold' : 'font-medium'
              )}>
                {t(labelKey, language)}
              </span>

              {/* Active indicator dot */}
              <div className={cn(
                'absolute -bottom-0.5 w-1 h-1 rounded-full bg-primary transition-all duration-300',
                isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
              )} />
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
