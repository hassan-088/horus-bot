import { t } from '@/lib/i18n';
import type { Language } from '@/lib/i18n';
import { Bot, User, Eye, MapPin, Star } from 'lucide-react';

interface MapLegendProps {
  language: Language;
}

export function MapLegend({ language }: MapLegendProps) {
  const items = [
    { 
      icon: <Bot className="w-3 h-3 text-primary" />, 
      label: t('robotLocation', language),
      color: 'bg-primary'
    },
    { 
      icon: <User className="w-3 h-3 text-destructive" />, 
      label: t('yourLocation', language),
      color: 'bg-destructive'
    },
    { 
      icon: <Eye className="w-3 h-3 text-teal" />, 
      label: t('visitedExhibit', language),
      color: 'bg-teal'
    },
    { 
      icon: <MapPin className="w-3 h-3 text-muted-foreground" />, 
      label: t('notVisited', language),
      color: 'bg-muted-foreground'
    },
  ];

  return (
    <div className="fixed bottom-28 left-4 glass rounded-2xl p-3 shadow-card animate-slide-up-fade z-30">
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2 group cursor-default">
            <div className={`w-5 h-5 rounded-full ${item.color} flex items-center justify-center transition-transform duration-200 group-hover:scale-110`}>
              {item.icon}
            </div>
            <span className="text-xs text-foreground/80 transition-colors duration-200 group-hover:text-foreground">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
