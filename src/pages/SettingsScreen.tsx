import { AppBar } from '@/components/layout/AppBar';
import { PageContainer } from '@/components/layout/PageContainer';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';
import { Eye, Type, Palette, Globe, Volume2, Hand } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SettingsScreen() {
  const { language, setLanguage, themeMode, setThemeMode, highContrast, setHighContrast, fontScale, setFontScale, isRTL } = useApp();
  const fontScaleValues = { sm: 0, md: 1, lg: 2, xl: 3 };
  const fontScaleKeys = ['sm', 'md', 'lg', 'xl'] as const;
  const fontScaleLabels = ['Small', 'Medium', 'Large', 'Extra Large'];
  const fontScaleLabelsAr = ['صغير', 'متوسط', 'كبير', 'كبير جداً'];
  
  return (
    <PageContainer>
      <AppBar title={t('settingsTitle', language)} showBack />
      
      <div className="p-4 space-y-6">
        {/* Accessibility Section */}
        <div>
          <div className="flex items-center gap-2 mb-3 px-1">
            <Eye className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              {language === 'ar' ? 'إمكانية الوصول' : 'Accessibility'}
            </h2>
          </div>
          
          <div className="space-y-3">
            {/* High Contrast */}
            <div className="flex items-center justify-between p-4 bg-card rounded-2xl shadow-soft">
              <div className={cn('flex items-center gap-3', isRTL && 'flex-row-reverse')}>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Palette className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="font-medium block">{t('highContrast', language)}</span>
                  <span className="text-xs text-muted-foreground">
                    {language === 'ar' ? 'تباين أعلى للرؤية' : 'Higher visibility contrast'}
                  </span>
                </div>
              </div>
              <Switch checked={highContrast} onCheckedChange={setHighContrast} />
            </div>

            {/* Font Size */}
            <div className="p-4 bg-card rounded-2xl shadow-soft space-y-4">
              <div className={cn('flex items-center gap-3', isRTL && 'flex-row-reverse')}>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Type className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <span className="font-medium block">{t('fontSize', language)}</span>
                  <span className="text-xs text-muted-foreground">
                    {language === 'ar' ? fontScaleLabelsAr[fontScaleValues[fontScale]] : fontScaleLabels[fontScaleValues[fontScale]]}
                  </span>
                </div>
              </div>
              <Slider 
                value={[fontScaleValues[fontScale]]} 
                max={3} 
                step={1} 
                onValueChange={([v]) => setFontScale(fontScaleKeys[v])} 
                className="mt-2"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground px-1">
                <span>A</span>
                <span className="text-sm">A</span>
                <span className="text-base">A</span>
                <span className="text-lg">A</span>
              </div>
            </div>

            {/* Screen Reader Support Info */}
            <div className="p-4 bg-card rounded-2xl shadow-soft">
              <div className={cn('flex items-center gap-3', isRTL && 'flex-row-reverse')}>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <Volume2 className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="flex-1">
                  <span className="font-medium block">
                    {language === 'ar' ? 'قارئ الشاشة' : 'Screen Reader'}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {language === 'ar' ? 'التطبيق يدعم قارئات الشاشة' : 'App supports screen readers'}
                  </span>
                </div>
                <div className="px-2 py-1 bg-emerald-500/10 rounded-full">
                  <span className="text-xs font-medium text-emerald-600">
                    {language === 'ar' ? 'مدعوم' : 'Supported'}
                  </span>
                </div>
              </div>
            </div>

            {/* Reduce Motion Info */}
            <div className="p-4 bg-card rounded-2xl shadow-soft">
              <div className={cn('flex items-center gap-3', isRTL && 'flex-row-reverse')}>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Hand className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <span className="font-medium block">
                    {language === 'ar' ? 'تقليل الحركة' : 'Reduce Motion'}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {language === 'ar' ? 'يتبع إعدادات النظام' : 'Follows system settings'}
                  </span>
                </div>
                <div className="px-2 py-1 bg-blue-500/10 rounded-full">
                  <span className="text-xs font-medium text-blue-600">
                    {language === 'ar' ? 'تلقائي' : 'Auto'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Appearance Section */}
        <div>
          <div className="flex items-center gap-2 mb-3 px-1">
            <Palette className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              {language === 'ar' ? 'المظهر' : 'Appearance'}
            </h2>
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
        </div>

        {/* Language Section */}
        <div>
          <div className="flex items-center gap-2 mb-3 px-1">
            <Globe className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              {language === 'ar' ? 'اللغة' : 'Language'}
            </h2>
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
        </div>

        <p className="text-xs text-center text-muted-foreground px-4">{t('settingsNote', language)}</p>
      </div>
    </PageContainer>
  );
}

