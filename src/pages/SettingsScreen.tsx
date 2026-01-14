import { AppBar } from '@/components/layout/AppBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { PageContainer } from '@/components/layout/PageContainer';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';

export default function SettingsScreen() {
  const { language, setLanguage, themeMode, setThemeMode, highContrast, setHighContrast, fontScale, setFontScale } = useApp();
  const fontScaleValues = { sm: 0, md: 1, lg: 2, xl: 3 };
  const fontScaleKeys = ['sm', 'md', 'lg', 'xl'] as const;
  
  return (
    <PageContainer>
      <AppBar title={t('settingsTitle', language)} showBack />
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between p-4 bg-card rounded-2xl shadow-soft">
          <span className="font-medium">{t('highContrast', language)}</span>
          <Switch checked={highContrast} onCheckedChange={setHighContrast} />
        </div>
        <div className="p-4 bg-card rounded-2xl shadow-soft space-y-2">
          <span className="font-medium">{t('themeMode', language)}</span>
          <Select value={themeMode} onValueChange={(v) => setThemeMode(v as 'system' | 'light' | 'dark')}>
            <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="system">{t('system', language)}</SelectItem>
              <SelectItem value="light">{t('light', language)}</SelectItem>
              <SelectItem value="dark">{t('dark', language)}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="p-4 bg-card rounded-2xl shadow-soft space-y-3">
          <span className="font-medium">{t('fontSize', language)}</span>
          <Slider value={[fontScaleValues[fontScale]]} max={3} step={1} onValueChange={([v]) => setFontScale(fontScaleKeys[v])} />
        </div>
        <div className="p-4 bg-card rounded-2xl shadow-soft space-y-2">
          <span className="font-medium">{t('languageSetting', language)}</span>
          <Select value={language} onValueChange={(v) => setLanguage(v as 'en' | 'ar')}>
            <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="en">{t('english', language)}</SelectItem>
              <SelectItem value="ar">{t('arabic', language)}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <p className="text-xs text-center text-muted-foreground px-4">{t('settingsNote', language)}</p>
      </div>
      <BottomNav />
    </PageContainer>
  );
}
