import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/contexts/AppContext';

interface ShareData {
  title: string;
  text: string;
  url?: string;
}

export function useShare() {
  const { toast } = useToast();
  const { language } = useApp();

  const share = useCallback(async (data: ShareData) => {
    const shareUrl = data.url || window.location.href;
    
    // Check if Web Share API is available
    if (navigator.share) {
      try {
        await navigator.share({
          title: data.title,
          text: data.text,
          url: shareUrl,
        });
        return true;
      } catch (error) {
        // User cancelled or error occurred
        if ((error as Error).name !== 'AbortError') {
          console.error('Share failed:', error);
        }
        return false;
      }
    } else {
      // Fallback: copy to clipboard
      try {
        const shareText = `${data.title}\n${data.text}\n${shareUrl}`;
        await navigator.clipboard.writeText(shareText);
        toast({
          description: language === 'ar' 
            ? 'تم نسخ الرابط!' 
            : 'Link copied to clipboard!',
        });
        return true;
      } catch (error) {
        toast({
          description: language === 'ar' 
            ? 'فشل النسخ' 
            : 'Failed to copy',
          variant: 'destructive',
        });
        return false;
      }
    }
  }, [toast, language]);

  const shareExhibit = useCallback((
    exhibitName: string, 
    exhibitId: string
  ) => {
    return share({
      title: exhibitName,
      text: language === 'ar' 
        ? `اكتشف ${exhibitName} في المتحف المصري!` 
        : `Check out ${exhibitName} at the Egyptian Museum!`,
      url: `${window.location.origin}/exhibit_details?id=${exhibitId}`,
    });
  }, [share, language]);

  const shareQuizScore = useCallback((
    score: number, 
    total: number
  ) => {
    const percentage = Math.round((score / total) * 100);
    return share({
      title: language === 'ar' ? 'نتيجة اختبار المتحف' : 'Museum Quiz Result',
      text: language === 'ar' 
        ? `حصلت على ${score} من ${total} (${percentage}%) في اختبار المتحف المصري! هل يمكنك التفوق علي؟` 
        : `I scored ${score}/${total} (${percentage}%) on the Egyptian Museum quiz! Can you beat my score?`,
      url: `${window.location.origin}/quiz`,
    });
  }, [share, language]);

  return { share, shareExhibit, shareQuizScore };
}
