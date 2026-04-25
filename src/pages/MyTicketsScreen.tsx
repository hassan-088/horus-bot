import { useNavigate } from 'react-router-dom';
import { Ticket, LogIn, Calendar, QrCode, Wallet } from 'lucide-react';
import { AppBar } from '@/components/layout/AppBar';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { useUserTickets } from '@/hooks/useUserTickets';
import { toast } from 'sonner';
import { t } from '@/lib/i18n';

export default function MyTicketsScreen() {
  const { language, isRTL } = useApp();
  const { user } = useAuth();
  const { tickets, loading } = useUserTickets();
  const navigate = useNavigate();

  return (
    <PageContainer>
      <AppBar title={t('myTickets', language)} showBack />
      <div className="p-4 space-y-3">
        {!user && (
          <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <LogIn className="h-6 w-6 text-primary" />
            </div>
            <h2 className="font-serif text-xl">
              {isRTL ? 'سجّل الدخول لعرض تذاكرك' : 'Sign in to view your tickets'}
            </h2>
            <p className="text-sm text-muted-foreground max-w-xs">
              {isRTL
                ? 'سجّل الدخول بحسابك على Horus-Bot لرؤية زياراتك القادمة وتذاكرك المحفوظة.'
                : 'Log in with your Horus-Bot account to see your upcoming visits and saved tickets.'}
            </p>
            <Button onClick={() => navigate('/auth')} className="mt-2">
              {isRTL ? 'تسجيل الدخول' : 'Log in'}
            </Button>
          </div>
        )}

        {user && !loading && tickets.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Ticket className="h-6 w-6 text-primary" />
            </div>
            <h2 className="font-serif text-xl">{t('noTicketsTitle', language)}</h2>
            <p className="text-sm text-muted-foreground max-w-xs">
              {isRTL ? 'احجز زيارتك لتبدأ.' : 'Book your visit to get started.'}
            </p>
            <Button onClick={() => navigate('/tickets')} className="mt-2">
              {t('bookAVisit', language)}
            </Button>
          </div>
        )}

        {user && tickets.map((tk) => (
          <div key={tk.id} className="p-4 bg-card rounded-2xl shadow-soft space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-serif text-lg">{tk.museum_name}</h3>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {tk.visit_date}
                </div>
              </div>
              <Badge variant="secondary" className="bg-primary/15 text-primary border-0">
                {t('statusActive', language)}
              </Badge>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {tk.total_tickets} × {isRTL ? 'تذاكر' : 'tickets'}
              </span>
              <span className="font-semibold">{tk.total_price} {tk.currency}</span>
            </div>

            <div className="rounded-xl border-2 border-dashed border-border p-4 flex items-center gap-3 bg-background/50">
              <QrCode className="h-10 w-10 text-foreground shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">
                  {isRTL ? 'رمز الدخول' : 'Entry QR'}
                </p>
                <p className="font-mono text-xs truncate">{tk.qr_value}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                {t('viewTicket', language)}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => toast.info(t('walletSoon', language))}
              >
                <Wallet className="h-3.5 w-3.5" />
                {t('addToWallet', language)}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
