import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'default' | 'card' | 'text' | 'avatar' | 'button';
}

export function LoadingSkeleton({ className, variant = 'default' }: LoadingSkeletonProps) {
  const baseClasses = 'animate-shimmer rounded-md bg-muted';
  
  const variantClasses = {
    default: 'h-4 w-full',
    card: 'h-32 w-full rounded-2xl',
    text: 'h-4 w-3/4',
    avatar: 'h-12 w-12 rounded-full',
    button: 'h-10 w-24 rounded-xl',
  };

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)} />
  );
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('p-4 bg-card rounded-2xl shadow-soft space-y-3', className)}>
      <div className="flex items-center gap-3">
        <LoadingSkeleton variant="avatar" />
        <div className="flex-1 space-y-2">
          <LoadingSkeleton className="h-4 w-2/3" />
          <LoadingSkeleton className="h-3 w-1/2" />
        </div>
      </div>
      <LoadingSkeleton className="h-20 w-full rounded-xl" />
    </div>
  );
}

export function ListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 bg-card rounded-2xl shadow-soft">
          <LoadingSkeleton variant="avatar" className="w-14 h-14 rounded-xl" />
          <div className="flex-1 space-y-2">
            <LoadingSkeleton className="h-4 w-3/4" />
            <LoadingSkeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="space-y-4">
      <LoadingSkeleton className="h-48 w-full rounded-3xl" />
      <div className="grid grid-cols-2 gap-3">
        <LoadingSkeleton className="h-24 rounded-2xl" />
        <LoadingSkeleton className="h-24 rounded-2xl" />
        <LoadingSkeleton className="h-24 rounded-2xl" />
        <LoadingSkeleton className="h-24 rounded-2xl" />
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="p-4 space-y-4">
      <LoadingSkeleton className="h-6 w-1/3" />
      <ListSkeleton count={4} />
    </div>
  );
}
