import { useState } from 'react';
import { ArrowLeft, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';
import { useNavigate } from 'react-router-dom';
import gemImage from '@/assets/gem.jpg';

const arLabels = [
  { id: 1, x: '20%', y: '30%', textEn: 'Ancient Vase — 300 BC', textAr: 'إناء قديم — 300 ق.م' },
  { id: 2, x: '60%', y: '45%', textEn: 'Golden Mask — Tutankhamun', textAr: 'القناع الذهبي — توت عنخ آمون' },
  { id: 3, x: '40%', y: '70%', textEn: 'Robot Guide — Moving to Hall B', textAr: 'الروبوت المرشد — متجه للقاعة ب' },
];

export default function ARViewScreen() {
  const navigate = useNavigate();
  const { language } = useApp();
  const { toast } = useToast();
  const [hasPermission, setHasPermission] = useState(false);

  const handleLabelClick = (label: typeof arLabels[0]) => {
    toast({ description: `${t('scanned', language)}: ${language === 'ar' ? label.textAr : label.textEn}` });
  };

  if (!hasPermission) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-background">
        <Camera className="w-20 h-20 text-muted-foreground mb-6" />
        <h2 className="text-xl font-semibold mb-2">{t('cameraPermission', language)}</h2>
        <Button onClick={() => setHasPermission(true)} className="mt-4">{t('grantPermission', language)}</Button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <img src={gemImage} alt="AR" className="absolute inset-0 w-full h-full object-cover brightness-75" />
      <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="absolute top-4 left-4 z-20 bg-black/40 rounded-full text-white"><ArrowLeft /></Button>
      <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-destructive text-white text-xs font-semibold rounded-full">{t('arModeActive', language)}</div>
      {arLabels.map(label => (
        <button key={label.id} onClick={() => handleLabelClick(label)} className="absolute glass px-3 py-2 rounded-xl text-sm font-medium shadow-lg animate-fade-in-up" style={{ left: label.x, top: label.y }}>
          {language === 'ar' ? label.textAr : label.textEn}
        </button>
      ))}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 rounded-full text-white text-sm">{t('pointCameraExhibits', language)}</div>
    </div>
  );
}
