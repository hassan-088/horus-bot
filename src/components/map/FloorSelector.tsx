import { cn } from '@/lib/utils';

interface Floor {
  id: string;
  label: string;
  labelAr: string;
}

const floors: Floor[] = [
  { id: 'floor-2', label: 'Floor 2', labelAr: 'الطابق 2' },
  { id: 'floor-1', label: 'Floor 1', labelAr: 'الطابق 1' },
  { id: 'ground', label: 'Ground', labelAr: 'الأرضي' },
];

interface FloorSelectorProps {
  language: 'en' | 'ar';
  activeFloor: string;
  onFloorChange: (floorId: string) => void;
}

export function FloorSelector({ language, activeFloor, onFloorChange }: FloorSelectorProps) {
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 glass rounded-2xl p-1.5 shadow-card z-30">
      <div className="flex flex-col gap-1">
        {floors.map((floor) => (
          <button
            key={floor.id}
            onClick={() => onFloorChange(floor.id)}
            className={cn(
              'px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200',
              activeFloor === floor.id
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-foreground/70 hover:bg-muted hover:text-foreground'
            )}
          >
            {language === 'ar' ? floor.labelAr : floor.label}
          </button>
        ))}
      </div>
    </div>
  );
}
