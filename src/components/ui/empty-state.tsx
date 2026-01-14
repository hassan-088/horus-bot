import { LucideIcon } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center py-16 px-8 text-center animate-fade-in-up',
      className
    )}>
      {/* Icon with subtle animation */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl animate-pulse" />
        <div className="relative w-20 h-20 bg-muted rounded-full flex items-center justify-center">
          <Icon className="w-10 h-10 text-muted-foreground" />
        </div>
      </div>
      
      {/* Text */}
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground max-w-xs">{description}</p>
      )}
      
      {/* Action */}
      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-6 rounded-xl">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
