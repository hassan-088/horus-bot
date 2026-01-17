import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ChevronRight, Landmark } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { exhibits } from '@/lib/data';
import { cn } from '@/lib/utils';

export function RecommendationsSection() {
  const navigate = useNavigate();
  const { language, isRTL, visitedExhibits, savedExhibits } = useApp();

  // Generate recommendations based on user preferences
  const recommendations = useMemo(() => {
    // Get the periods of exhibits the user has interacted with
    const interactedExhibits = exhibits.filter(
      e => visitedExhibits.includes(e.id) || savedExhibits.includes(e.id)
    );
    
    const preferredPeriods = new Set(interactedExhibits.map(e => e.periodEn));
    const preferredGalleries = new Set(interactedExhibits.map(e => e.galleryEn));

    // Find unvisited exhibits that match preferences
    const unvisited = exhibits.filter(e => !visitedExhibits.includes(e.id));
    
    // Score exhibits based on matching preferences
    const scored = unvisited.map(exhibit => {
      let score = 0;
      if (preferredPeriods.has(exhibit.periodEn)) score += 2;
      if (preferredGalleries.has(exhibit.galleryEn)) score += 1;
      return { exhibit, score };
    });

    // Sort by score and take top 3
    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(item => item.exhibit);
  }, [visitedExhibits, savedExhibits]);

  if (recommendations.length === 0) return null;

  return (
    <div className="px-4 pb-6">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">
          {language === 'ar' ? 'موصى به لك' : 'Recommended for You'}
        </h3>
      </div>
      
      <div className="space-y-2">
        {recommendations.map((exhibit, index) => (
          <button
            key={exhibit.id}
            onClick={() => navigate(`/exhibit_details?id=${exhibit.id}`)}
            className={cn(
              'flex items-center gap-3 w-full p-3 bg-card rounded-xl shadow-soft hover-lift group opacity-0 animate-slide-up-fade',
              `stagger-${index + 1}`
            )}
            style={{ animationFillMode: 'forwards' }}
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary/20">
              <Landmark className="w-5 h-5 text-primary" />
            </div>
            
            <div className={cn('flex-1 min-w-0', isRTL ? 'text-right' : 'text-left')}>
              <h4 className="font-medium text-sm text-foreground truncate group-hover:text-primary transition-colors">
                {language === 'ar' ? exhibit.nameAr : exhibit.nameEn}
              </h4>
              <p className="text-xs text-muted-foreground">
                {language === 'ar' ? exhibit.periodAr : exhibit.periodEn}
              </p>
            </div>

            <ChevronRight className={cn(
              'w-4 h-4 text-muted-foreground flex-shrink-0 transition-all duration-300 group-hover:text-primary group-hover:translate-x-1',
              isRTL && 'rotate-180 group-hover:-translate-x-1'
            )} />
          </button>
        ))}
      </div>
    </div>
  );
}
