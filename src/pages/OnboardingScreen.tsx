import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Sparkles, Map, MessageCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { HorusAvatar } from '@/components/horus/HorusAvatar';
import onboardingImage from '@/assets/onboarding.jpg';

const slides = [
  {
    icon: Sparkles,
    titleKey: 'meetAnkhu' as const,
    descKey: 'meetAnkhuDesc' as const,
    accent: 'primary',
  },
  {
    icon: Map,
    titleKey: 'automaticTour' as const,
    descKey: 'automaticTourDesc' as const,
    accent: 'horus-gold',
  },
  {
    icon: MessageCircle,
    titleKey: 'exploreLearn' as const,
    descKey: 'exploreLearnDesc' as const,
    accent: 'teal',
  },
];

export default function OnboardingScreen() {
  const navigate = useNavigate();
  const { language, setLanguage, completeOnboarding } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleComplete = () => {
    completeOnboarding();
    navigate('/home', { replace: true });
  };

  const handleNext = () => {
    if (isTransitioning) return;
    
    if (currentSlide < slides.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(currentSlide + 1);
        setIsTransitioning(false);
      }, 200);
    } else {
      handleComplete();
    }
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 200);
  };

  const CurrentIcon = slides[currentSlide].icon;
  const isLastSlide = currentSlide === slides.length - 1;

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-foreground">
      {/* Background with parallax */}
      <div
        className={cn(
          'absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out-expo',
          mounted ? 'scale-100' : 'scale-110'
        )}
        style={{ 
          backgroundImage: `url(${onboardingImage})`,
          transform: `scale(${1.05 + currentSlide * 0.02})`,
        }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 gradient-onboarding" />
      
      {/* Decorative accent based on current slide */}
      <div className={cn(
        'absolute top-20 right-0 w-48 h-48 rounded-full blur-[100px] transition-all duration-700',
        currentSlide === 0 && 'bg-primary/30',
        currentSlide === 1 && 'bg-horus-gold/30',
        currentSlide === 2 && 'bg-teal/30'
      )} />

      {/* Top Bar */}
      <div className="relative z-20 flex items-center justify-between px-5 pt-safe-t py-4">
        {/* Skip button */}
        <button
          onClick={handleComplete}
          className="text-sm text-primary-foreground/60 hover:text-primary-foreground/80 transition-colors px-2 py-1"
        >
          {language === 'ar' ? 'تخطي' : 'Skip'}
        </button>

        {/* Language Toggle */}
        <button
          onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
          className="flex items-center gap-2 px-3 py-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-full backdrop-blur-sm transition-all duration-200 press-effect"
        >
          <Globe className="w-4 h-4 text-primary-foreground/80" />
          <span className="text-sm text-primary-foreground font-medium">
            {language === 'en' ? 'العربية' : 'EN'}
          </span>
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
        {/* Horus Avatar with slide-specific animation */}
        <div className={cn(
          'mb-8 transition-all duration-500 ease-out-expo',
          isTransitioning ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
        )}>
          <div className="relative">
            <HorusAvatar 
              size="xl" 
              animated 
              glowing={currentSlide === 0}
            />
            
            {/* Feature icon badge */}
            <div className={cn(
              'absolute -bottom-2 -right-2 w-10 h-10 rounded-xl flex items-center justify-center shadow-elevated transition-all duration-300',
              currentSlide === 0 && 'bg-primary',
              currentSlide === 1 && 'bg-horus-gold',
              currentSlide === 2 && 'bg-teal'
            )}>
              <CurrentIcon className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div 
          key={currentSlide}
          className={cn(
            'max-w-sm transition-all duration-300 ease-out-expo',
            isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          )}
        >
          <h2 className="font-display text-display-sm text-primary-foreground mb-4">
            {t(slides[currentSlide].titleKey, language)}
          </h2>
          <p className="text-primary-foreground/70 text-base leading-relaxed">
            {t(slides[currentSlide].descKey, language)}
          </p>
        </div>
      </div>

      {/* Bottom Area */}
      <div className="relative z-10 p-6 pb-safe-b pb-8 space-y-6">
        {/* Progress Dots */}
        <div className="flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                index === currentSlide
                  ? 'w-8 bg-primary-foreground'
                  : 'w-2 bg-primary-foreground/30 hover:bg-primary-foreground/50'
              )}
            />
          ))}
        </div>

        {/* CTA Button */}
        <Button
          onClick={handleNext}
          size="lg"
          className={cn(
            'w-full h-14 rounded-2xl text-base font-semibold shadow-elevated transition-all duration-300 group',
            isLastSlide 
              ? 'bg-gradient-to-r from-primary via-horus-glow to-primary hover:shadow-horus'
              : 'bg-primary hover:bg-primary/90'
          )}
        >
          <span className="flex items-center gap-2">
            {isLastSlide
              ? t('startWithAnkhu', language)
              : t('next', language)}
            <ChevronRight className={cn(
              'w-5 h-5 transition-transform duration-200',
              language === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'
            )} />
          </span>
        </Button>
      </div>
    </div>
  );
}
