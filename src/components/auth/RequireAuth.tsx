import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { isStaffRole } from '@/components/auth/StaffRouteGuards';

/**
 * Route-level auth guard. Redirects unauthenticated visitors to /auth and
 * preserves the originally requested path so we can return after login.
 */
export function RequireAuth() {
  const { user, profile, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  }

  if (isStaffRole(profile?.role) && location.pathname !== '/admin/payments') {
    return <Navigate to="/admin/payments" replace />;
  }

  return <Outlet />;
}
