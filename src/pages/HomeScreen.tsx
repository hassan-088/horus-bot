import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, Layers, Brain, Radio, MessageSquare, Globe } from 'lucide-react';
import { AppBar } from '@/components/layout/AppBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { PageContainer } from '@/components/layout/PageContainer';
import { FloatingChatButton } from '@/components/chat/FloatingChatButton';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import ankhImage from '@/assets/ankh.png';
import gemImage from '@/assets/gem.jpg';

const menuItems = [
  { icon: Map, labelKey: 'map' as const, path: '/map' },
  { icon: Layers, labelKey: 'exhibits' as const, path: '/exhibits' },
  { icon: Brain, labelKey: 'quiz' as const, path: '/quiz' },
  { icon: Radio, labelKey: 'liveTour' as const, path: '/live_tour' },
];

const settingsItems = [
  { icon: Globe, labelKey: 'language' as const, path: '/settings' },
  { icon: MessageSquare, labelKey: 'feedback' as const, path: '/feedback' },
];

export default function HomeScreen() {
  const navigate = useNavigate();
  const {
    language,
    privacyAccepted,
    tourAlertShown,
    acceptPrivacy,
    showTourAlert,
  } = useApp();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTourAlertDialog, setShowTourAlertDialog] = useState(false);

  // Privacy dialog on first visit
  useEffect(() => {
    if (!privacyAccepted) {
      const timer = setTimeout(() => setShowPrivacy(true), 500);
      return () => clearTimeout(timer);
    }
  }, [privacyAccepted]);

  // Tour alert after privacy accepted
  useEffect(() => {
    if (privacyAccepted && !tourAlertShown) {
      const timer = setTimeout(() => setShowTourAlertDialog(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [privacyAccepted, tourAlertShown]);

  const handlePrivacyAccept = () => {
    acceptPrivacy();
    setShowPrivacy(false);
  };

  const handleTourAlertDismiss = () => {
    showTourAlert();
    setShowTourAlertDialog(false);
  };

  return (
    <>
      <PageContainer background="home" className="relative overflow-hidden">
        {/* Side Menu Overlay */}
        <div
          className={cn(
            'fixed inset-0 z-40 transition-all duration-300',
            menuOpen 
              ? 'bg-foreground/30 backdrop-blur-[2px] pointer-events-auto' 
              : 'bg-transparent pointer-events-none'
          )}
          onClick={() => setMenuOpen(false)}
        />

        {/* Side Menu */}
        <div
          className={cn(
            'fixed top-0 bottom-0 z-30 w-72 transition-all duration-500 ease-out',
            language === 'ar' ? 'right-0' : 'left-0',
            menuOpen
              ? 'translate-x-0'
              : language === 'ar'
              ? 'translate-x-full'
              : '-translate-x-full'
          )}
        >
          {/* Glass background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-secondary/80 backdrop-blur-xl" />
          
          {/* Decorative gradient orb */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 -right-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
          
          {/* Menu content */}
          <div className="relative h-full flex flex-col p-6 pt-8">
            {/* Profile section */}
            <div className={cn(
              'flex items-center gap-3 mb-8 opacity-0 transition-all duration-500',
              menuOpen && 'opacity-100 translate-y-0',
              !menuOpen && '-translate-y-4'
            )} style={{ transitionDelay: menuOpen ? '150ms' : '0ms' }}>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {language === 'ar' ? 'مرحباً، ضيف' : 'Hello, Guest'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {language === 'ar' ? 'استمتع بجولتك' : 'Enjoy your tour'}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className={cn(
              'h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6 transition-all duration-500',
              menuOpen ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            )} style={{ transitionDelay: menuOpen ? '200ms' : '0ms' }} />

            {/* Explore section */}
            <div className="mb-6">
              <h3 className={cn(
                'text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 transition-all duration-500',
                menuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              )} style={{ transitionDelay: menuOpen ? '100ms' : '0ms' }}>
                {t('explore', language)}
              </h3>
              <div className="space-y-1">
                {menuItems.map(({ icon: Icon, labelKey, path }, index) => (
                  <button
                    key={path}
                    onClick={() => {
                      setMenuOpen(false);
                      navigate(path);
                    }}
                    className={cn(
                      'flex items-center gap-3 w-full px-4 py-3 rounded-xl text-foreground transition-all duration-300 group relative overflow-hidden',
                      'hover:bg-primary/10 hover:shadow-sm',
                      menuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                    )}
                    style={{ transitionDelay: menuOpen ? `${150 + index * 50}ms` : '0ms' }}
                  >
                    {/* Hover highlight */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                      <Icon className="w-5 h-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <span className="relative font-medium transition-colors duration-200 group-hover:text-primary">
                      {t(labelKey, language)}
                    </span>
                    
                    {/* Arrow indicator */}
                    <svg 
                      className={cn(
                        "w-4 h-4 text-muted-foreground/50 ml-auto transition-all duration-300 opacity-0 group-hover:opacity-100",
                        language === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'
                      )} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Settings section */}
            <div>
              <h3 className={cn(
                'text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 transition-all duration-500',
                menuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              )} style={{ transitionDelay: menuOpen ? '350ms' : '0ms' }}>
                {t('settings', language)}
              </h3>
              <div className="space-y-1">
                {settingsItems.map(({ icon: Icon, labelKey, path }, index) => (
                  <button
                    key={path}
                    onClick={() => {
                      setMenuOpen(false);
                      navigate(path);
                    }}
                    className={cn(
                      'flex items-center gap-3 w-full px-4 py-3 rounded-xl text-foreground transition-all duration-300 group relative overflow-hidden',
                      'hover:bg-primary/10 hover:shadow-sm',
                      menuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                    )}
                    style={{ transitionDelay: menuOpen ? `${400 + index * 50}ms` : '0ms' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                      <Icon className="w-5 h-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <span className="relative font-medium transition-colors duration-200 group-hover:text-primary">
                      {t(labelKey, language)}
                    </span>
                    
                    <svg 
                      className={cn(
                        "w-4 h-4 text-muted-foreground/50 ml-auto transition-all duration-300 opacity-0 group-hover:opacity-100",
                        language === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'
                      )} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Footer */}
            <div className={cn(
              'pt-4 border-t border-border/50 transition-all duration-500',
              menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )} style={{ transitionDelay: menuOpen ? '500ms' : '0ms' }}>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <span>Powered by</span>
                <span className="font-semibold gradient-text">Horus-Bot</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div
          className={cn(
            'transition-all duration-500 ease-out origin-center',
            menuOpen && 'scale-[0.85] rounded-[2rem] shadow-2xl overflow-hidden pointer-events-none',
            menuOpen && (language === 'ar' ? '-translate-x-[65%]' : 'translate-x-[65%]'),
            menuOpen && 'ring-1 ring-white/20'
          )}
          style={{
            filter: menuOpen ? 'brightness(0.95)' : 'brightness(1)',
          }}
        >
          <AppBar
            title=""
            showMenu
            showQR
            onMenuClick={() => setMenuOpen(!menuOpen)}
            leftIcon={
              <div className="flex items-center gap-2">
                <img src={ankhImage} alt="Horus-Bot" className="w-7 h-7" />
                <span className="font-semibold text-lg">
                  {language === 'ar' ? 'حورس-بوت' : 'Horus-Bot'}
                </span>
              </div>
            }
          />

          {/* Hero Section */}
          <div className="px-4 py-6">
            <div
              className="relative h-48 rounded-3xl overflow-hidden shadow-card cursor-pointer group hover-lift"
              onClick={() => navigate('/map')}
            >
              <img
                src={gemImage}
                alt="Museum"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/70" />
              <div className="absolute bottom-4 left-4 right-4 transition-transform duration-300 group-hover:translate-y-[-2px]">
                <h2 className="text-white text-xl font-bold">
                  {language === 'ar' ? 'استكشف المتحف' : 'Explore the Museum'}
                </h2>
                <p className="text-white/80 text-sm mt-1">
                  {language === 'ar' ? 'اكتشف القطع الأثرية الرائعة' : 'Discover amazing artifacts'}
                </p>
              </div>
              {/* Animated arrow indicator */}
              <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="px-4 pb-6">
            <div className="grid grid-cols-2 gap-3">
              {menuItems.map(({ icon: Icon, labelKey, path }, index) => (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  className={`flex flex-col items-center justify-center gap-2 p-5 bg-card rounded-2xl shadow-soft hover-lift press-effect group opacity-0 animate-slide-up-fade stagger-${index + 1}`}
                  style={{ animationFillMode: 'forwards' }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                    <Icon className="w-6 h-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <span className="font-medium text-sm transition-colors duration-200 group-hover:text-primary">{t(labelKey, language)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* AR View Card */}
          <div className="px-4 pb-6">
            <button
              onClick={() => navigate('/ar_view')}
              className="w-full p-4 bg-gradient-to-r from-primary to-accent rounded-2xl shadow-card text-left hover-lift press-effect group relative overflow-hidden"
            >
              {/* Shimmer effect overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
              <h3 className="text-primary-foreground font-bold text-lg relative z-10">
                {language === 'ar' ? 'جرب الواقع المعزز' : 'Try AR Experience'}
              </h3>
              <p className="text-primary-foreground/80 text-sm mt-1 relative z-10">
                {language === 'ar'
                  ? 'وجه كاميرتك نحو المعروضات'
                  : 'Point your camera at exhibits'}
              </p>
              {/* Floating icon */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 group-hover:opacity-50 transition-opacity">
                <svg className="w-16 h-16 text-white animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </button>
          </div>
        </div>

        <FloatingChatButton />
        <BottomNav />
      </PageContainer>

      {/* Privacy Dialog */}
      <Dialog open={showPrivacy} onOpenChange={setShowPrivacy}>
        <DialogContent className="max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle>{t('privacyTitle', language)}</DialogTitle>
            <DialogDescription className="text-sm leading-relaxed">
              {t('privacyText', language)}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setShowPrivacy(false)}
              className="flex-1"
            >
              {t('deny', language)}
            </Button>
            <Button onClick={handlePrivacyAccept} className="flex-1">
              {t('allow', language)}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Tour Alert */}
      <AlertDialog open={showTourAlertDialog} onOpenChange={setShowTourAlertDialog}>
        <AlertDialogContent className="max-w-sm rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Radio className="w-5 h-5 text-primary" />
              {t('liveTour', language)}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t('tourAlert', language)}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                handleTourAlertDismiss();
                navigate('/map');
              }}
            >
              {t('viewMap', language)}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
