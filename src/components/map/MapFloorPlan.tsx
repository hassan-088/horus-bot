import gemMapImage from '@/assets/gem-complex-map.png';

interface Room {
  id: string;
  name: string;
  nameAr: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

const rooms: Room[] = [
  { id: 'main-building', name: 'Main Building', nameAr: 'المبنى الرئيسي', x: 160, y: 200, width: 200, height: 160, color: 'hsl(var(--primary) / 0.15)' },
  { id: 'terraced-gardens', name: 'Terraced Gardens', nameAr: 'الحدائق المدرجة', x: 140, y: 100, width: 140, height: 90, color: 'hsl(var(--accent) / 0.15)' },
  { id: 'sculpture-garden', name: 'Sculpture Garden', nameAr: 'حديقة المنحوتات', x: 80, y: 280, width: 120, height: 80, color: 'hsl(var(--teal) / 0.15)' },
  { id: 'palm-garden', name: 'Palm Garden', nameAr: 'حديقة النخيل', x: 220, y: 340, width: 120, height: 70, color: 'hsl(var(--warning) / 0.15)' },
  { id: 'conservation-centre', name: 'Conservation Centre', nameAr: 'مركز الترميم', x: 200, y: 30, width: 120, height: 60, color: 'hsl(var(--muted-foreground) / 0.1)' },
  { id: 'events-area', name: 'Events Area', nameAr: 'منطقة الفعاليات', x: 320, y: 260, width: 100, height: 80, color: 'hsl(var(--primary) / 0.1)' },
];

interface MapFloorPlanProps {
  language: 'en' | 'ar';
  selectedHall?: string;
  onHallSelect?: (hallId: string) => void;
}

export function MapFloorPlan({ language, selectedHall, onHallSelect }: MapFloorPlanProps) {
  return (
    <div className="absolute inset-0 w-full h-full">
      {/* GEM Complex Map Image */}
      <img
        src={gemMapImage}
        alt={language === 'ar' ? 'خريطة مجمع المتحف المصري الكبير' : 'GEM Complex Map'}
        className="w-full h-full object-contain rounded-3xl"
        draggable={false}
      />
      
      {/* Interactive overlay areas (invisible, for click handling) */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 460 480" preserveAspectRatio="xMidYMid meet">
        {rooms.map((room) => (
          <g key={room.id}>
            <rect
              x={room.x}
              y={room.y}
              width={room.width}
              height={room.height}
              rx="8"
              fill={selectedHall === room.id ? 'hsl(var(--primary) / 0.2)' : 'transparent'}
              stroke={selectedHall === room.id ? 'hsl(var(--primary))' : 'transparent'}
              strokeWidth={selectedHall === room.id ? 2 : 0}
              className="cursor-pointer transition-all duration-300 hover:fill-[hsl(var(--primary)/0.1)]"
              onClick={() => onHallSelect?.(room.id)}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

export { rooms };
export type { Room };
