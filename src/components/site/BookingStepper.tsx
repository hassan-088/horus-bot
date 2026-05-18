import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  steps: string[];
  currentIndex: number;
}

export function BookingStepper({ steps, currentIndex }: Props) {
  return (
    <div className="w-full overflow-x-auto pb-1">
      <ol className="flex min-w-max items-center gap-1.5 px-0.5 sm:gap-2">
        {steps.map((label, i) => {
          const done = i < currentIndex;
          const active = i === currentIndex;
          return (
            <li key={label} className="flex items-center gap-1.5 sm:gap-2">
              <div
                className={cn(
                  'flex shrink-0 items-center justify-center rounded-full border text-xs font-semibold shadow-sm transition-all duration-200',
                  done
                    ? 'h-7 w-7 border-primary/60 bg-primary/85 text-primary-foreground shadow-primary/15'
                    : active
                      ? 'h-8 w-8 border-primary/55 bg-primary/15 text-primary ring-2 ring-primary/20 shadow-primary/20'
                      : 'h-7 w-7 border-primary/15 bg-background/55 text-foreground/55',
                )}
              >
                {done ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span
                className={cn(
                  'hidden text-xs font-medium sm:inline',
                  active ? 'text-foreground' : done ? 'text-foreground/70' : 'text-muted-foreground',
                )}
              >
                {label}
              </span>
              {i < steps.length - 1 && (
                <span
                  className={cn(
                    'h-px w-5 rounded-full sm:w-9',
                    done
                      ? 'bg-gradient-to-r from-primary/80 to-primary/35'
                      : active
                        ? 'bg-gradient-to-r from-primary/35 to-primary/10'
                        : 'bg-primary/12',
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
