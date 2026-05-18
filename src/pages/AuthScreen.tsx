import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, Globe, Flag, ArrowLeft, Loader2, Check, X as XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { useAuth, friendlyAuthError } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';
import { z } from 'zod';
import { PASSWORD_RULES, firstPasswordError, isValidPhone } from '@/lib/passwordRules';
import { productMessage } from '@/lib/productMessages';
import { cn } from '@/lib/utils';
import ankhLogo from '@/assets/ankh.png';

const emailSchema = z.string().trim().email();

export default function AuthScreen() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [phone, setPhone] = useState('');
  const [nationality, setNationality] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState<'english' | 'arabic'>('english');

  const [errors, setErrors] = useState<{
    fullName?: string; email?: string; password?: string; confirm?: string; phone?: string;
  }>({});

  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotBusy, setForgotBusy] = useState(false);

  const { signIn, signUp, user, resetPassword } = useAuth();
  const { language } = useApp();
  const navigate = useNavigate();

  const isArabic = language === 'ar';

  useEffect(() => {
    setPreferredLanguage(language === 'ar' ? 'arabic' : 'english');
  }, [language]);

  useEffect(() => {
    if (user) navigate('/account', { replace: true });
  }, [user, navigate]);

  const validateForm = () => {
    const e: typeof errors = {};
    if (isSignUp) {
      if (!fullName.trim() || fullName.trim().length < 2) {
        e.fullName = isArabic ? 'يرجى إدخال اسمك الكامل.' : 'Please enter your full name.';
      }
    }
    if (!email.trim()) {
      e.email = isArabic ? 'يرجى إدخال بريدك الإلكتروني.' : 'Please enter your email.';
    } else if (!emailSchema.safeParse(email).success) {
      e.email = isArabic ? 'يرجى إدخال بريد إلكتروني صحيح.' : 'Please enter a valid email address.';
    }
    if (!password) {
      e.password = isArabic ? 'يرجى إدخال كلمة المرور.' : 'Please enter your password.';
    } else if (isSignUp) {
      const pwErr = firstPasswordError(password, isArabic);
      if (pwErr) e.password = pwErr;
    }
    if (isSignUp) {
      if (!confirm) {
        e.confirm = isArabic ? 'يرجى تأكيد كلمة المرور.' : 'Please confirm your password.';
      } else if (confirm !== password) {
        e.confirm = isArabic ? 'كلمتا المرور غير متطابقتين.' : 'Passwords do not match.';
      }
      if (phone.trim() && !isValidPhone(phone)) {
        e.phone = isArabic ? 'يرجى إدخال رقم هاتف صحيح.' : 'Please enter a valid phone number.';
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      if (isSignUp) {
        const { error } = await signUp(email.trim(), password, {
          fullName: fullName.trim(),
          phoneNumber: phone.trim() || undefined,
          nationality: nationality || undefined,
          preferredLanguage,
        });
        if (error) {
          toast.error(friendlyAuthError(error, isArabic));
        } else {
          toast.success(isArabic ? 'تم إنشاء الحساب بنجاح!' : 'Account created successfully!');
          navigate('/account', { replace: true });
        }
      } else {
        const { error } = await signIn(email.trim(), password);
        if (error) {
          toast.error(friendlyAuthError(error, isArabic));
        } else {
          toast.success(isArabic ? 'مرحبا بعودتك!' : 'Welcome back!');
          navigate('/account', { replace: true });
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgot = async () => {
    if (!forgotEmail.trim()) {
      toast.error(isArabic ? 'يرجى إدخال بريدك الإلكتروني.' : 'Please enter your email.');
      return;
    }
    if (!emailSchema.safeParse(forgotEmail).success) {
      toast.error(isArabic ? 'يرجى إدخال بريد إلكتروني صحيح.' : 'Please enter a valid email address.');
      return;
    }
    setForgotBusy(true);
    const { error } = await resetPassword(forgotEmail.trim());
    setForgotBusy(false);
    if (error) {
      const key = error.message === productMessage('network') ? 'network' : 'generic';
      toast.error(productMessage(key, isArabic));
      return;
    }
    toast.success(isArabic ? 'تم إرسال رابط إعادة تعيين كلمة المرور. تحقق من بريدك.' : 'Password reset link sent. Please check your email.');
    setForgotOpen(false);
    setForgotEmail('');
  };

  const t = {
    title: isSignUp
      ? (isArabic ? 'إنشاء حساب' : 'Create Account')
      : (isArabic ? 'مرحبا بعودتك إلى Horus-Bot' : 'Welcome back to Horus-Bot'),
    subtitle: isSignUp
      ? (isArabic ? 'انضم إلى رحلتك في المتحف.' : 'Join your museum journey.')
      : (isArabic ? 'سجل الدخول للوصول إلى تذاكرك وجولاتك.' : 'Log in to access your tickets and tours.'),
    fullName: isArabic ? 'الاسم الكامل' : 'Full name',
    email: isArabic ? 'البريد الإلكتروني' : 'Email',
    password: isArabic ? 'كلمة المرور' : 'Password',
    confirm: isArabic ? 'تأكيد كلمة المرور' : 'Confirm password',
    phone: isArabic ? 'رقم الهاتف (اختياري)' : 'Phone number (optional)',
    nationality: isArabic ? 'الجنسية (اختياري)' : 'Nationality (optional)',
    prefLang: isArabic ? 'لغة الواجهة (اختياري)' : 'UI language (optional)',
    submit: isSignUp
      ? (isArabic ? 'إنشاء حساب' : 'Create Account')
      : (isArabic ? 'تسجيل الدخول' : 'Sign In'),
    switchText: isSignUp
      ? (isArabic ? 'لديك حساب بالفعل؟' : 'Already have an account?')
      : (isArabic ? 'ليس لديك حساب؟' : "Don't have an account?"),
    switchAction: isSignUp
      ? (isArabic ? 'تسجيل الدخول' : 'Sign In')
      : (isArabic ? 'إنشاء حساب' : 'Sign Up'),
    back: isArabic ? 'رجوع' : 'Back',
    forgot: isArabic ? 'نسيت كلمة المرور؟' : 'Forgot password?',
    pwRulesIntro: isArabic ? 'يجب أن تتضمن كلمة المرور على الأقل:' : 'Password must contain at least:',
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="p-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="gap-2">
          <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
          {t.back}
        </Button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        <div className="mb-8 animate-fade-in-up">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center shadow-lg">
            <img src={ankhLogo} alt="Horus-Bot" className="w-12 h-12" />
          </div>
        </div>

        <div className="text-center mb-8 animate-fade-in-up stagger-1">
          <h1 className="text-2xl font-bold text-foreground mb-2">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 animate-fade-in-up stagger-2" noValidate>
          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="fullName">{t.fullName}</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground rtl:left-auto rtl:right-3" />
                <Input
                  id="fullName" value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={isArabic ? 'اسمك الكامل' : 'Your full name'}
                  className={cn('pl-10 rtl:pl-3 rtl:pr-10', errors.fullName && 'border-destructive focus-visible:ring-destructive')}
                />
              </div>
              {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">{t.email}</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground rtl:left-auto rtl:right-3" />
              <Input
                id="email" type="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className={cn('pl-10 rtl:pl-3 rtl:pr-10', errors.email && 'border-destructive focus-visible:ring-destructive')}
              />
            </div>
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t.password}</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground rtl:left-auto rtl:right-3" />
              <Input
                id="password" type={showPassword ? 'text' : 'password'} value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={cn('pl-10 pr-10 rtl:pl-10 rtl:pr-10', errors.password && 'border-destructive focus-visible:ring-destructive')}
              />
              <button
                type="button" onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground rtl:right-auto rtl:left-3"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}

            {isSignUp && (
              <div className="rounded-lg border border-border/60 bg-muted/40 p-3 mt-2 space-y-1">
                <p className="text-xs text-muted-foreground mb-1">{t.pwRulesIntro}</p>
                {PASSWORD_RULES.map((r) => {
                  const ok = r.test(password);
                  return (
                    <div key={r.id} className={cn('flex items-center gap-2 text-xs', ok ? 'text-emerald-600' : 'text-muted-foreground')}>
                      {ok ? <Check className="h-3.5 w-3.5" /> : <XIcon className="h-3.5 w-3.5 opacity-50" />}
                      <span>{isArabic ? r.labelAr : r.labelEn}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {!isSignUp && (
              <button
                type="button"
                onClick={() => { setForgotEmail(email); setForgotOpen(true); }}
                className="text-xs text-primary hover:underline"
              >
                {t.forgot}
              </button>
            )}
          </div>

          {isSignUp && (
            <>
              <div className="space-y-2">
                <Label htmlFor="confirm">{t.confirm}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground rtl:left-auto rtl:right-3" />
                  <Input
                    id="confirm" type={showConfirm ? 'text' : 'password'} value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="••••••••"
                    className={cn('pl-10 pr-10 rtl:pl-10 rtl:pr-10', errors.confirm && 'border-destructive focus-visible:ring-destructive')}
                  />
                  <button
                    type="button" onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground rtl:right-auto rtl:left-3"
                    aria-label={showConfirm ? 'Hide password' : 'Show password'}
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirm && <p className="text-sm text-destructive">{errors.confirm}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{t.phone}</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground rtl:left-auto rtl:right-3" />
                  <Input
                    id="phone" type="tel" value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+20 ..."
                    className={cn('pl-10 rtl:pl-3 rtl:pr-10', errors.phone && 'border-destructive focus-visible:ring-destructive')}
                  />
                </div>
                {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="nationality">{t.nationality}</Label>
                  <div className="relative">
                    <Flag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground rtl:left-auto rtl:right-3" />
                    <Input
                      id="nationality" value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                      placeholder={isArabic ? 'مثال: مصري' : 'e.g. Egyptian'}
                      className="pl-10 rtl:pl-3 rtl:pr-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prefLang">{t.prefLang}</Label>
                  <Select
                    value={preferredLanguage}
                    onValueChange={(value) =>
                      setPreferredLanguage(value === 'arabic' ? 'arabic' : 'english')
                    }
                  >
                    <SelectTrigger id="prefLang"><Globe className="h-4 w-4 mr-1" /><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">{isArabic ? 'الإنجليزية' : 'English'}</SelectItem>
                      <SelectItem value="arabic">{isArabic ? 'العربية' : 'Arabic'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}

          <Button type="submit" className="w-full h-12 text-base" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : t.submit}
          </Button>
        </form>

        <div className="mt-6 text-center animate-fade-in-up stagger-3">
          <p className="text-muted-foreground">
            {t.switchText}{' '}
            <button
              type="button"
              onClick={() => { setIsSignUp(!isSignUp); setErrors({}); }}
              className="text-primary font-medium hover:underline"
            >
              {t.switchAction}
            </button>
          </p>
        </div>
      </div>

      <Dialog open={forgotOpen} onOpenChange={setForgotOpen}>
        <DialogContent className="sm:max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle>{isArabic ? 'إعادة تعيين كلمة المرور' : 'Reset your password'}</DialogTitle>
            <DialogDescription>
              {isArabic
                ? 'أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة التعيين.'
                : "Enter your email and we'll send you a reset link."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="forgot-email">{t.email}</Label>
            <Input
              id="forgot-email" type="email" value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="your@email.com"
            />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setForgotOpen(false)}>
              {isArabic ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button onClick={handleForgot} disabled={forgotBusy}>
              {forgotBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : (isArabic ? 'إرسال الرابط' : 'Send reset link')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}