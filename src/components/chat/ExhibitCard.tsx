import { Exhibit, exhibits } from '@/lib/data';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
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

interface ExhibitCardProps {
  exhibitId: string;
  language: 'en' | 'ar';
}

export function ExhibitCard({ exhibitId, language }: ExhibitCardProps) {
  const navigate = useNavigate();
  const exhibit = exhibits.find(e => e.id === exhibitId);
  
  if (!exhibit) return null;
  
  const name = language === 'ar' ? exhibit.nameAr : exhibit.nameEn;
  const gallery = language === 'ar' ? exhibit.galleryAr : exhibit.galleryEn;
  const period = language === 'ar' ? exhibit.periodAr : exhibit.periodEn;
  const image = exhibitImages[exhibit.id];

  return (
    <button
      onClick={() => navigate(`/exhibit_details?id=${exhibit.id}`)}
      className={cn(
        'w-full max-w-[260px] bg-card rounded-xl overflow-hidden shadow-soft',
        'hover:shadow-card transition-shadow text-left'
      )}
    >
      {image && (
        <div className="h-24 overflow-hidden">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-3">
        <h4 className="font-medium text-sm text-foreground line-clamp-1">{name}</h4>
        <div className="flex items-center gap-3 mt-1.5">
          <div className="flex items-center gap-1 text-2xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span>{gallery}</span>
          </div>
          <div className="flex items-center gap-1 text-2xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{period}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 mt-2 text-primary text-xs font-medium">
          <span>{language === 'ar' ? 'عرض التفاصيل' : 'View details'}</span>
          <ArrowRight className={cn('w-3 h-3', language === 'ar' && 'rotate-180')} />
        </div>
      </div>
    </button>
  );
}
