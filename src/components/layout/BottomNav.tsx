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
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-lg border-t border-border pb-safe shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map(({ path, icon: Icon, labelKey }) => {
          const isActive = location.pathname === path;
          
          return (
            <NavLink
              key={path}
              to={path}
              replace
              className={cn(
                'flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 min-w-[64px] relative group press-effect',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {/* Active indicator dot */}
              <div className={cn(
                'absolute -top-1 w-1 h-1 rounded-full bg-primary transition-all duration-300',
                isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
              )} />
              
              <div className="relative">
                <Icon 
                  className={cn(
                    'w-5 h-5 transition-all duration-300',
                    isActive && 'scale-110 drop-shadow-[0_0_8px_hsl(var(--primary)/0.4)]'
                  )} 
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {/* Hover glow effect */}
                <div className={cn(
                  'absolute inset-0 rounded-full bg-primary/20 blur-md transition-opacity duration-300',
                  isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                )} />
              </div>
              
              <span className={cn(
                'text-xs transition-all duration-300',
                isActive ? 'font-semibold' : 'font-medium'
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
