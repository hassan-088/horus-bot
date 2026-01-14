import { Ticket } from 'lucide-react';
import { AppBar } from '@/components/layout/AppBar';
import { PageContainer } from '@/components/layout/PageContainer';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';


export default function MyTicketsScreen() {
  const { language, tickets } = useApp();
  return (
    <PageContainer>
      <AppBar title={t('myTickets', language)} showBack />
      <div className="p-4 space-y-3">
        {tickets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <Ticket className="w-12 h-12 mb-4" />
            <p>{t('noTicketsYet', language)}</p>
          </div>
        ) : (
          tickets.map((ticket) => (
            <div key={ticket.id} className="p-4 bg-card rounded-2xl shadow-soft">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold capitalize">{t(ticket.type, language)} x{ticket.quantity}</h3>
                  <p className="text-sm text-muted-foreground">{ticket.date}</p>
                </div>
                <span className="font-bold text-primary">{ticket.price} EGP</span>
              </div>
            </div>
          ))
        )}
      </div>
    </PageContainer>
  );
}

