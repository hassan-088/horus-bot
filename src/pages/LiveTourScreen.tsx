import { useState, useEffect } from 'react';
import { Radio } from 'lucide-react';
import { AppBar } from '@/components/layout/AppBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { PageContainer } from '@/components/layout/PageContainer';
import { FloatingChatButton } from '@/components/chat/FloatingChatButton';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { exhibits, liveTranscriptLines } from '@/lib/data';
import exhibitGoldenMask from '@/assets/exhibit-golden-mask.jpg';

export default function LiveTourScreen() {
  const { language } = useApp();
  const [transcriptIndex, setTranscriptIndex] = useState(0);
  const lines = liveTranscriptLines[language];

  const currentExhibit = exhibits[0]; // Golden mask

  // Simulate live transcript
  useEffect(() => {
    const interval = setInterval(() => {
      setTranscriptIndex((i) => (i < lines.length - 1 ? i + 1 : i));
    }, 3000);
    return () => clearInterval(interval);
  }, [lines.length]);

  return (
    <PageContainer>
      <AppBar title={t('liveTourTitle', language)} showBack />

      <div className="p-4 space-y-4">
        {/* Live Banner */}
        <div className="flex items-center justify-center gap-2 py-3 bg-destructive/10 rounded-xl">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive" />
          </span>
          <span className="font-semibold text-destructive">{t('live', language)}</span>
        </div>

        {/* Current Exhibit Card */}
        <div className="bg-card rounded-2xl overflow-hidden shadow-card">
          <div className="relative h-48">
            <img
              src={exhibitGoldenMask}
              alt={language === 'ar' ? currentExhibit.nameAr : currentExhibit.nameEn}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2 mb-2">
                <Radio className="w-4 h-4 text-primary" />
                <span className="text-xs text-white/80">
                  {t('explaining', language)}...
                </span>
              </div>
              <h2 className="text-xl font-bold text-white">
                {language === 'ar' ? currentExhibit.nameAr : currentExhibit.nameEn}
              </h2>
            </div>
          </div>
        </div>

        {/* Transcript Card */}
        <div className="bg-card rounded-2xl p-4 shadow-soft">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            {t('liveTranscript', language)}
          </h3>
          
          <div className="space-y-3">
            {lines.slice(0, transcriptIndex + 1).map((line, index) => {
              const isLatest = index === transcriptIndex;
              return (
                <div
                  key={index}
                  className={cn(
                    'p-3 rounded-xl border-2 transition-all duration-300',
                    isLatest
                      ? 'border-primary/50 bg-primary/5 animate-fade-in-up'
                      : 'border-transparent'
                  )}
                >
                  <p className={cn(
                    'text-sm leading-relaxed',
                    isLatest ? 'text-foreground font-medium' : 'text-muted-foreground'
                  )}>
                    {line}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Accessibility Note */}
        <p className="text-xs text-center text-muted-foreground px-4">
          {language === 'ar'
            ? 'يمكنك كتم صوت الروبوت وقراءة النص المباشر'
            : 'You can mute the robot and read the live transcript'}
        </p>
      </div>

      <FloatingChatButton />
      <BottomNav />
    </PageContainer>
  );
}
