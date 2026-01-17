import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { PageContainer } from '@/components/layout/PageContainer';
import { AppBar } from '@/components/layout/AppBar';

interface ProtectedRouteProps {
  children: ReactNode;
  title?: string;
  message?: string;
}

export function ProtectedRoute({ children, title, message }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const { language } = useApp();

  if (isLoading) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </PageContainer>
    );
  }

  if (!user) {
    return (
      <PageContainer>
        <AppBar title={title || (language === 'ar' ? 'تسجيل الدخول مطلوب' : 'Login Required')} showBack />
        
        <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <Lock className="w-10 h-10 text-primary" />
          </div>
          
          <h2 className="text-2xl font-bold mb-2">
            {language === 'ar' ? 'تسجيل الدخول مطلوب' : 'Login Required'}
          </h2>
          
          <p className="text-muted-foreground mb-8 max-w-xs">
            {message || (language === 'ar' 
              ? 'سجل الدخول لحفظ تقدمك ومزامنته عبر الأجهزة'
              : 'Sign in to save your progress and sync across devices'
            )}
          </p>
          
          <Button 
            onClick={() => navigate('/auth')} 
            size="lg"
            className="rounded-full px-8 gap-2"
          >
            <LogIn className="w-5 h-5" />
            {language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
          </Button>
          
          <button 
            onClick={() => navigate(-1)}
            className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {language === 'ar' ? 'الرجوع' : 'Go Back'}
          </button>
        </div>
      </PageContainer>
    );
  }

  return <>{children}</>;
}
