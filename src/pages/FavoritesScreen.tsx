import { useNavigate } from 'react-router-dom';
import { ChevronRight, Heart, Landmark, Trash2, Cloud, CloudOff } from 'lucide-react';
import { AppBar } from '@/components/layout/AppBar';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { ListSkeleton } from '@/components/ui/loading-skeleton';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useCloudSync } from '@/hooks/useCloudSync';
import { useApp } from '@/contexts/AppContext';
import { exhibits } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function FavoritesScreen() {
  const navigate = useNavigate();
  const { language, isRTL } = useApp();
  const { favorites, toggleFavorite, isLoading, isSyncing, isLoggedIn } = useCloudSync();

  const favoriteExhibits = exhibits.filter(e => favorites.includes(e.id));

  return (
    <ProtectedRoute 
      title={language === 'ar' ? 'المفضلة' : 'Favorites'}
      message={language === 'ar' 
        ? 'سجل الدخول لحفظ معروضاتك المفضلة ومزامنتها'
        : 'Sign in to save and sync your favorite exhibits'
      }
    >
      <PageContainer>
        <AppBar 
          title={language === 'ar' ? 'المفضلة' : 'Favorites'} 
          showBack 
          rightContent={
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {isSyncing ? (
                <Cloud className="w-4 h-4 animate-pulse text-primary" />
              ) : isLoggedIn ? (
                <Cloud className="w-4 h-4 text-success" />
              ) : (
                <CloudOff className="w-4 h-4" />
              )}
            </div>
          }
        />

        <div className="p-4">
          {isLoading ? (
            <ListSkeleton count={3} />
          ) : favoriteExhibits.length === 0 ? (
            <EmptyState
              icon={Heart}
              title={language === 'ar' ? 'لا توجد مفضلات بعد' : 'No favorites yet'}
              description={language === 'ar' 
                ? 'احفظ المعروضات المفضلة لديك للوصول السريع'
                : 'Save your favorite exhibits for quick access'
              }
              actionLabel={language === 'ar' ? 'تصفح المعروضات' : 'Browse Exhibits'}
              onAction={() => navigate('/exhibits')}
            />
          ) : (
            <div className="space-y-3">
              {favoriteExhibits.map((exhibit, index) => (
                <div
                  key={exhibit.id}
                  className={`flex items-center gap-3 w-full p-4 bg-card rounded-2xl shadow-soft opacity-0 animate-slide-up-fade stagger-${Math.min(index + 1, 6)}`}
                  style={{ animationFillMode: 'forwards' }}
                >
                  <button
                    onClick={() => navigate(`/exhibit_details?id=${exhibit.id}`)}
                    className="flex items-center gap-4 flex-1 hover-lift group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary/20">
                      <Landmark className="w-6 h-6 text-primary" />
                    </div>
                    
                    <div className={cn('flex-1', isRTL ? 'text-right' : 'text-left')}>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {language === 'ar' ? exhibit.nameAr : exhibit.nameEn}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {language === 'ar' ? exhibit.galleryAr : exhibit.galleryEn}
                      </p>
                    </div>

                    <ChevronRight className={cn(
                      'w-5 h-5 text-muted-foreground flex-shrink-0 transition-all duration-300 group-hover:text-primary group-hover:translate-x-1',
                      isRTL && 'rotate-180 group-hover:-translate-x-1'
                    )} />
                  </button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFavorite(exhibit.id)}
                    disabled={isSyncing}
                    className="flex-shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              
              <p className="text-center text-xs text-muted-foreground pt-4 flex items-center justify-center gap-1">
                <Cloud className="w-3 h-3" />
                {language === 'ar' ? 'تتم المزامنة تلقائياً' : 'Synced to your account'}
              </p>
            </div>
          )}
        </div>
      </PageContainer>
    </ProtectedRoute>
  );
}
