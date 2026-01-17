import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';
import { z } from 'zod';
import ankhLogo from '@/assets/ankh.png';

const emailSchema = z.string().email('Please enter a valid email address');
const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');
const displayNameSchema = z.string().min(2, 'Name must be at least 2 characters').optional();

export default function AuthScreen() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; displayName?: string }>({});
  
  const { signIn, signUp, user } = useAuth();
  const { language } = useApp();
  const navigate = useNavigate();
  
  const isArabic = language === 'ar';

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/home', { replace: true });
    }
  }, [user, navigate]);

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    try {
      emailSchema.parse(email);
    } catch (e) {
      if (e instanceof z.ZodError) {
        newErrors.email = e.errors[0].message;
      }
    }
    
    try {
      passwordSchema.parse(password);
    } catch (e) {
      if (e instanceof z.ZodError) {
        newErrors.password = e.errors[0].message;
      }
    }
    
    if (isSignUp && displayName) {
      try {
        displayNameSchema.parse(displayName);
      } catch (e) {
        if (e instanceof z.ZodError) {
          newErrors.displayName = e.errors[0].message;
        }
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      if (isSignUp) {
        const { error } = await signUp(email, password, displayName || undefined);
        if (error) {
          if (error.message.includes('already registered')) {
            toast.error(isArabic ? 'هذا البريد مسجل بالفعل' : 'This email is already registered');
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success(isArabic ? 'تم إنشاء الحساب بنجاح!' : 'Account created successfully!');
          navigate('/home', { replace: true });
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast.error(isArabic ? 'بيانات الدخول غير صحيحة' : 'Invalid email or password');
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success(isArabic ? 'مرحباً بعودتك!' : 'Welcome back!');
          navigate('/home', { replace: true });
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const texts = {
    title: isSignUp 
      ? (isArabic ? 'إنشاء حساب' : 'Create Account') 
      : (isArabic ? 'تسجيل الدخول' : 'Sign In'),
    subtitle: isSignUp
      ? (isArabic ? 'انضم إلى رحلتك في المتحف' : 'Join your museum journey')
      : (isArabic ? 'مرحباً بعودتك' : 'Welcome back'),
    email: isArabic ? 'البريد الإلكتروني' : 'Email',
    password: isArabic ? 'كلمة المرور' : 'Password',
    displayName: isArabic ? 'الاسم' : 'Display Name',
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
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/')}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
          {texts.back}
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        {/* Logo */}
        <div className="mb-8 animate-fade-in-up">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center shadow-lg">
            <img src={ankhLogo} alt="Horus-Bot" className="w-12 h-12" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8 animate-fade-in-up stagger-1">
          <h1 className="text-2xl font-bold text-foreground mb-2">{texts.title}</h1>
          <p className="text-muted-foreground">{texts.subtitle}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 animate-fade-in-up stagger-2">
          {/* Display Name (Sign Up only) */}
          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="displayName">{texts.displayName}</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground rtl:left-auto rtl:right-3" />
                <Input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder={isArabic ? 'اسمك' : 'Your name'}
                  className="pl-10 rtl:pl-3 rtl:pr-10"
                />
              </div>
              {errors.displayName && (
                <p className="text-sm text-destructive">{errors.displayName}</p>
              )}
            </div>
          )}

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">{texts.email}</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground rtl:left-auto rtl:right-3" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isArabic ? 'بريدك الإلكتروني' : 'your@email.com'}
                className="pl-10 rtl:pl-3 rtl:pr-10"
              />
            </div>
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">{texts.password}</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground rtl:left-auto rtl:right-3" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-10 pr-10 rtl:pl-10 rtl:pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground rtl:right-auto rtl:left-3"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full h-12 text-base"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              texts.submit
            )}
          </Button>
        </form>

        {/* Switch Mode */}
        <div className="mt-6 text-center animate-fade-in-up stagger-3">
          <p className="text-muted-foreground">
            {texts.switchText}{' '}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setErrors({});
              }}
              className="text-primary font-medium hover:underline"
            >
              {texts.switchAction}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
