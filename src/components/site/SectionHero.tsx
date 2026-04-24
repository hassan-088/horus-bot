import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionHeroProps {
  label?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  align?: 'center' | 'start';
  className?: string;
  children?: ReactNode;
}

export function SectionHero({
  label,
  title,
  subtitle,
  actions,
  align = 'center',
  className,
  children,
}: SectionHeroProps) {
  return (
    <section className={cn('relative overflow-hidden', className)}>
      {/* Cinematic gold radial wash */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
          style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.35), transparent 60%)' }}
        />
      </div>

      <div
        className={cn(
          'mx-auto max-w-5xl px-4 md:px-8 py-20 md:py-28',
          align === 'center' ? 'text-center' : 'text-start'
        )}
      >
        {label && <div className="section-label mb-5">{label}</div>}
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight text-foreground">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-lg md:text-xl leading-relaxed text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        {actions && (
          <div className={cn('mt-10 flex flex-wrap gap-3', align === 'center' && 'justify-center')}>
            {actions}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
