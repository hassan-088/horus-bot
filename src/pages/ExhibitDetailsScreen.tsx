import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Bookmark, Play, Pause, MapPin, Plus, Globe, Clock } from 'lucide-react';
import { AppBar } from '@/components/layout/AppBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { PageContainer } from '@/components/layout/PageContainer';
import { FloatingChatButton } from '@/components/chat/FloatingChatButton';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { exhibits } from '@/lib/data';
import gemImage from '@/assets/gem.jpg';
import exhibitGoldenMask from '@/assets/exhibit-golden-mask.jpg';
import exhibitRosetta from '@/assets/exhibit-rosetta.jpg';
import exhibitVase from '@/assets/exhibit-vase.jpg';

const exhibitImages: Record<string, string> = {
  'golden-mask': exhibitGoldenMask,
  'rosetta-stone': exhibitRosetta,
  'ancient-vase': exhibitVase,
};

export default function ExhibitDetailsScreen() {
  const [searchParams] = useSearchParams();
  const exhibitId = searchParams.get('id') || exhibits[0].id;
  const exhibit = exhibits.find((e) => e.id === exhibitId) || exhibits[0];

  const { language, savedExhibits, toggleSavedExhibit, isRTL } = useApp();
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);

  const isSaved = savedExhibits.includes(exhibit.id);
  const image = exhibitImages[exhibit.id] || gemImage;

  const handleBookmark = () => {
    const nowSaved = toggleSavedExhibit(exhibit.id);
    toast({
      description: nowSaved
        ? t('addedToList', language)
        : t('removedFromList', language),
    });
  };

  const handlePlayAudio = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      toast({ description: t('playingAudio', language) });
    }
  };

  const handleAddToRoute = () => {
    toast({ description: t('addedToRoute', language) });
  };

  const handleViewOnMap = () => {
    toast({ description: t('openingMap', language) });
  };

  const facts = [
    { icon: Globe, label: t('origin', language), value: language === 'ar' ? exhibit.originAr : exhibit.originEn },
    { icon: Clock, label: t('period', language), value: language === 'ar' ? exhibit.periodAr : exhibit.periodEn },
    { icon: MapPin, label: t('gallery', language), value: language === 'ar' ? exhibit.galleryAr : exhibit.galleryEn },
  ];

  return (
    <PageContainer>
      {/* Hero Header */}
      <div className="relative h-80">
        <img
          src={image}
          alt={language === 'ar' ? exhibit.nameAr : exhibit.nameEn}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/15" />
        
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4">
          <AppBar
            title=""
            showBack
            className="bg-transparent border-0 p-0 h-auto"
            rightContent={
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBookmark}
                className="h-9 w-9 rounded-full bg-black/30 hover:bg-black/50 text-white"
              >
                <Bookmark
                  className={cn('w-5 h-5', isSaved && 'fill-white')}
                />
              </Button>
            }
          />
        </div>

        {/* Title */}
        <div className="absolute bottom-6 left-4 right-4">
          <h1 className="text-2xl font-bold text-white">
            {language === 'ar' ? exhibit.nameAr : exhibit.nameEn}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6 -mt-4 relative bg-background rounded-t-3xl">
        {/* Audio Guide Card */}
        <button
          onClick={handlePlayAudio}
          className="flex items-center gap-4 w-full p-4 bg-card rounded-2xl shadow-soft hover:shadow-card transition-shadow"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            {isPlaying ? (
              <Pause className="w-6 h-6 text-primary" />
            ) : (
              <Play className="w-6 h-6 text-primary" />
            )}
          </div>
          <div className={cn('flex-1', isRTL ? 'text-right' : 'text-left')}>
            <h3 className="font-semibold">
              {language === 'ar' ? 'الدليل الصوتي' : 'Audio Guide'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isPlaying
                ? language === 'ar' ? 'يتم التشغيل...' : 'Playing...'
                : language === 'ar' ? 'اضغط للاستماع' : 'Tap to listen'}
            </p>
          </div>
        </button>

        {/* Fact Chips */}
        <div className="flex flex-wrap gap-2">
          {facts.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-full"
            >
              <Icon className="w-4 h-4 text-primary" />
              <span className="text-sm">
                <span className="text-muted-foreground">{label}:</span>{' '}
                <span className="font-medium">{value}</span>
              </span>
            </div>
          ))}
        </div>

        {/* Description */}
        <div>
          <h2 className="text-lg font-semibold mb-3">
            {t('description', language)}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {language === 'ar' ? exhibit.descriptionAr : exhibit.descriptionEn}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleAddToRoute}
            className="flex-1 h-12 rounded-xl"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t('addToRoute', language)}
          </Button>
          <Button
            variant="ghost"
            onClick={handleViewOnMap}
            className="flex-1 h-12 rounded-xl text-primary"
          >
            <MapPin className="w-4 h-4 mr-2" />
            {t('viewOnMap', language)}
          </Button>
        </div>
      </div>

      <FloatingChatButton />
      <BottomNav />
    </PageContainer>
  );
}
