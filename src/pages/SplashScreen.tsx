import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import gemImage from '@/assets/gem.jpg';
import ankhImage from '@/assets/ankh.png';

export default function SplashScreen() {
  const navigate = useNavigate();
  const { onboardingCompleted, language } = useApp();
  const [stage, setStage] = useState<'initial' | 'reveal' | 'exit'>('initial');

  useEffect(() => {
    // Stage progression
    const revealTimer = setTimeout(() => setStage('reveal'), 300);
    const exitTimer = setTimeout(() => setStage('exit'), 2200);
    const navTimer = setTimeout(() => {
      if (onboardingCompleted) {
        navigate('/home', { replace: true });
      } else {
        navigate('/onboarding', { replace: true });
      }
    }, 2800);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(exitTimer);
      clearTimeout(navTimer);
    };
  }, [navigate, onboardingCompleted]);

  const isRTL = language === 'ar';

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-foreground">
      {/* Background Image with parallax feel */}
      <div
        className={cn(
          'absolute inset-0 bg-cover bg-center transition-all duration-[2000ms] ease-out-expo',
          stage === 'initial' && 'scale-110 opacity-0',
          stage === 'reveal' && 'scale-100 opacity-100',
          stage === 'exit' && 'scale-95 opacity-0'
        )}
        style={{ backgroundImage: `url(${gemImage})` }}
      />
      
      {/* Cinematic gradient overlay */}
      <div className="absolute inset-0 gradient-dark-overlay" />
      
      {/* Decorative light rays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={cn(
          'absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] transition-all duration-[2000ms] ease-out-expo',
          stage === 'reveal' ? 'opacity-20 scale-100' : 'opacity-0 scale-50'
        )}>
          <div className="absolute inset-0 bg-gradient-radial from-horus-gold/40 via-primary/20 to-transparent rounded-full blur-3xl" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-8 flex flex-col items-center">
        {/* Horus-Bot Icon - Floating entrance */}
        <div className={cn(
          'mb-8 transition-all duration-700 ease-out-expo',
          stage === 'initial' && 'opacity-0 scale-50 translate-y-8',
          stage === 'reveal' && 'opacity-100 scale-100 translate-y-0',
          stage === 'exit' && 'opacity-0 scale-110 -translate-y-8'
        )}>
          <div className="relative">
            {/* Glow ring */}
            <div className="absolute inset-[-12px] rounded-full bg-gradient-radial from-horus-gold/30 via-primary/20 to-transparent animate-breathe" />
            
            {/* Avatar container */}
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary via-horus-glow to-primary flex items-center justify-center shadow-horus">
              <img
                src={ankhImage}
                alt="Horus-Bot"
                className="w-12 h-12 drop-shadow-lg animate-float-gentle"
              />
            </div>
            
            {/* Orbiting particles */}
            <div className="absolute inset-0 animate-orbit">
              <div className="w-2 h-2 rounded-full bg-horus-gold shadow-gold" />
            </div>
          </div>
        </div>

        {/* Title - Staggered reveal */}
        <div className={cn(
          'transition-all duration-700 ease-out-expo',
          stage === 'initial' && 'opacity-0 translate-y-6',
          stage === 'reveal' && 'opacity-100 translate-y-0',
          stage === 'exit' && 'opacity-0 -translate-y-4'
        )} style={{ transitionDelay: stage === 'reveal' ? '100ms' : '0ms' }}>
          {!isRTL && (
            <span className="block text-primary-foreground/70 text-lg font-light tracking-widest uppercase mb-2">
              {t('the', language)}
            </span>
          )}
          <h1 className="font-display text-primary-foreground">
            <span className="block text-display-lg font-semibold leading-none">
              {t('egyptian', language)}
            </span>
            <span className="block text-display-md font-normal leading-none mt-1 gradient-text-gold">
              {t('museums', language)}
            </span>
          </h1>
        </div>
        
        {/* Tagline */}
        <p className={cn(
          'mt-8 text-primary-foreground/60 text-base max-w-[280px] mx-auto leading-relaxed transition-all duration-700 ease-out-expo',
          stage === 'initial' && 'opacity-0 translate-y-6',
          stage === 'reveal' && 'opacity-100 translate-y-0',
          stage === 'exit' && 'opacity-0'
        )} style={{ transitionDelay: stage === 'reveal' ? '200ms' : '0ms' }}>
          {t('splashTagline', language)}
        </p>
      </div>

      {/* Loading indicator - Bottom */}
      <div className={cn(
        'absolute bottom-16 left-1/2 -translate-x-1/2 transition-all duration-500',
        stage === 'reveal' ? 'opacity-100' : 'opacity-0'
      )}>
        <div className="flex items-center gap-4">
          {/* Progress bar */}
          <div className="w-32 h-1 rounded-full bg-primary-foreground/20 overflow-hidden">
            <div 
              className={cn(
                'h-full bg-gradient-to-r from-primary via-horus-gold to-primary rounded-full transition-all duration-[2000ms] ease-out-expo',
                stage === 'reveal' ? 'w-full' : 'w-0'
              )}
            />
          </div>
        </div>
      </div>

      {/* Corner branding */}
      <div className={cn(
        'absolute bottom-6 left-0 right-0 flex justify-center transition-all duration-500',
        stage === 'reveal' ? 'opacity-60' : 'opacity-0'
      )}>
        <span className="text-xs text-primary-foreground/50 tracking-wider">
          Powered by <span className="font-medium text-horus-gold/70">Horus-Bot</span>
        </span>
      </div>
    </div>
  );
}
