import { AppBar } from '@/components/layout/AppBar';
import { PageContainer } from '@/components/layout/PageContainer';
import { useApp } from '@/contexts/AppContext';
import { exhibits, quizQuestions } from '@/lib/data';
import { cn } from '@/lib/utils';
import { 
  Trophy, 
  Eye, 
  Brain, 
  Star, 
  Map as MapIcon, 
  MessageCircle,
  Ticket,
  Camera,
  Award,
  Lock
} from 'lucide-react';

interface Achievement {
  id: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  icon: React.ElementType;
  color: string;
  checkUnlocked: (state: {
    visitedExhibits: string[];
    savedExhibits: string[];
    quizCompleted: boolean;
    quizScore: number;
    tickets: any[];
  }) => boolean;
  getProgress?: (state: any) => { current: number; total: number };
}

const achievements: Achievement[] = [
  {
    id: 'first-steps',
    nameEn: 'First Steps',
    nameAr: 'الخطوات الأولى',
    descriptionEn: 'Visit your first exhibit',
    descriptionAr: 'قم بزيارة أول معروض',
    icon: Eye,
    color: 'bg-emerald-500',
    checkUnlocked: (s) => s.visitedExhibits.length >= 1,
  },
  {
    id: 'curious-explorer',
    nameEn: 'Curious Explorer',
    nameAr: 'المستكشف الفضولي',
    descriptionEn: 'Visit 3 exhibits',
    descriptionAr: 'قم بزيارة 3 معروضات',
    icon: MapIcon,
    color: 'bg-blue-500',
    checkUnlocked: (s) => s.visitedExhibits.length >= 3,
    getProgress: (s) => ({ current: Math.min(s.visitedExhibits.length, 3), total: 3 }),
  },
  {
    id: 'museum-master',
    nameEn: 'Museum Master',
    nameAr: 'سيد المتحف',
    descriptionEn: 'Visit all exhibits',
    descriptionAr: 'قم بزيارة جميع المعروضات',
    icon: Trophy,
    color: 'bg-amber-500',
    checkUnlocked: (s) => s.visitedExhibits.length >= exhibits.length,
    getProgress: (s) => ({ current: s.visitedExhibits.length, total: exhibits.length }),
  },
  {
    id: 'collector',
    nameEn: 'Collector',
    nameAr: 'الجامع',
    descriptionEn: 'Save 3 exhibits to favorites',
    descriptionAr: 'احفظ 3 معروضات في المفضلة',
    icon: Star,
    color: 'bg-pink-500',
    checkUnlocked: (s) => s.savedExhibits.length >= 3,
    getProgress: (s) => ({ current: Math.min(s.savedExhibits.length, 3), total: 3 }),
  },
  {
    id: 'quiz-taker',
    nameEn: 'Quiz Taker',
    nameAr: 'المختبر',
    descriptionEn: 'Complete your first quiz',
    descriptionAr: 'أكمل أول اختبار',
    icon: Brain,
    color: 'bg-purple-500',
    checkUnlocked: (s) => s.quizCompleted,
  },
  {
    id: 'scholar',
    nameEn: 'Scholar',
    nameAr: 'العالم',
    descriptionEn: 'Score 100% on a quiz',
    descriptionAr: 'احصل على 100% في الاختبار',
    icon: Award,
    color: 'bg-indigo-500',
    checkUnlocked: (s) => s.quizScore === quizQuestions.length,
  },
  {
    id: 'chatty',
    nameEn: 'Chatty',
    nameAr: 'الثرثار',
    descriptionEn: 'Talk to Horus-Bot',
    descriptionAr: 'تحدث مع حورس-بوت',
    icon: MessageCircle,
    color: 'bg-cyan-500',
    checkUnlocked: () => false, // Would need chat tracking
  },
  {
    id: 'ticket-holder',
    nameEn: 'Ticket Holder',
    nameAr: 'حامل التذكرة',
    descriptionEn: 'Purchase museum tickets',
    descriptionAr: 'اشترِ تذاكر المتحف',
    icon: Ticket,
    color: 'bg-orange-500',
    checkUnlocked: (s) => s.tickets.length > 0,
  },
  {
    id: 'ar-explorer',
    nameEn: 'AR Explorer',
    nameAr: 'مستكشف الواقع المعزز',
    descriptionEn: 'Use the AR view feature',
    descriptionAr: 'استخدم ميزة الواقع المعزز',
    icon: Camera,
    color: 'bg-rose-500',
    checkUnlocked: () => false, // Would need AR tracking
  },
];

export default function AchievementsScreen() {
  const { language, visitedExhibits, savedExhibits, tickets, quizCompleted, quizScore } = useApp();

  const state = {
    visitedExhibits,
    savedExhibits,
    quizCompleted: quizCompleted || false,
    quizScore: quizScore || 0,
    tickets,
  };

  const unlockedCount = achievements.filter(a => a.checkUnlocked(state)).length;

  return (
    <PageContainer>
      <AppBar 
        title={language === 'ar' ? 'الإنجازات' : 'Achievements'} 
        showBack 
      />

      <div className="p-4 space-y-6">
        {/* Progress Header */}
        <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-2xl p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary/20 flex items-center justify-center">
            <Trophy className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            {unlockedCount} / {achievements.length}
          </h2>
          <p className="text-muted-foreground mt-1">
            {language === 'ar' ? 'الإنجازات المفتوحة' : 'Achievements Unlocked'}
          </p>
          
          {/* Progress Bar */}
          <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-3 gap-3">
          {achievements.map((achievement, index) => {
            const isUnlocked = achievement.checkUnlocked(state);
            const progress = achievement.getProgress?.(state);
            const Icon = achievement.icon;

            return (
              <div
                key={achievement.id}
                className={cn(
                  'relative flex flex-col items-center p-4 rounded-2xl transition-all duration-300 opacity-0 animate-slide-up-fade',
                  isUnlocked 
                    ? 'bg-card shadow-soft' 
                    : 'bg-muted/50'
                )}
                style={{ 
                  animationFillMode: 'forwards',
                  animationDelay: `${index * 50}ms`
                }}
              >
                {/* Badge Icon */}
                <div className={cn(
                  'w-14 h-14 rounded-full flex items-center justify-center mb-2 transition-all duration-300',
                  isUnlocked ? achievement.color : 'bg-muted'
                )}>
                  {isUnlocked ? (
                    <Icon className="w-7 h-7 text-white" />
                  ) : (
                    <Lock className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>

                {/* Name */}
                <h3 className={cn(
                  'text-xs font-semibold text-center leading-tight',
                  isUnlocked ? 'text-foreground' : 'text-muted-foreground'
                )}>
                  {language === 'ar' ? achievement.nameAr : achievement.nameEn}
                </h3>

                {/* Progress indicator */}
                {progress && !isUnlocked && (
                  <div className="mt-2 w-full">
                    <div className="h-1 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary/50 rounded-full"
                        style={{ width: `${(progress.current / progress.total) * 100}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-muted-foreground text-center mt-1">
                      {progress.current}/{progress.total}
                    </p>
                  </div>
                )}

                {/* Unlocked checkmark */}
                {isUnlocked && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Tip */}
        <p className="text-center text-sm text-muted-foreground">
          {language === 'ar' 
            ? 'استكشف المتحف لفتح المزيد من الإنجازات!'
            : 'Explore the museum to unlock more achievements!'
          }
        </p>
      </div>
    </PageContainer>
  );
}
