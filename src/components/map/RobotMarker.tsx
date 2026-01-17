import { t } from '@/lib/i18n';
import type { Language } from '@/lib/i18n';
import { Bot } from 'lucide-react';

interface RobotMarkerProps {
  x: number;
  y: number;
  language: Language;
}

export function RobotMarker({ x, y, language }: RobotMarkerProps) {
  return (
    <div
      className="absolute flex flex-col items-center z-30"
      style={{ left: x, top: y }}
    >
      {/* Status bubble */}
      <div className="absolute -top-10 px-3 py-1.5 bg-primary/95 rounded-full shadow-lg animate-float">
        <span className="text-2xs font-semibold text-primary-foreground flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          {t('explaining', language)}
        </span>
      </div>
      
      {/* Outer pulsing rings */}
      <div className="absolute w-16 h-16 rounded-full border-2 border-primary/40 animate-pulse-ring" />
      <div className="absolute w-16 h-16 rounded-full border-2 border-primary/25 animate-pulse-ring" style={{ animationDelay: '0.5s' }} />
      <div className="absolute w-16 h-16 rounded-full border-2 border-primary/15 animate-pulse-ring" style={{ animationDelay: '1s' }} />
      
      {/* Robot body */}
      <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-elevated flex items-center justify-center z-10">
        <Bot className="w-5 h-5 text-primary-foreground" />
        
        {/* Inner glow */}
        <div className="absolute inset-1 rounded-full bg-primary-foreground/20" />
      </div>
    </div>
  );
}
