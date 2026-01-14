import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar } from '@/components/layout/AppBar';
import { PageContainer } from '@/components/layout/PageContainer';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { exhibits } from '@/lib/data';

export default function MapScreen() {
  const navigate = useNavigate();
  const { language, visitedExhibits } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  // Robot position (animated)
  const [robotPos] = useState({ x: 280, y: 180 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newScale = Math.max(0.5, Math.min(2, scale - e.deltaY * 0.001));
    setScale(newScale);
  };

  const handleExhibitClick = (exhibitId: string) => {
    navigate(`/exhibit_details?id=${exhibitId}`);
  };

  return (
    <PageContainer background="map">
      <AppBar title={t('museumMap', language)} showBack />

      <div
        ref={containerRef}
        className="flex-1 overflow-hidden p-4"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        {/* Map Container */}
        <div
          className="relative w-full h-[500px] mx-auto max-w-[600px] bg-map-container/90 border-2 border-border rounded-3xl shadow-card overflow-hidden cursor-grab active:cursor-grabbing"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: 'center',
          }}
        >
          {/* Grid Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Horizontal grid lines */}
            {Array.from({ length: 10 }).map((_, i) => (
              <line
                key={`h-${i}`}
                x1="0"
                y1={i * 50}
                x2="100%"
                y2={i * 50}
                className="map-grid-line"
              />
            ))}
            {/* Vertical grid lines */}
            {Array.from({ length: 12 }).map((_, i) => (
              <line
                key={`v-${i}`}
                x1={i * 50}
                y1="0"
                x2={i * 50}
                y2="100%"
                className="map-grid-line"
              />
            ))}
            {/* Center lines */}
            <line
              x1="50%"
              y1="0"
              x2="50%"
              y2="100%"
              className="map-grid-center"
            />
            <line
              x1="0"
              y1="50%"
              x2="100%"
              y2="50%"
              className="map-grid-center"
            />
          </svg>

          {/* Entrance Label */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-primary/10 rounded-full">
            <span className="text-xs font-semibold text-primary">
              {t('entrance', language)}
            </span>
          </div>

          {/* Exhibit Markers */}
          {exhibits.map((exhibit, index) => {
            const isVisited = visitedExhibits.includes(exhibit.id);
            return (
              <button
                key={exhibit.id}
                onClick={() => handleExhibitClick(exhibit.id)}
                className={`absolute flex flex-col items-center group opacity-0 animate-pop-in`}
                style={{ 
                  left: exhibit.x, 
                  top: exhibit.y,
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                <div
                  className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-150 group-hover:shadow-lg',
                    isVisited ? 'bg-teal hover-glow' : 'bg-muted-foreground'
                  )}
                >
                  <div className="w-2 h-2 bg-white rounded-full transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="mt-1 text-2xs font-medium text-foreground/80 whitespace-nowrap transition-all duration-300 group-hover:text-primary group-hover:font-semibold">
                  {language === 'ar' ? exhibit.nameAr.slice(0, 15) : exhibit.nameEn.slice(0, 15)}
                  {(exhibit.nameEn.length > 15 || exhibit.nameAr.length > 15) && '...'}
                </span>
              </button>
            );
          })}

          {/* Robot Marker */}
          <div
            className="absolute flex flex-col items-center"
            style={{ left: robotPos.x, top: robotPos.y }}
          >
            {/* Explaining bubble */}
            <div className="absolute -top-8 px-2 py-1 bg-primary/20 rounded-full whitespace-nowrap">
              <span className="text-2xs font-medium text-primary">
                {t('explaining', language)}
              </span>
            </div>
            
            {/* Pulsing rings */}
            <div className="absolute w-10 h-10 rounded-full border-2 border-warning/50 animate-pulse-ring" />
            <div className="absolute w-10 h-10 rounded-full border-2 border-warning/30 animate-pulse-ring animation-delay-500" />
            
            {/* Robot dot */}
            <div className="relative w-4 h-4 rounded-full bg-primary shadow-lg z-10">
              <div className="absolute inset-1 rounded-full bg-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="fixed bottom-24 left-4 glass rounded-2xl p-3 shadow-card animate-slide-up-fade">
        <div className="space-y-2">
          <div className="flex items-center gap-2 group cursor-default">
            <div className="w-3 h-3 rounded-full bg-primary transition-transform duration-200 group-hover:scale-125" />
            <span className="text-xs transition-colors duration-200 group-hover:text-primary">{t('robotLocation', language)}</span>
          </div>
          <div className="flex items-center gap-2 group cursor-default">
            <div className="w-3 h-3 rounded-full bg-destructive transition-transform duration-200 group-hover:scale-125" />
            <span className="text-xs transition-colors duration-200 group-hover:text-destructive">{t('yourLocation', language)}</span>
          </div>
          <div className="flex items-center gap-2 group cursor-default">
            <div className="w-3 h-3 rounded-full bg-teal transition-transform duration-200 group-hover:scale-125" />
            <span className="text-xs transition-colors duration-200 group-hover:text-teal">{t('visitedExhibit', language)}</span>
          </div>
          <div className="flex items-center gap-2 group cursor-default">
            <div className="w-3 h-3 rounded-full bg-muted-foreground transition-transform duration-200 group-hover:scale-125" />
            <span className="text-xs">{t('notVisited', language)}</span>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

