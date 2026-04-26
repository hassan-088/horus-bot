import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  steps: string[];
  currentIndex: number;
}

export function BookingStepper({ steps, currentIndex }: Props) {
  return (
    <div className="w-full overflow-x-auto">
      <ol className="flex items-center gap-2 min-w-max px-1">
        {steps.map((label, i) => {
          const done = i < currentIndex;
          const active = i === currentIndex;
          return (
            <li key={label} className="flex items-center gap-2">
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors',
                  done
                    ? 'bg-primary text-primary-foreground'
                    : active
                      ? 'bg-primary/20 text-primary ring-2 ring-primary'
                      : 'bg-muted text-muted-foreground',
                )}
              >
                {done ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span
                className={cn(
                  'text-xs font-medium hidden sm:inline',
                  active ? 'text-foreground' : 'text-muted-foreground',
                )}
              >
                {label}
              </span>
              {i < steps.length - 1 && (
                <span className={cn('h-px w-6 sm:w-10', done ? 'bg-primary' : 'bg-border')} />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
