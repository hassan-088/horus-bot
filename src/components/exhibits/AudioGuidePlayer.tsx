import { Play, Pause, Square, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAudioGuide } from '@/hooks/useAudioGuide';
import { cn } from '@/lib/utils';

interface AudioGuidePlayerProps {
  text: string;
  lang: 'en' | 'ar';
  className?: string;
}

export function AudioGuidePlayer({ text, lang, className }: AudioGuidePlayerProps) {
  const { isPlaying, isPaused, progress, isSupported, toggle, stop } = useAudioGuide({
    text,
    lang,
    rate: 0.85,
  });

  const isArabic = lang === 'ar';

  if (!isSupported) {
    return (
      <div className={cn('flex items-center gap-3 p-4 bg-muted/50 rounded-2xl', className)}>
        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
          <VolumeX className="w-6 h-6 text-muted-foreground" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">
            {isArabic ? 'الدليل الصوتي غير متاح في هذا المتصفح' : 'Audio guide not supported in this browser'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('p-4 bg-card rounded-2xl shadow-soft', className)}>
      <div className="flex items-center gap-4">
        {/* Play/Pause Button */}
        <Button
          size="icon"
          variant={isPlaying ? 'default' : 'outline'}
          className={cn(
            'w-14 h-14 rounded-xl transition-all duration-300',
            isPlaying && 'bg-primary animate-glow-pulse'
          )}
          onClick={toggle}
        >
          {isPlaying && !isPaused ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 ml-0.5" />
          )}
        </Button>

        {/* Info & Progress */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className={cn(
                'w-4 h-4 transition-colors',
                isPlaying ? 'text-primary' : 'text-muted-foreground'
              )} />
              <span className="font-medium text-sm">
                {isArabic ? 'الدليل الصوتي' : 'Audio Guide'}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              {isPlaying 
                ? (isPaused 
                    ? (isArabic ? 'متوقف مؤقتاً' : 'Paused') 
                    : (isArabic ? 'جاري التشغيل...' : 'Playing...'))
                : (isArabic ? 'اضغط للاستماع' : 'Tap to listen')
              }
            </span>
          </div>
          
          <Progress 
            value={progress} 
            className={cn('h-1.5', isPlaying && 'bg-primary/20')}
          />
        </div>

        {/* Stop Button (only visible when playing) */}
        {isPlaying && (
          <Button
            size="icon"
            variant="ghost"
            className="w-10 h-10 rounded-xl"
            onClick={stop}
          >
            <Square className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
