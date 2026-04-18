import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';
import gemImage from '@/assets/gem.jpg';

export default function SplashScreen() {
  const navigate = useNavigate();
  const { onboardingCompleted, language } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onboardingCompleted) {
        navigate('/home', { replace: true });
      } else {
        navigate('/onboarding', { replace: true });
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate, onboardingCompleted]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${gemImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 gradient-dark-overlay" />

      {/* Gold radial wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.25),transparent_60%)]" />

      {/* Content */}
      <div className="relative z-10 text-center px-8 animate-fade-in-scale">
        <h1 className="font-serif text-foreground">
          <span className="block text-3xl opacity-90 mb-1 tracking-widest uppercase text-primary">
            {t('the', language)}
          </span>
          <span className="block text-5xl font-bold mb-1">
            {t('egyptian', language)}
          </span>
          <span className="block text-5xl font-bold">
            {t('museums', language)}
          </span>
        </h1>
        
        <p className="mt-6 text-muted-foreground text-lg max-w-xs mx-auto leading-relaxed">
          {t('splashTagline', language)}
        </p>
      </div>

      {/* Loading indicator */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 bg-white/60 rounded-full animate-typing-dot" />
          <span className="w-2 h-2 bg-white/60 rounded-full animate-typing-dot-delay-1" />
          <span className="w-2 h-2 bg-white/60 rounded-full animate-typing-dot-delay-2" />
        </div>
      </div>
    </div>
  );
}
