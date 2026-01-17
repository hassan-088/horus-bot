import { cn } from '@/lib/utils';
import { Exhibit } from '@/lib/data';
import { MapPin, Eye, Star } from 'lucide-react';

interface ExhibitMarkerProps {
  exhibit: Exhibit;
  language: 'en' | 'ar';
  isVisited: boolean;
  isSaved: boolean;
  isSelected: boolean;
  isOnRoute: boolean;
  onClick: () => void;
  animationDelay: number;
}

export function ExhibitMarker({
  exhibit,
  language,
  isVisited,
  isSaved,
  isSelected,
  isOnRoute,
  onClick,
  animationDelay,
}: ExhibitMarkerProps) {
  const name = language === 'ar' ? exhibit.nameAr : exhibit.nameEn;
  const displayName = name.length > 12 ? name.slice(0, 12) + '...' : name;

  return (
    <button
      onClick={onClick}
      className={cn(
        'absolute flex flex-col items-center group opacity-0 animate-pop-in z-10',
        isSelected && 'z-20'
      )}
      style={{
        left: exhibit.x,
        top: exhibit.y,
        animationDelay: `${animationDelay}ms`,
        animationFillMode: 'forwards',
      }}
    >
      {/* Route indicator */}
      {isOnRoute && (
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-warning rounded-full flex items-center justify-center animate-bounce-subtle">
          <span className="text-[8px] text-warning-foreground font-bold">!</span>
        </div>
      )}
      
      {/* Saved indicator */}
      {isSaved && (
        <div className="absolute -top-1 -left-1 w-3 h-3">
          <Star className="w-3 h-3 fill-warning text-warning" />
        </div>
      )}
      
      {/* Main marker */}
      <div
        className={cn(
          'relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300',
          'shadow-md group-hover:shadow-lg group-hover:scale-125',
          isVisited 
            ? 'bg-teal ring-2 ring-teal/30' 
            : 'bg-muted-foreground/80 ring-2 ring-muted-foreground/20',
          isSelected && 'ring-4 ring-primary scale-125 shadow-elevated'
        )}
      >
        {isVisited ? (
          <Eye className="w-4 h-4 text-white" />
        ) : (
          <MapPin className="w-4 h-4 text-white" />
        )}
        
        {/* Pulse effect for selected */}
        {isSelected && (
          <>
            <div className="absolute inset-0 rounded-full bg-primary/40 animate-pulse-ring" />
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-ring" style={{ animationDelay: '0.5s' }} />
          </>
        )}
      </div>
      
      {/* Label */}
      <div
        className={cn(
          'mt-1 px-2 py-0.5 rounded-full transition-all duration-300',
          'bg-background/90 backdrop-blur-sm border border-border/50',
          isSelected && 'bg-primary text-primary-foreground border-primary',
          'group-hover:bg-primary/10'
        )}
      >
        <span className={cn(
          'text-2xs font-medium whitespace-nowrap',
          isSelected ? 'text-primary-foreground' : 'text-foreground/80'
        )}>
          {displayName}
        </span>
      </div>
    </button>
  );
}
