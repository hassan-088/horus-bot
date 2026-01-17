import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, User, Mail, Save, Loader2, CheckCircle } from 'lucide-react';
import { AppBar } from '@/components/layout/AppBar';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function ProfileScreen() {
  const navigate = useNavigate();
  const { user, profile, updateProfile } = useAuth();
  const { language, isRTL } = useApp();
  const { toast } = useToast();
  
  const [displayName, setDisplayName] = useState(profile?.display_name || '');
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    if (!displayName.trim()) {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' ? 'الاسم مطلوب' : 'Display name is required',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    const { error } = await updateProfile({
      display_name: displayName.trim(),
      avatar_url: avatarUrl.trim() || null,
    });

    if (error) {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setSaved(true);
      toast({
        title: language === 'ar' ? 'تم الحفظ' : 'Saved',
        description: language === 'ar' ? 'تم تحديث ملفك الشخصي' : 'Your profile has been updated',
      });
      setTimeout(() => setSaved(false), 2000);
    }
    setIsSubmitting(false);
  };

  const getInitial = () => {
    if (displayName) return displayName.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return '?';
  };

  return (
    <ProtectedRoute title={language === 'ar' ? 'الملف الشخصي' : 'Profile'}>
      <PageContainer>
        <AppBar 
          title={language === 'ar' ? 'تعديل الملف الشخصي' : 'Edit Profile'} 
          showBack 
        />

        <div className="p-4 space-y-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-4xl font-bold text-primary-foreground shadow-lg overflow-hidden">
                {avatarUrl ? (
                  <img 
                    src={avatarUrl} 
                    alt="Avatar" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  getInitial()
                )}
              </div>
              <button 
                className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-card shadow-lg flex items-center justify-center border-2 border-background hover:bg-muted transition-colors"
                onClick={() => {
                  const url = prompt(
                    language === 'ar' ? 'أدخل رابط الصورة:' : 'Enter avatar URL:'
                  );
                  if (url) setAvatarUrl(url);
                }}
              >
                <Camera className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            
            <p className="mt-4 text-sm text-muted-foreground">
              {language === 'ar' ? 'اضغط على الكاميرا لتغيير الصورة' : 'Tap camera to change photo'}
            </p>
          </div>

          {/* Form Section */}
          <div className="space-y-6 bg-card rounded-2xl p-6 shadow-soft">
            <div className="space-y-2">
              <Label htmlFor="displayName" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {language === 'ar' ? 'الاسم' : 'Display Name'}
              </Label>
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder={language === 'ar' ? 'أدخل اسمك' : 'Enter your name'}
                className={cn('h-12 rounded-xl', isRTL && 'text-right')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
              </Label>
              <Input
                id="email"
                value={user?.email || ''}
                disabled
                className={cn('h-12 rounded-xl bg-muted', isRTL && 'text-right')}
              />
              <p className="text-xs text-muted-foreground">
                {language === 'ar' ? 'لا يمكن تغيير البريد الإلكتروني' : 'Email cannot be changed'}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="avatarUrl" className="flex items-center gap-2">
                <Camera className="w-4 h-4" />
                {language === 'ar' ? 'رابط الصورة' : 'Avatar URL'}
              </Label>
              <Input
                id="avatarUrl"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                className={cn('h-12 rounded-xl', isRTL && 'text-right')}
              />
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-card rounded-2xl p-6 shadow-soft">
            <h3 className="font-semibold mb-4">
              {language === 'ar' ? 'الإحصائيات' : 'Stats'}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-xl">
                <p className="text-2xl font-bold text-primary">{profile?.visit_count || 0}</p>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'الزيارات' : 'Visits'}
                </p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-xl">
                <p className="text-2xl font-bold text-primary">
                  {new Date(profile?.created_at || Date.now()).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { month: 'short', year: 'numeric' })}
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'انضم في' : 'Joined'}
                </p>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <Button 
            onClick={handleSave}
            disabled={isSubmitting}
            className="w-full h-14 rounded-2xl text-base font-semibold gap-2"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : saved ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            {saved 
              ? (language === 'ar' ? 'تم الحفظ!' : 'Saved!')
              : (language === 'ar' ? 'حفظ التغييرات' : 'Save Changes')
            }
          </Button>
        </div>
      </PageContainer>
    </ProtectedRoute>
  );
}
