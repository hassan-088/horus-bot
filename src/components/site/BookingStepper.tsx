import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  steps: string[];
  currentIndex: number;
}

export function BookingStepper({ steps, currentIndex }: Props) {
  return (
    <div className="w-full">
      <ol className="flex w-full items-center">
        {steps.map((label, i) => {
          const done = i < currentIndex;
          const active = i === currentIndex;
          return (
            <li key={label} className={cn('flex min-w-0 items-center', i < steps.length - 1 ? 'flex-1' : 'flex-none')}>
              <div className="flex shrink-0 items-center gap-2">
                <div
                  className={cn(
                    'flex shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold shadow-sm transition-all duration-200',
                    done
                      ? 'h-7 w-7 border-primary/55 bg-primary/85 text-primary-foreground shadow-primary/15'
                      : active
                        ? 'h-8 w-8 border-primary/60 bg-primary/15 text-primary ring-2 ring-primary/20 shadow-primary/20'
                        : 'h-7 w-7 border-primary/18 bg-background/60 text-foreground/55',
                  )}
                >
                  {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </div>
                <span
                  className={cn(
                    'hidden max-w-24 truncate text-xs font-medium sm:inline',
                    active ? 'text-foreground' : done ? 'text-foreground/70' : 'text-muted-foreground',
                  )}
                >
                  {label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <span
                  className={cn(
                    'mx-1.5 h-px min-w-3 flex-1 rounded-full sm:mx-2',
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
