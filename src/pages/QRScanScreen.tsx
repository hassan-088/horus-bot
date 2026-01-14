import { QrCode, Camera } from 'lucide-react';
import { AppBar } from '@/components/layout/AppBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { PageContainer } from '@/components/layout/PageContainer';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';

export default function QRScanScreen() {
  const { language } = useApp();
  return (
    <PageContainer>
      <AppBar title={t('qrScanner', language)} showBack />
      <div className="flex flex-col items-center justify-center flex-1 p-8 text-center">
        <div className="w-64 h-64 border-4 border-dashed border-primary/50 rounded-3xl flex items-center justify-center bg-muted/50 mb-6">
          <div className="text-center">
            <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <QrCode className="w-12 h-12 text-primary mx-auto" />
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-2">{t('scanQRCode', language)}</h2>
        <p className="text-muted-foreground">{t('pointCamera', language)}</p>
      </div>
      <BottomNav />
    </PageContainer>
  );
}
