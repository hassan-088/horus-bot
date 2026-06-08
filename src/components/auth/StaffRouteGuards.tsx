import { Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export function isStaffRole(role: unknown) {
  const normalized = String(role ?? '').trim().toLowerCase();
  return normalized === 'admin' || normalized === 'cashier';
}

function LoadingRoute() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
}

export function VisitorOnlyRoute({ children }: { children: ReactNode }) {
  const { user, profile, isLoading } = useAuth();

  if (isLoading) return <LoadingRoute />;
  if (user && !profile) return <LoadingRoute />;
  if (user && isStaffRole(profile?.role)) {
    console.info('[Horus-Bot auth] staff visitor-route redirect', {
      uid: user.id,
      email: user.email,
      role: profile?.role,
      destination: '/admin/payments',
    });
    return <Navigate to="/admin/payments" replace />;
  }

  return <>{children}</>;
}

export function StaffHomeRedirect({ children }: { children: ReactNode }) {
  const { user, profile, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <LoadingRoute />;
  if (user && !profile) return <LoadingRoute />;
  if (location.pathname === '/' && user && isStaffRole(profile?.role)) {
    console.info('[Horus-Bot auth] staff home redirect', {
      uid: user.id,
      email: user.email,
      role: profile?.role,
      destination: '/admin/payments',
    });
    return <Navigate to="/admin/payments" replace />;
  }

  return <>{children}</>;
}
