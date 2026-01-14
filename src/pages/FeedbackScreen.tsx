import { useState } from 'react';
import { AppBar } from '@/components/layout/AppBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';

export default function FeedbackScreen() {
  const { language } = useApp();
  const { toast } = useToast();
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    if (feedback.trim()) {
      toast({ description: t('feedbackThanks', language) });
      setFeedback('');
    }
  };

  return (
    <PageContainer>
      <AppBar title={t('feedbackTitle', language)} showBack />
      <div className="p-4 space-y-4">
        <Textarea value={feedback} onChange={e => setFeedback(e.target.value)} placeholder={t('feedbackPlaceholder', language)} className="min-h-[200px] rounded-2xl" />
        <Button onClick={handleSubmit} className="w-full h-12 rounded-xl">{t('submitFeedback', language)}</Button>
      </div>
      <BottomNav />
    </PageContainer>
  );
}
