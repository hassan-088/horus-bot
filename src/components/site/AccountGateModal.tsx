import { useState } from 'react';
import { Loader2, Mail, Lock, User as UserIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';
import { z } from 'zod';

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onAuthSuccess: () => void;
}

const emailSchema = z.string().email();
const passwordSchema = z.string().min(6);

export function AccountGateModal({ open, onOpenChange, onAuthSuccess }: Props) {
  const { isRTL } = useApp();
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'signup' | 'login'>('signup');
  const [busy, setBusy] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const ERR_SIGNUP = isRTL
    ? 'تعذّر إنشاء حسابك. تأكّد من بياناتك وحاول مرة أخرى.'
    : "We couldn't create your account. Please check your details and try again.";
  const ERR_LOGIN = isRTL
    ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة. حاول مرة أخرى.'
    : 'Email or password is incorrect. Please try again.';
  const ERR_MATCH = isRTL ? 'كلمتا المرور غير متطابقتين.' : 'Passwords do not match.';

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailSchema.safeParse(email).success || !passwordSchema.safeParse(password).success) {
      toast.error(mode === 'signup' ? ERR_SIGNUP : ERR_LOGIN);
      return;
    }
    if (mode === 'signup' && password !== confirm) {
      toast.error(ERR_MATCH);
      return;
    }
    setBusy(true);
    try {
      if (mode === 'signup') {
        const { error } = await signUp(email, password, fullName || undefined);
        if (error) {
          toast.error(ERR_SIGNUP);
          return;
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          toast.error(ERR_LOGIN);
          return;
        }
      }
      onOpenChange(false);
      onAuthSuccess();
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">
            {isRTL ? 'احفظ تذكرتك في حسابك على Horus-Bot' : 'Save your ticket to your Horus-Bot account'}
          </DialogTitle>
          <DialogDescription>
            {isRTL
              ? 'أنشئ حساباً لتُحفظ تذاكرك وتظهر داخل التطبيق عند وصولك.'
              : 'Create an account so your tickets are saved and ready inside the app when you arrive.'}
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2 rounded-lg bg-muted p-1">
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              mode === 'signup' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'
            }`}
          >
            {isRTL ? 'إنشاء حساب' : 'Sign up'}
          </button>
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              mode === 'login' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'
            }`}
          >
            {isRTL ? 'تسجيل الدخول' : 'Log in'}
          </button>
        </div>

        <form onSubmit={handle} className="space-y-3">
          {mode === 'signup' && (
            <div className="space-y-1.5">
              <Label htmlFor="ag-name">{isRTL ? 'الاسم الكامل' : 'Full name'}</Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground rtl:left-auto rtl:right-3" />
                <Input
                  id="ag-name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-9 rtl:pl-3 rtl:pr-9"
                  placeholder={isRTL ? 'اسمك' : 'Your name'}
                />
              </div>
            </div>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="ag-email">{isRTL ? 'البريد الإلكتروني' : 'Email address'}</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground rtl:left-auto rtl:right-3" />
              <Input
                id="ag-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-9 rtl:pl-3 rtl:pr-9"
                placeholder="you@email.com"
                required
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ag-pw">{isRTL ? 'كلمة المرور' : 'Password'}</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground rtl:left-auto rtl:right-3" />
              <Input
                id="ag-pw"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-9 rtl:pl-3 rtl:pr-9"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          {mode === 'signup' && (
            <div className="space-y-1.5">
              <Label htmlFor="ag-pw2">{isRTL ? 'تأكيد كلمة المرور' : 'Confirm password'}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground rtl:left-auto rtl:right-3" />
                <Input
                  id="ag-pw2"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="pl-9 rtl:pl-3 rtl:pr-9"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : mode === 'signup' ? (
              isRTL ? 'إنشاء حساب ومتابعة' : 'Create account & continue'
            ) : (
              isRTL ? 'تسجيل الدخول ومتابعة' : 'Log in & continue'
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            {mode === 'signup'
              ? (isRTL ? 'لديك حساب بالفعل؟ ' : 'Already have an account? ')
              : (isRTL ? 'مستخدم جديد؟ ' : 'New here? ')}
            <button
              type="button"
              className="font-medium text-primary hover:underline"
              onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
            >
              {mode === 'signup'
                ? (isRTL ? 'تسجيل الدخول' : 'Log in')
                : (isRTL ? 'إنشاء حساب' : 'Create account')}
            </button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
