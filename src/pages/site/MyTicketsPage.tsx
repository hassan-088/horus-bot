import { Link } from 'react-router-dom';
import { Ticket, LogIn, Calendar, Clock, QrCode, Wallet, Languages, Users, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SectionHero } from '@/components/site/SectionHero';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { useUserTickets } from '@/hooks/useUserTickets';
import { toast } from 'sonner';

export default function MyTicketsPage() {
  const { isRTL } = useApp();
  const { user } = useAuth();
  const { tickets, loading } = useUserTickets();

  return (
    <>
      <SectionHero
        label={isRTL ? 'تذاكري' : 'My Tickets'}
        title={isRTL ? 'زياراتك القادمة' : 'Your Upcoming Visits'}
        subtitle={isRTL
          ? 'كل تذاكرك في مكان واحد — جاهزة على هاتفك وداخل تطبيق Horus-Bot.'
          : 'All your tickets in one place — ready on your phone and inside the Horus-Bot app.'}
      />

      <section className="mx-auto max-w-3xl px-4 md:px-8 pb-24 -mt-6">
        {!user && (
          <Card className="p-10 text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <LogIn className="h-6 w-6 text-primary" />
            </div>
            <h2 className="font-serif text-2xl mb-2">
              {isRTL ? 'سجّل الدخول لعرض تذاكرك' : 'Sign in to view your tickets'}
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
              {isRTL
                ? 'سجّل الدخول بحسابك على Horus-Bot لرؤية زياراتك القادمة وتذاكرك المحفوظة.'
                : 'Log in with your Horus-Bot account to see your upcoming visits and saved tickets.'}
            </p>
            <Button asChild>
              <Link to="/auth">{isRTL ? 'تسجيل الدخول' : 'Log in'}</Link>
            </Button>
          </Card>
        )}

        {user && !loading && tickets.length === 0 && (
          <Card className="p-10 text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Ticket className="h-6 w-6 text-primary" />
            </div>
            <h2 className="font-serif text-2xl mb-2">
              {isRTL ? 'لا توجد تذاكر بعد' : 'No tickets yet'}
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              {isRTL ? 'احجز زيارتك لتبدأ.' : 'Book your visit to get started.'}
            </p>
            <Button asChild>
              <Link to="/book">{isRTL ? 'احجز زيارة' : 'Book your visit'}</Link>
            </Button>
          </Card>
        )}

        {user && tickets.length > 0 && (
          <div className="grid gap-4">
            {tickets.map((tk) => (
              <Card key={tk.id} className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-xl">{tk.museum_name}</h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1 flex-wrap">
                      <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{tk.visit_date}</span>
                      {tk.visit_time && (
                        <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{tk.visit_time}</span>
                      )}
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-primary/15 text-primary border-0">
                    {isRTL ? 'فعّالة' : 'Active'}
                  </Badge>
                </div>

                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="rounded-xl bg-muted/50 p-3 text-sm">
                    <div className="text-xs text-muted-foreground">{isRTL ? 'عدد التذاكر' : 'Tickets'}</div>
                    <div className="font-semibold">{tk.total_tickets}</div>
                  </div>
                  {tk.tour_duration && (
                    <div className="rounded-xl bg-muted/50 p-3 text-sm">
                      <div className="text-xs text-muted-foreground">{isRTL ? 'مدة الجولة' : 'Duration'}</div>
                      <div className="font-semibold">{tk.tour_duration} {isRTL ? 'دقيقة' : 'min'}</div>
                    </div>
                  )}
                  <div className="rounded-xl bg-muted/50 p-3 text-sm">
                    <div className="text-xs text-muted-foreground">{isRTL ? 'الإجمالي' : 'Total'}</div>
                    <div className="font-semibold">{tk.total_price} {tk.currency}</div>
                  </div>
                </div>

                {(tk.preferred_language || (tk.interests && tk.interests.length > 0)) && (
                  <div className="space-y-2">
                    {tk.preferred_language && (
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Languages className="h-3.5 w-3.5" />
                        <span className="capitalize">{tk.preferred_language.replace('-', ' ')}</span>
                      </div>
                    )}
                    {tk.interests && tk.interests.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-primary mt-1" />
                        {tk.interests.map((i) => (
                          <span key={i} className="rounded-full bg-primary/10 text-primary px-2 py-0.5 text-[11px] capitalize">
                            {i.replace('-', ' ')}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="rounded-xl border-2 border-dashed border-border p-4 flex items-center gap-3">
                  <QrCode className="h-12 w-12 text-foreground shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">
                      {isRTL ? 'رمز الدخول' : 'Entry QR'}
                    </p>
                    <p className="font-mono text-sm truncate">{tk.qr_value}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    {isRTL ? 'عرض التذكرة' : 'View Ticket'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() =>
                      toast.info(isRTL ? 'بطاقة المحفظة قريباً' : 'Wallet pass coming soon')
                    }
                  >
                    <Wallet className="h-3.5 w-3.5" />
                    {isRTL ? 'إضافة إلى المحفظة' : 'Add to Wallet'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
