import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { HorusAvatar } from './HorusAvatar';

interface HorusMessageProps {
  children: ReactNode;
  variant?: 'greeting' | 'suggestion' | 'info' | 'action';
  showAvatar?: boolean;
  className?: string;
  animated?: boolean;
}

const variantStyles = {
  greeting: 'bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20',
  suggestion: 'bg-accent/10 border-accent/30',
  info: 'bg-secondary border-border',
  action: 'bg-gradient-to-r from-primary to-horus-glow text-primary-foreground border-transparent',
};

export function HorusMessage({
  children,
  variant = 'greeting',
  showAvatar = true,
  className,
  animated = true,
}: HorusMessageProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 rounded-2xl border',
        variantStyles[variant],
        animated && 'animate-fade-in-up',
        className
      )}
    >
      {showAvatar && (
        <HorusAvatar size="sm" glowing={variant === 'action'} />
      )}
      <div className="flex-1 min-w-0">
        {typeof children === 'string' ? (
          <p className={cn(
            'text-sm leading-relaxed',
            variant === 'action' ? 'text-primary-foreground' : 'text-foreground'
          )}>
            {children}
          </p>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
