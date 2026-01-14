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
        {menuOpen && (
          <div
            className="fixed inset-0 z-40 bg-foreground/20"
            onClick={() => setMenuOpen(false)}
          />
        )}

        {/* Side Menu */}
        <div
          className={cn(
            'fixed top-0 bottom-0 z-30 w-64 bg-gradient-to-b from-white to-secondary p-6 pt-16 transition-transform duration-300',
            language === 'ar' ? 'right-0' : 'left-0',
            menuOpen
              ? 'translate-x-0'
              : language === 'ar'
              ? 'translate-x-full'
              : '-translate-x-full'
          )}
        >
          <div className="space-y-8">
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                {t('explore', language)}
              </h3>
              <div className="space-y-1">
                {menuItems.map(({ icon: Icon, labelKey, path }) => (
                  <button
                    key={path}
                    onClick={() => {
                      setMenuOpen(false);
                      navigate(path);
                    }}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-foreground hover:bg-primary/10 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-primary" />
                    <span className="font-medium">{t(labelKey, language)}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                {t('settings', language)}
              </h3>
              <div className="space-y-1">
                {settingsItems.map(({ icon: Icon, labelKey, path }) => (
                  <button
                    key={path}
                    onClick={() => {
                      setMenuOpen(false);
                      navigate(path);
                    }}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-foreground hover:bg-primary/10 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-primary" />
                    <span className="font-medium">{t(labelKey, language)}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div
          className={cn(
            'transition-all duration-300',
            menuOpen && 'scale-[0.82] rounded-3xl shadow-elevated overflow-hidden',
            menuOpen && (language === 'ar' ? '-translate-x-[62%]' : 'translate-x-[62%]')
          )}
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
              className="relative h-48 rounded-3xl overflow-hidden shadow-card cursor-pointer"
              onClick={() => navigate('/map')}
            >
              <img
                src={gemImage}
                alt="Museum"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="text-white text-xl font-bold">
                  {language === 'ar' ? 'استكشف المتحف' : 'Explore the Museum'}
                </h2>
                <p className="text-white/80 text-sm mt-1">
                  {language === 'ar' ? 'اكتشف القطع الأثرية الرائعة' : 'Discover amazing artifacts'}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="px-4 pb-6">
            <div className="grid grid-cols-2 gap-3">
              {menuItems.map(({ icon: Icon, labelKey, path }) => (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  className="flex flex-col items-center justify-center gap-2 p-5 bg-card rounded-2xl shadow-soft hover:shadow-card transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="font-medium text-sm">{t(labelKey, language)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* AR View Card */}
          <div className="px-4 pb-6">
            <button
              onClick={() => navigate('/ar_view')}
              className="w-full p-4 bg-gradient-to-r from-primary to-accent rounded-2xl shadow-card text-left hover:shadow-elevated transition-shadow"
            >
              <h3 className="text-primary-foreground font-bold text-lg">
                {language === 'ar' ? 'جرب الواقع المعزز' : 'Try AR Experience'}
              </h3>
              <p className="text-primary-foreground/80 text-sm mt-1">
                {language === 'ar'
                  ? 'وجه كاميرتك نحو المعروضات'
                  : 'Point your camera at exhibits'}
              </p>
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
