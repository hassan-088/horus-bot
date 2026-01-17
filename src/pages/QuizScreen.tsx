import { useState } from 'react';
import { Check, X, Share2 } from 'lucide-react';
import { AppBar } from '@/components/layout/AppBar';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { useCloudSync } from '@/hooks/useCloudSync';
import { useShare } from '@/hooks/useShare';
import { t } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { quizQuestions } from '@/lib/data';
import { useNavigate } from 'react-router-dom';

export default function QuizScreen() {
  const navigate = useNavigate();
  const { language, completeQuiz: completeQuizLocal } = useApp();
  const { user } = useAuth();
  const { completeQuiz: completeQuizCloud } = useCloudSync();
  const { shareQuizScore } = useShare();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const question = quizQuestions[currentIndex];
  const progress = ((currentIndex + 1) / quizQuestions.length) * 100;
  const isAnswered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === question.correctAnswer;
  const passed = correctCount >= Math.ceil(quizQuestions.length / 2);

  const handleSelectAnswer = (optionId: string) => {
    if (isAnswered) return;
    setSelectedAnswer(optionId);
    if (optionId === question.correctAnswer) {
      setCorrectCount((c) => c + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
    } else {
      // Save quiz completion to context and cloud
      const finalScore = selectedAnswer === question.correctAnswer 
        ? correctCount + 1 
        : correctCount;
      completeQuizLocal(finalScore);
      if (user) {
        completeQuizCloud(finalScore);
      }
      setShowResult(true);
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setCorrectCount(0);
    setShowResult(false);
  };

  const handleFinish = () => {
    navigate('/home');
  };

  return (
    <PageContainer>
      <AppBar title={t('quizTitle', language)} showBack />

      <div className="p-4 space-y-6">
        {/* Progress */}
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground text-center">
            {t('question', language)} {currentIndex + 1}/{quizQuestions.length}
          </p>
        </div>

        {/* Question */}
        <div className="bg-card rounded-2xl p-6 shadow-soft">
          <h2 className="text-xl font-semibold leading-relaxed">
            {language === 'ar' ? question.questionAr : question.questionEn}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option) => {
            const isSelected = selectedAnswer === option.id;
            const isCorrectOption = option.id === question.correctAnswer;
            const showCorrect = isAnswered && isCorrectOption;
            const showWrong = isAnswered && isSelected && !isCorrectOption;

            return (
              <button
                key={option.id}
                onClick={() => handleSelectAnswer(option.id)}
                disabled={isAnswered}
                className={cn(
                  'flex items-center gap-4 w-full p-4 rounded-2xl border-2 transition-all',
                  !isAnswered && 'hover:border-primary hover:bg-primary/5',
                  !isAnswered && !isSelected && 'border-border bg-card',
                  showCorrect && 'border-success bg-success/10',
                  showWrong && 'border-destructive bg-destructive/10',
                  isAnswered && !showCorrect && !showWrong && 'border-border bg-card opacity-50'
                )}
              >
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center font-semibold',
                    showCorrect && 'bg-success text-white',
                    showWrong && 'bg-destructive text-white',
                    !showCorrect && !showWrong && 'bg-muted'
                  )}
                >
                  {showCorrect ? (
                    <Check className="w-5 h-5" />
                  ) : showWrong ? (
                    <X className="w-5 h-5" />
                  ) : (
                    option.id.toUpperCase()
                  )}
                </div>
                <span className="flex-1 text-left font-medium">
                  {language === 'ar' ? option.textAr : option.textEn}
                </span>
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <Button
          onClick={handleNext}
          disabled={!isAnswered}
          className="w-full h-14 rounded-2xl text-base font-semibold"
        >
          {currentIndex === quizQuestions.length - 1
            ? t('finish', language)
            : t('next', language)}
        </Button>
      </div>

      {/* Result Dialog */}
      <Dialog open={showResult} onOpenChange={setShowResult}>
        <DialogContent className="max-w-sm rounded-2xl text-center">
          <DialogHeader>
            <DialogTitle className="text-3xl">
              {passed ? t('greatJob', language) : t('keepLearning', language)}
            </DialogTitle>
            <DialogDescription className="text-lg">
              {language === 'ar'
                ? `حصلت على ${correctCount} من ${quizQuestions.length}`
                : `You got ${correctCount} out of ${quizQuestions.length}`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col gap-2 sm:flex-col">
            <Button 
              variant="outline" 
              onClick={() => shareQuizScore(correctCount, quizQuestions.length)} 
              className="w-full"
            >
              <Share2 className="w-4 h-4 mr-2" />
              {language === 'ar' ? 'شارك النتيجة' : 'Share Score'}
            </Button>
            <div className="flex gap-2 w-full">
              <Button variant="outline" onClick={handleRetry} className="flex-1">
                {t('retry', language)}
              </Button>
              <Button onClick={handleFinish} className="flex-1">
                {t('finish', language)}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
}

