import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppBar } from '@/components/layout/AppBar';
import { PageContainer } from '@/components/layout/PageContainer';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { exhibits, Exhibit } from '@/lib/data';

// Map components
import { MapFloorPlan } from '@/components/map/MapFloorPlan';
import { ExhibitMarker } from '@/components/map/ExhibitMarker';
import { RobotMarker } from '@/components/map/RobotMarker';
import { MapLegend } from '@/components/map/MapLegend';
import { MapControls } from '@/components/map/MapControls';
import { MapSearch } from '@/components/map/MapSearch';
import { FloorSelector } from '@/components/map/FloorSelector';
import { ExhibitPreview } from '@/components/map/ExhibitPreview';

const MIN_SCALE = 0.5;
const MAX_SCALE = 2.5;
const ROBOT_POS = { x: 200, y: 160 };

export default function MapScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { language, visitedExhibits, savedExhibits } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Map state
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  
  // UI state
  const [selectedExhibit, setSelectedExhibit] = useState<Exhibit | null>(null);
  const [activeFloor, setActiveFloor] = useState('ground');
  const [selectedHall, setSelectedHall] = useState<string | undefined>();

  // Touch support
  const [lastTouchDistance, setLastTouchDistance] = useState<number | null>(null);

  // Filter exhibits by floor
  const floorExhibits = useMemo(() => {
    return exhibits.filter(e => e.floor === activeFloor);
  }, [activeFloor]);

  // Auto-select exhibit from URL param
  useEffect(() => {
    const exhibitId = searchParams.get('exhibit');
    if (exhibitId) {
      const exhibit = exhibits.find(e => e.id === exhibitId);
      if (exhibit) {
        // Switch to the exhibit's floor first
        setActiveFloor(exhibit.floor);
        setSelectedExhibit(exhibit);
        // Center on the exhibit
        setPosition({
          x: -(exhibit.x - 200),
          y: -(exhibit.y - 200),
        });
        setScale(1.5);
        // Set the hall
        const hall = exhibit.galleryEn.toLowerCase().replace(' ', '-');
        setSelectedHall(hall);
      }
    }
  }, [searchParams]);

  // Mouse/touch handlers
  const handleStart = useCallback((clientX: number, clientY: number) => {
    setIsDragging(true);
    setStartPos({ x: clientX - position.x, y: clientY - position.y });
  }, [position]);

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!isDragging) return;
    setPosition({
      x: clientX - startPos.x,
      y: clientY - startPos.y,
    });
  }, [isDragging, startPos]);

  const handleEnd = useCallback(() => {
    setIsDragging(false);
    setLastTouchDistance(null);
  }, []);

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => handleStart(e.clientX, e.clientY);
  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX, e.clientY);
  const handleMouseUp = () => handleEnd();

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      handleStart(e.touches[0].clientX, e.touches[0].clientY);
    } else if (e.touches.length === 2) {
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setLastTouchDistance(distance);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    } else if (e.touches.length === 2 && lastTouchDistance !== null) {
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const delta = distance - lastTouchDistance;
      const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale + delta * 0.005));
      setScale(newScale);
      setLastTouchDistance(distance);
    }
  };

  const handleTouchEnd = () => handleEnd();

  // Wheel zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = -e.deltaY * 0.002;
    const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale + delta));
    setScale(newScale);
  }, [scale]);

  // Control handlers
  const handleZoomIn = () => setScale(Math.min(MAX_SCALE, scale + 0.25));
  const handleZoomOut = () => setScale(Math.max(MIN_SCALE, scale - 0.25));
  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setSelectedExhibit(null);
  };
  const handleLocate = () => {
    // Center on robot position
    setPosition({ x: 0, y: 0 });
    setScale(1.5);
  };

  // Exhibit handlers
  const handleExhibitClick = (exhibit: Exhibit) => {
    setSelectedExhibit(exhibit);
    // Determine which hall the exhibit is in based on gallery
    const hall = exhibit.galleryEn.toLowerCase().replace(' ', '-');
    setSelectedHall(hall);
  };

  const handleNavigateToExhibit = () => {
    if (selectedExhibit) {
      // Center map on exhibit
      setPosition({
        x: -(selectedExhibit.x - 200),
        y: -(selectedExhibit.y - 200),
      });
      setScale(1.5);
    }
  };

  const handleViewDetails = () => {
    if (selectedExhibit) {
      navigate(`/exhibit_details?id=${selectedExhibit.id}`);
    }
  };

  const handleSearchSelect = (exhibit: Exhibit) => {
    setSelectedExhibit(exhibit);
    // Center on selected exhibit
    setPosition({
      x: -(exhibit.x - 200),
      y: -(exhibit.y - 200),
    });
    setScale(1.5);
  };

  return (
    <PageContainer background="map">
      <AppBar title={t('museumMap', language)} showBack />
      
      {/* Search */}
      <MapSearch language={language} onSelectExhibit={handleSearchSelect} />
      
      {/* Floor Selector */}
      <FloorSelector 
        language={language} 
        activeFloor={activeFloor} 
        onFloorChange={setActiveFloor} 
      />
      
      {/* Map Controls */}
      <MapControls
        scale={scale}
        minScale={MIN_SCALE}
        maxScale={MAX_SCALE}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onReset={handleReset}
        onLocate={handleLocate}
      />

      {/* Main Map Area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-hidden pt-32 pb-4 touch-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
      >
        {/* Map Container */}
        <div
          className={cn(
            'relative w-full h-[500px] mx-auto max-w-[600px]',
            'bg-card/90 border-2 border-border rounded-3xl shadow-card overflow-hidden',
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          )}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: 'center',
            transition: isDragging ? 'none' : 'transform 0.2s ease-out',
          }}
        >
          {/* Floor Plan */}
          <MapFloorPlan 
            language={language} 
            selectedHall={selectedHall}
            onHallSelect={setSelectedHall}
          />
          
          
          {/* Map image already includes entrance labels */}

          {/* Exhibit Markers - filtered by floor */}
          {floorExhibits.map((exhibit, index) => {
            const isVisited = visitedExhibits.includes(exhibit.id);
            const isSaved = savedExhibits.includes(exhibit.id);
            const isSelected = selectedExhibit?.id === exhibit.id;
            
            return (
              <ExhibitMarker
                key={exhibit.id}
                exhibit={exhibit}
                language={language}
                isVisited={isVisited}
                isSaved={isSaved}
                isSelected={isSelected}
                isOnRoute={false}
                onClick={() => handleExhibitClick(exhibit)}
                animationDelay={index * 80}
              />
            );
          })}

          {/* Robot Marker */}
          <RobotMarker x={ROBOT_POS.x} y={ROBOT_POS.y} language={language} />
        </div>
      </div>

      {/* Legend (hide when preview is open) */}
      {!selectedExhibit && <MapLegend language={language} />}

      {/* Exhibit Preview */}
      {selectedExhibit && (
        <ExhibitPreview
          exhibit={selectedExhibit}
          language={language}
          isVisited={visitedExhibits.includes(selectedExhibit.id)}
          onClose={() => setSelectedExhibit(null)}
          onNavigate={handleNavigateToExhibit}
          onViewDetails={handleViewDetails}
        />
      )}
    </PageContainer>
  );
}
