import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Landmark, History } from 'lucide-react';
import { AppBar } from '@/components/layout/AppBar';
import { PageContainer } from '@/components/layout/PageContainer';
import { EmptyState } from '@/components/ui/empty-state';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useCloudSync } from '@/hooks/useCloudSync';
import { useApp } from '@/contexts/AppContext';
import { exhibits } from '@/lib/data';
import { cn } from '@/lib/utils';
import { ListSkeleton } from '@/components/ui/loading-skeleton';

export default function VisitHistoryScreen() {
  const navigate = useNavigate();
  const { language, isRTL } = useApp();
  const { visitHistory, progress, isLoading } = useCloudSync();

  // Group visits by date
  const groupedVisits = visitHistory.reduce((groups, visit) => {
    const date = new Date(visit.visited_at).toLocaleDateString(
      language === 'ar' ? 'ar-EG' : 'en-US',
      { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    );
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(visit);
    return groups;
  }, {} as Record<string, typeof visitHistory>);

  const getExhibit = (id: string) => exhibits.find(e => e.id === id);

  return (
    <ProtectedRoute title={language === 'ar' ? 'سجل الزيارات' : 'Visit History'}>
      <PageContainer>
        <AppBar 
          title={language === 'ar' ? 'سجل الزيارات' : 'Visit History'} 
          showBack 
        />

        <div className="p-4 space-y-6">
          {/* Stats Header */}
          {progress && (
            <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-2xl p-5">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-primary">{progress.streak_days}</p>
                  <p className="text-xs text-muted-foreground">
                    {language === 'ar' ? 'أيام متتالية' : 'Day Streak'}
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{progress.total_visits}</p>
                  <p className="text-xs text-muted-foreground">
                    {language === 'ar' ? 'إجمالي الزيارات' : 'Total Visits'}
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{progress.visited_exhibits.length}</p>
                  <p className="text-xs text-muted-foreground">
                    {language === 'ar' ? 'معروضات' : 'Exhibits'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Timeline */}
          {isLoading ? (
            <ListSkeleton count={5} />
          ) : visitHistory.length === 0 ? (
            <EmptyState
              icon={History}
              title={language === 'ar' ? 'لا يوجد سجل بعد' : 'No history yet'}
              description={language === 'ar' 
                ? 'ابدأ في استكشاف المعروضات لتتبع زياراتك'
                : 'Start exploring exhibits to track your visits'
              }
              actionLabel={language === 'ar' ? 'استكشف المعروضات' : 'Explore Exhibits'}
              onAction={() => navigate('/exhibits')}
            />
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedVisits).map(([date, visits]) => (
                <div key={date}>
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-semibold text-muted-foreground">{date}</h3>
                  </div>
                  
                  <div className="space-y-2 relative">
                    {/* Timeline line */}
                    <div className={cn(
                      'absolute top-0 bottom-0 w-0.5 bg-border',
                      isRTL ? 'right-5' : 'left-5'
                    )} />
                    
                    {visits.map((visit, index) => {
                      const exhibit = getExhibit(visit.exhibit_id);
                      if (!exhibit) return null;
                      
                      const time = new Date(visit.visited_at).toLocaleTimeString(
                        language === 'ar' ? 'ar-EG' : 'en-US',
                        { hour: '2-digit', minute: '2-digit' }
                      );

                      return (
                        <button
                          key={visit.id}
                          onClick={() => navigate(`/exhibit_details?id=${exhibit.id}`)}
                          className={cn(
                            'flex items-center gap-4 w-full p-3 bg-card rounded-xl shadow-soft hover:shadow-card transition-all opacity-0 animate-slide-up-fade',
                            isRTL ? 'flex-row-reverse' : ''
                          )}
                          style={{ 
                            animationFillMode: 'forwards',
                            animationDelay: `${index * 50}ms`
                          }}
                        >
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center z-10 flex-shrink-0">
                            <Landmark className="w-5 h-5 text-primary" />
                          </div>
                          
                          <div className={cn('flex-1', isRTL ? 'text-right' : 'text-left')}>
                            <h4 className="font-semibold text-foreground">
                              {language === 'ar' ? exhibit.nameAr : exhibit.nameEn}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {language === 'ar' ? exhibit.galleryAr : exhibit.galleryEn}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                            <Clock className="w-3 h-3" />
                            {time}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </PageContainer>
    </ProtectedRoute>
  );
}
