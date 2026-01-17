import { cn } from '@/lib/utils';

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
  { id: 'hall-a', name: 'Hall A', nameAr: 'القاعة أ', x: 40, y: 80, width: 180, height: 140, color: 'hsl(var(--primary) / 0.15)' },
  { id: 'hall-b', name: 'Hall B', nameAr: 'القاعة ب', x: 240, y: 80, width: 180, height: 140, color: 'hsl(var(--accent) / 0.15)' },
  { id: 'hall-c', name: 'Hall C', nameAr: 'القاعة ج', x: 40, y: 240, width: 180, height: 140, color: 'hsl(var(--teal) / 0.15)' },
  { id: 'hall-d', name: 'Hall D', nameAr: 'القاعة د', x: 240, y: 240, width: 180, height: 140, color: 'hsl(var(--warning) / 0.15)' },
  { id: 'lobby', name: 'Lobby', nameAr: 'الردهة', x: 140, y: 400, width: 180, height: 60, color: 'hsl(var(--muted-foreground) / 0.1)' },
];

interface MapFloorPlanProps {
  language: 'en' | 'ar';
  selectedHall?: string;
  onHallSelect?: (hallId: string) => void;
}

export function MapFloorPlan({ language, selectedHall, onHallSelect }: MapFloorPlanProps) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 460 480" preserveAspectRatio="xMidYMid meet">
      {/* Background Pattern */}
      <defs>
        <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.5" />
        </pattern>
        <filter id="room-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.1" />
        </filter>
      </defs>
      
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      
      {/* Rooms */}
      {rooms.map((room) => (
        <g key={room.id}>
          <rect
            x={room.x}
            y={room.y}
            width={room.width}
            height={room.height}
            rx="16"
            fill={room.color}
            stroke={selectedHall === room.id ? 'hsl(var(--primary))' : 'hsl(var(--border))'}
            strokeWidth={selectedHall === room.id ? 2 : 1}
            filter="url(#room-shadow)"
            className={cn(
              'cursor-pointer transition-all duration-300',
              selectedHall === room.id && 'opacity-100'
            )}
            onClick={() => onHallSelect?.(room.id)}
          />
          <text
            x={room.x + room.width / 2}
            y={room.y + room.height / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-foreground/70 text-xs font-medium pointer-events-none"
          >
            {language === 'ar' ? room.nameAr : room.name}
          </text>
        </g>
      ))}
      
      {/* Connecting Pathways */}
      <path
        d="M 130 220 L 130 240 M 330 220 L 330 240"
        stroke="hsl(var(--border))"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <path
        d="M 220 150 L 240 150 M 220 310 L 240 310"
        stroke="hsl(var(--border))"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      
      {/* Lobby to Halls connections */}
      <path
        d="M 180 400 L 130 380 M 280 400 L 330 380"
        stroke="hsl(var(--border))"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      
      {/* Entrance Arrow */}
      <g className="animate-bounce-subtle">
        <path
          d="M 230 480 L 230 460"
          stroke="hsl(var(--primary))"
          strokeWidth="3"
          markerEnd="url(#arrow)"
        />
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 Z" fill="hsl(var(--primary))" />
          </marker>
        </defs>
      </g>
    </svg>
  );
}

export { rooms };
export type { Room };
