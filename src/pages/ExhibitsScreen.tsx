import { useNavigate } from 'react-router-dom';
import { ChevronRight, Landmark } from 'lucide-react';
import { AppBar } from '@/components/layout/AppBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { PageContainer } from '@/components/layout/PageContainer';
import { FloatingChatButton } from '@/components/chat/FloatingChatButton';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';
import { exhibits } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function ExhibitsScreen() {
  const navigate = useNavigate();
  const { language, isRTL } = useApp();

  return (
    <PageContainer>
      <AppBar title={t('exhibitsList', language)} showBack />

      <div className="p-4 space-y-3">
        {exhibits.map((exhibit, index) => (
          <button
            key={exhibit.id}
            onClick={() => navigate(`/exhibit_details?id=${exhibit.id}`)}
            className={`flex items-center gap-4 w-full p-4 bg-card rounded-2xl shadow-soft hover-lift press-effect group opacity-0 animate-slide-up-fade stagger-${Math.min(index + 1, 6)}`}
            style={{ animationFillMode: 'forwards' }}
          >
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-105">
              <Landmark className="w-7 h-7 text-primary transition-transform duration-300 group-hover:scale-110" />
            </div>
            
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-foreground transition-colors duration-200 group-hover:text-primary">
                {language === 'ar' ? exhibit.nameAr : exhibit.nameEn}
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                {t('mainGallery', language)}
              </p>
            </div>

            <ChevronRight className={cn(
              'w-5 h-5 text-muted-foreground flex-shrink-0 transition-all duration-300 group-hover:text-primary group-hover:translate-x-1',
              isRTL && 'rotate-180 group-hover:-translate-x-1'
            )} />
          </button>
        ))}
      </div>

      <FloatingChatButton />
      <BottomNav />
    </PageContainer>
  );
}
