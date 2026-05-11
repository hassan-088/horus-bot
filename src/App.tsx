import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from '@/contexts/AppContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { RequireAuth } from '@/components/auth/RequireAuth';
import { ScrollToTop } from '@/components/site/ScrollToTop';

import HomePage from './pages/site/HomePage';
import AboutPage from './pages/site/AboutPage';
import ExperiencePage from './pages/site/ExperiencePage';
import TicketsInfoPage from './pages/site/TicketsInfoPage';
import AppPage from './pages/site/AppPage';
import FaqPage from './pages/site/FaqPage';
import ContactPage from './pages/site/ContactPage';
import MyTicketsPage from './pages/site/MyTicketsPage';
import BookPage from './pages/site/BookPage';
import PrivacyPage from './pages/site/PrivacyPage';
import TermsPage from './pages/site/TermsPage';
import AccountPage from './pages/site/AccountPage';
import AuthScreen from './pages/AuthScreen';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Every public route shares the marketing site layout. */}
              <Route element={<SiteLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/experience" element={<ExperiencePage />} />
                <Route path="/tickets-info" element={<TicketsInfoPage />} />
                <Route path="/app" element={<AppPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/book" element={<BookPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/auth" element={<AuthScreen />} />

                {/* Authenticated-only pages. */}
                <Route element={<RequireAuth />}>
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/tickets-mine" element={<MyTicketsPage />} />
                </Route>

                {/* Legacy redirects from removed app prototype routes. */}
                <Route path="/launch" element={<Navigate to="/" replace />} />
                <Route path="/onboarding" element={<Navigate to="/" replace />} />
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route path="/my_tickets" element={<Navigate to="/tickets-mine" replace />} />
                <Route path="/tickets" element={<Navigate to="/tickets-info" replace />} />
                <Route path="/profile" element={<Navigate to="/account" replace />} />
                <Route path="/settings" element={<Navigate to="/account" replace />} />

                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
