import { Exhibit } from '@/lib/data';
import { t } from '@/lib/i18n';
import type { Language } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { X, Navigation, Info, Clock, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

// Import exhibit images
import exhibitGoldenMask from '@/assets/exhibit-golden-mask.jpg';
import exhibitRosetta from '@/assets/exhibit-rosetta.jpg';
import exhibitVase from '@/assets/exhibit-vase.jpg';

const exhibitImages: Record<string, string> = {
  'golden-mask': exhibitGoldenMask,
  'rosetta-stone': exhibitRosetta,
  'ancient-vase': exhibitVase,
};

interface ExhibitPreviewProps {
  exhibit: Exhibit;
  language: Language;
  isVisited: boolean;
  onClose: () => void;
  onNavigate: () => void;
  onViewDetails: () => void;
}

export function ExhibitPreview({
  exhibit,
  language,
  isVisited,
  onClose,
  onNavigate,
  onViewDetails,
}: ExhibitPreviewProps) {
  const name = language === 'ar' ? exhibit.nameAr : exhibit.nameEn;
  const description = language === 'ar' ? exhibit.descriptionAr : exhibit.descriptionEn;
  const gallery = language === 'ar' ? exhibit.galleryAr : exhibit.galleryEn;
  const period = language === 'ar' ? exhibit.periodAr : exhibit.periodEn;
  const image = exhibitImages[exhibit.id];

  return (
    <div className={cn(
      'fixed bottom-28 left-4 right-4 glass rounded-2xl shadow-elevated',
      'animate-slide-up-fade overflow-hidden z-40'
    )}>
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center z-10 hover:bg-background transition-colors"
      >
        <X className="w-4 h-4 text-foreground/60" />
      </button>
      
      <div className="flex gap-3 p-3">
        {/* Image */}
        {image && (
          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2">
            <h3 className="font-semibold text-sm text-foreground line-clamp-1 flex-1">
              {name}
            </h3>
            {isVisited && (
              <span className="px-2 py-0.5 bg-teal/20 text-teal text-2xs rounded-full flex-shrink-0">
                {t('visited', language)}
              </span>
            )}
          </div>
          
          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
            {description}
          </p>
          
          {/* Meta info */}
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1 text-2xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>{gallery}</span>
            </div>
            <div className="flex items-center gap-1 text-2xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{period}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex gap-2 px-3 pb-3">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 h-9 gap-1.5"
          onClick={onNavigate}
        >
          <Navigation className="w-3.5 h-3.5" />
          <span className="text-xs">{t('viewOnMap', language)}</span>
        </Button>
        <Button
          size="sm"
          className="flex-1 h-9 gap-1.5"
          onClick={onViewDetails}
        >
          <Info className="w-3.5 h-3.5" />
          <span className="text-xs">{t('description', language)}</span>
        </Button>
      </div>
    </div>
  );
}
