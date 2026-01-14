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
    <nav className="fixed bottom-0 left-0 right-0 z-40">
      {/* Glass background */}
      <div className="absolute inset-0 glass-premium border-t border-border/30" />
      
      {/* Nav content */}
      <div className="relative flex items-center justify-around h-18 max-w-lg mx-auto pb-safe">
        {navItems.map(({ path, icon: Icon, labelKey }) => {
          const isActive = location.pathname === path;
          
          return (
            <NavLink
              key={path}
              to={path}
              replace
              className={cn(
                'flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300 min-w-[60px] relative group press-effect',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {/* Active background pill */}
              <div className={cn(
                'absolute inset-0 rounded-2xl transition-all duration-300',
                isActive 
                  ? 'bg-primary/10 scale-100 opacity-100' 
                  : 'bg-primary/5 scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100'
              )} />
              
              {/* Icon container */}
              <div className="relative z-10">
                <Icon 
                  className={cn(
                    'w-5 h-5 transition-all duration-300',
                    isActive && 'scale-110'
                  )} 
                  strokeWidth={isActive ? 2.5 : 2}
                />
                
                {/* Active glow */}
                {isActive && (
                  <div className="absolute inset-0 rounded-full bg-primary/30 blur-md -z-10" />
                )}
              </div>
              
              {/* Label */}
              <span className={cn(
                'relative z-10 text-2xs transition-all duration-300',
                isActive ? 'font-semibold' : 'font-medium'
              )}>
                {t(labelKey, language)}
              </span>
              
              {/* Active indicator dot */}
              <div className={cn(
                'absolute -top-1 w-1.5 h-1.5 rounded-full bg-primary transition-all duration-300',
                isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
              )} />
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
