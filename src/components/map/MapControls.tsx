import { Plus, Minus, Locate, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onLocate: () => void;
  scale: number;
  minScale: number;
  maxScale: number;
}

export function MapControls({
  onZoomIn,
  onZoomOut,
  onReset,
  onLocate,
  scale,
  minScale,
  maxScale,
}: MapControlsProps) {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-30">
      {/* Zoom controls */}
      <div className="glass rounded-2xl p-1.5 shadow-card flex flex-col gap-1">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'w-10 h-10 rounded-xl',
            scale >= maxScale && 'opacity-50 cursor-not-allowed'
          )}
          onClick={onZoomIn}
          disabled={scale >= maxScale}
        >
          <Plus className="w-5 h-5" />
        </Button>
        
        <div className="h-px bg-border mx-2" />
        
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'w-10 h-10 rounded-xl',
            scale <= minScale && 'opacity-50 cursor-not-allowed'
          )}
          onClick={onZoomOut}
          disabled={scale <= minScale}
        >
          <Minus className="w-5 h-5" />
        </Button>
      </div>
      
      {/* Other controls */}
      <div className="glass rounded-2xl p-1.5 shadow-card flex flex-col gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 rounded-xl"
          onClick={onReset}
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 rounded-xl text-primary"
          onClick={onLocate}
        >
          <Locate className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
