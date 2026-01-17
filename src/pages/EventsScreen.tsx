import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Sparkles, Users, Palette } from 'lucide-react';
import { AppBar } from '@/components/layout/AppBar';
import { PageContainer } from '@/components/layout/PageContainer';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';
import { museumEvents, MuseumEvent } from '@/lib/data';
import { cn } from '@/lib/utils';

type EventFilter = 'all' | 'exhibition' | 'tour' | 'workshop';

const filterOptions: { key: EventFilter; labelEn: string; labelAr: string; icon: React.ElementType }[] = [
  { key: 'all', labelEn: 'All', labelAr: 'الكل', icon: Sparkles },
  { key: 'exhibition', labelEn: 'Exhibitions', labelAr: 'المعارض', icon: Palette },
  { key: 'tour', labelEn: 'Tours', labelAr: 'الجولات', icon: Users },
  { key: 'workshop', labelEn: 'Workshops', labelAr: 'ورش العمل', icon: Users },
];

const eventTypeColors: Record<MuseumEvent['type'], string> = {
  exhibition: 'bg-amber-500',
  tour: 'bg-primary',
  workshop: 'bg-emerald-500',
};

export default function EventsScreen() {
  const navigate = useNavigate();
  const { language, isRTL } = useApp();
  const [activeFilter, setActiveFilter] = useState<EventFilter>('all');

  const filteredEvents = museumEvents.filter(
    event => activeFilter === 'all' || event.type === activeFilter
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <PageContainer>
      <AppBar 
        title={language === 'ar' ? 'الفعاليات' : 'Events'} 
        showBack 
      />

      <div className="p-4 space-y-4">
        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {filterOptions.map(({ key, labelEn, labelAr, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={cn(
                'flex items-center gap-2 flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                activeFilter === key
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-card text-muted-foreground hover:bg-muted'
              )}
            >
              <Icon className="w-4 h-4" />
              {language === 'ar' ? labelAr : labelEn}
            </button>
          ))}
        </div>

        {/* Featured Event */}
        {activeFilter === 'all' && filteredEvents.find(e => e.featured) && (
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-amber-500 to-orange-600 p-6 text-white shadow-lg">
            <div className="absolute top-4 right-4">
              <Badge className="bg-white/20 text-white border-0">
                {language === 'ar' ? 'مميز' : 'Featured'}
              </Badge>
            </div>
            <Sparkles className="w-8 h-8 mb-3 opacity-80" />
            <h2 className="text-xl font-bold mb-2">
              {language === 'ar' 
                ? filteredEvents.find(e => e.featured)?.titleAr 
                : filteredEvents.find(e => e.featured)?.titleEn}
            </h2>
            <p className="text-white/80 text-sm mb-4">
              {language === 'ar' 
                ? filteredEvents.find(e => e.featured)?.descriptionAr 
                : filteredEvents.find(e => e.featured)?.descriptionEn}
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(filteredEvents.find(e => e.featured)?.date || '')}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {language === 'ar' 
                  ? filteredEvents.find(e => e.featured)?.locationAr 
                  : filteredEvents.find(e => e.featured)?.locationEn}
              </div>
            </div>
          </div>
        )}

        {/* Events List */}
        <div className="space-y-3">
          {filteredEvents.filter(e => !e.featured || activeFilter !== 'all').map((event, index) => (
            <div
              key={event.id}
              className={cn(
                'flex gap-4 p-4 bg-card rounded-2xl shadow-soft opacity-0 animate-slide-up-fade',
                `stagger-${Math.min(index + 1, 6)}`
              )}
              style={{ animationFillMode: 'forwards' }}
            >
              {/* Date Badge */}
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-muted flex flex-col items-center justify-center">
                <span className="text-xs text-muted-foreground">
                  {new Date(event.date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { month: 'short' })}
                </span>
                <span className="text-lg font-bold text-foreground">
                  {new Date(event.date).getDate()}
                </span>
              </div>

              {/* Event Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-foreground truncate">
                    {language === 'ar' ? event.titleAr : event.titleEn}
                  </h3>
                  <div className={cn('w-2 h-2 rounded-full flex-shrink-0 mt-2', eventTypeColors[event.type])} />
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                  {language === 'ar' ? event.descriptionAr : event.descriptionEn}
                </p>
                
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {language === 'ar' ? event.locationAr : event.locationEn}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground">
              {language === 'ar' ? 'لا توجد فعاليات' : 'No events found'}
            </p>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
