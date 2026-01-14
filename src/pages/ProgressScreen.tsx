import { useNavigate } from 'react-router-dom';
import { CheckCircle, Circle, Clock, Trophy } from 'lucide-react';
import { AppBar } from '@/components/layout/AppBar';
import { PageContainer } from '@/components/layout/PageContainer';
import { Progress } from '@/components/ui/progress';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { exhibits } from '@/lib/data';


export default function ProgressScreen() {
  const navigate = useNavigate();
  const { language, visitedExhibits, isRTL } = useApp();

  const visitedCount = visitedExhibits.length;
  const totalCount = exhibits.length;
  const progressPercent = (visitedCount / totalCount) * 100;

  const visitedList = exhibits.filter((e) => visitedExhibits.includes(e.id));
  const notVisitedList = exhibits.filter((e) => !visitedExhibits.includes(e.id));

  return (
    <PageContainer>
      <AppBar title={t('tourProgress', language)} showBack />

      <div className="p-4 space-y-6">
        {/* Overview Card */}
        <div className="bg-card rounded-2xl p-6 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">
              {visitedCount}/{totalCount} {t('visited', language)}
            </span>
            <Trophy className="w-6 h-6 text-warning" />
          </div>
          
          <Progress value={progressPercent} className="h-3" />

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">{t('duration', language)}</p>
                <p className="font-semibold">45 min</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-success" />
              <div>
                <p className="text-xs text-muted-foreground">{t('completed', language)}</p>
                <p className="font-semibold">{visitedCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Visited Section */}
        {visitedList.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" />
              {t('visited', language)}
            </h3>
            <div className="space-y-2">
              {visitedList.map((exhibit) => (
                <button
                  key={exhibit.id}
                  onClick={() => navigate(`/exhibit_details?id=${exhibit.id}`)}
                  className="flex items-center gap-3 w-full p-3 bg-card rounded-xl shadow-soft hover:shadow-card transition-shadow"
                >
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-success" />
                  </div>
                  <span className={cn('flex-1 font-medium', isRTL ? 'text-right' : 'text-left')}>
                    {language === 'ar' ? exhibit.nameAr : exhibit.nameEn}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Not Visited Section */}
        {notVisitedList.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              <Circle className="w-4 h-4" />
              {t('notVisited', language)}
            </h3>
            <div className="space-y-2">
              {notVisitedList.map((exhibit) => (
                <button
                  key={exhibit.id}
                  onClick={() => navigate(`/exhibit_details?id=${exhibit.id}`)}
                  className="flex items-center gap-3 w-full p-3 bg-card rounded-xl shadow-soft hover:shadow-card transition-shadow opacity-70"
                >
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Circle className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <span className={cn('flex-1 font-medium', isRTL ? 'text-right' : 'text-left')}>
                    {language === 'ar' ? exhibit.nameAr : exhibit.nameEn}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
}

