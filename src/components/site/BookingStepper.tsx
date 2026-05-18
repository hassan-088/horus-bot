import { cn } from '@/lib/utils';

interface Props {
  steps: string[];
  currentIndex: number;
}

export function BookingStepper({ steps, currentIndex }: Props) {
  return (
    <div className="w-full">
      <ol className="flex w-full items-center gap-1.5 md:gap-2">
        {steps.map((label, i) => {
          const done = i < currentIndex;
          const active = i === currentIndex;
          return (
            <li
              key={label}
              className={cn(
                'min-w-0 flex-1',
              )}
            >
              <button
                type="button"
                className={cn(
                  'h-8 w-full cursor-default rounded-full border px-0 text-xs font-semibold transition-colors md:h-10 md:px-3',
                  active
                    ? 'border-primary/70 bg-primary text-primary-foreground shadow-[0_14px_35px_-18px_hsl(var(--primary)/0.85)]'
                    : done
                      ? 'border-primary/25 bg-primary/15 text-primary'
                      : 'border-primary/15 bg-background/45 text-foreground/55',
                )}
                aria-current={active ? 'step' : undefined}
                aria-label={label}
                tabIndex={-1}
              >
                <span
                  className={cn(
                    'md:hidden',
                    active && 'tracking-wide',
                  )}
                >
                  {i + 1}
                </span>
                <span className="hidden min-w-0 truncate md:block">{label}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
