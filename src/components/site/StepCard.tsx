import { Card } from '@/components/ui/card';

interface StepCardProps {
  step: number;
  title: string;
  description: string;
}

export function StepCard({ step, title, description }: StepCardProps) {
  return (
    <Card className="relative p-7 hover:border-primary/40 transition-colors">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/40 bg-primary/10 font-serif text-sm font-semibold text-primary">
          {String(step).padStart(2, '0')}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
      </div>
      <h3 className="font-serif text-lg text-foreground mb-2">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
    </Card>
  );
}
