import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Bot, Compass, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import onboardingImage from '@/assets/onboarding.jpg';

const slides = [
  { icon: Bot, titleKey: 'meetAnkhu' as const, descKey: 'meetAnkhuDesc' as const },
  { icon: Compass, titleKey: 'automaticTour' as const, descKey: 'automaticTourDesc' as const },
  { icon: BookOpen, titleKey: 'exploreLearn' as const, descKey: 'exploreLearnDesc' as const },
];

export default function OnboardingScreen() {
  const navigate = useNavigate();
  const { language, setLanguage, completeOnboarding } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleComplete = () => {
    completeOnboarding();
    navigate('/home', { replace: true });
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      handleComplete();
    }
  };

  const CurrentIcon = slides[currentSlide].icon;

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${onboardingImage})` }}
      />
      <div className="absolute inset-0 gradient-onboarding" />

      {/* Language Toggle */}
      <button
        onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
        className="absolute top-6 right-6 z-20 flex items-center gap-2 px-3 py-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-colors"
      >
        <Globe className="w-4 h-4 text-white" />
        <span className="text-sm text-white font-medium">
          {language === 'en' ? 'العربية' : 'EN'}
        </span>
      </button>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 text-center">
        {/* Icon */}
        <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-8 animate-fade-in-up">
          <CurrentIcon className="w-12 h-12 text-white" />
        </div>

        {/* Text */}
        <div key={currentSlide} className="animate-fade-in-up">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t(slides[currentSlide].titleKey, language)}
          </h2>
          <p className="text-white/80 text-lg max-w-sm mx-auto leading-relaxed">
            {t(slides[currentSlide].descKey, language)}
          </p>
        </div>
      </div>

      {/* Bottom Area */}
      <div className="relative z-10 p-6 pb-10 space-y-6">
        {/* Dots */}
        <div className="flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                index === currentSlide
                  ? 'w-6 bg-white'
                  : 'w-2 bg-white/40 hover:bg-white/60'
              )}
            />
          ))}
        </div>

        {/* CTA Button */}
        <Button
          onClick={handleNext}
          className="w-full h-14 rounded-2xl text-base font-semibold shadow-elevated"
        >
          {currentSlide === slides.length - 1
            ? t('startWithAnkhu', language)
            : t('next', language)}
        </Button>
      </div>
    </div>
  );
}
