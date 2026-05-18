import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  steps: string[];
  currentIndex: number;
  progressLabel?: string;
}

export function BookingStepper({ steps, currentIndex, progressLabel }: Props) {
  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between gap-3 sm:hidden">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
            {progressLabel ?? `Step ${currentIndex + 1} of ${steps.length}`}
          </p>
          <p className="font-serif text-lg leading-tight text-foreground">{steps[currentIndex]}</p>
        </div>
        <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {Math.round(((currentIndex + 1) / steps.length) * 100)}%
        </span>
      </div>

      <ol className="flex w-full items-center gap-1.5 sm:gap-0">
        {steps.map((label, i) => {
          const done = i < currentIndex;
          const active = i === currentIndex;
          return (
            <li
              key={label}
              className={cn(
                'min-w-0 flex-1',
                i < steps.length - 1 ? 'sm:flex sm:flex-1 sm:items-center' : 'sm:flex-none',
              )}
            >
              <div className="flex min-w-0 shrink-0 flex-col items-center gap-1 sm:flex-row sm:gap-2">
                <div
                  className={cn(
                    'flex h-8 w-full min-w-0 items-center justify-center rounded-full border text-xs font-semibold transition-all duration-200 sm:w-8 sm:shrink-0',
                    done
                      ? 'border-primary/55 bg-primary/85 text-primary-foreground shadow-sm shadow-primary/15'
                      : active
                        ? 'border-primary/65 bg-primary/15 text-primary ring-2 ring-primary/20 shadow-sm shadow-primary/20'
                        : 'border-primary/15 bg-background/80 text-foreground/55',
                  )}
                  aria-label={label}
                >
                  {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </div>
                <span
                  className={cn(
                    'hidden max-w-24 truncate text-xs font-medium md:inline',
                    active ? 'text-foreground' : done ? 'text-foreground/70' : 'text-muted-foreground',
                  )}
                >
                  {label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <span
                  className={cn(
                    'hidden h-px min-w-3 flex-1 rounded-full sm:mx-2 sm:block',
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
