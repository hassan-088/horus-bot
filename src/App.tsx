import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { MainLayout } from "@/components/layout/MainLayout";

import SplashScreen from "./pages/SplashScreen";
import HomePage from "./pages/site/HomePage";
import AboutPage from "./pages/site/AboutPage";
import ExperiencePage from "./pages/site/ExperiencePage";
import TicketsInfoPage from "./pages/site/TicketsInfoPage";
import AppPage from "./pages/site/AppPage";
import FaqPage from "./pages/site/FaqPage";
import ContactPage from "./pages/site/ContactPage";
import OnboardingScreen from "./pages/OnboardingScreen";
import AuthScreen from "./pages/AuthScreen";
import HomeScreen from "./pages/HomeScreen";
import MapScreen from "./pages/MapScreen";
import ExhibitsScreen from "./pages/ExhibitsScreen";
import ExhibitDetailsScreen from "./pages/ExhibitDetailsScreen";
import QuizScreen from "./pages/QuizScreen";
import ProgressScreen from "./pages/ProgressScreen";
import LiveTourScreen from "./pages/LiveTourScreen";
import TicketsScreen from "./pages/TicketsScreen";
import MyTicketsScreen from "./pages/MyTicketsScreen";
import QRScanScreen from "./pages/QRScanScreen";
import SettingsScreen from "./pages/SettingsScreen";
import ARViewScreen from "./pages/ARViewScreen";
import FeedbackScreen from "./pages/FeedbackScreen";
import FavoritesScreen from "./pages/FavoritesScreen";
import AchievementsScreen from "./pages/AchievementsScreen";
import EventsScreen from "./pages/EventsScreen";
import TourPlannerScreen from "./pages/TourPlannerScreen";
import ProfileScreen from "./pages/ProfileScreen";
import VisitHistoryScreen from "./pages/VisitHistoryScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  const location = useLocation();
  
  return (
    <MainLayout key={location.pathname}>
      <Routes location={location}>
        {/* Public marketing site */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/tickets-info" element={<TicketsInfoPage />} />
        <Route path="/app" element={<AppPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* App */}
        <Route path="/launch" element={<SplashScreen />} />
        <Route path="/onboarding" element={<OnboardingScreen />} />
        <Route path="/auth" element={<AuthScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/map" element={<MapScreen />} />
        <Route path="/exhibits" element={<ExhibitsScreen />} />
        <Route path="/exhibit_details" element={<ExhibitDetailsScreen />} />
        <Route path="/quiz" element={<QuizScreen />} />
        <Route path="/progress" element={<ProgressScreen />} />
        <Route path="/live_tour" element={<LiveTourScreen />} />
        <Route path="/tickets" element={<TicketsScreen />} />
        <Route path="/my_tickets" element={<MyTicketsScreen />} />
        <Route path="/qr_scan" element={<QRScanScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
        <Route path="/ar_view" element={<ARViewScreen />} />
        <Route path="/feedback" element={<FeedbackScreen />} />
        <Route path="/favorites" element={<FavoritesScreen />} />
        <Route path="/achievements" element={<AchievementsScreen />} />
        <Route path="/events" element={<EventsScreen />} />
        <Route path="/tour_planner" element={<TourPlannerScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/visit_history" element={<VisitHistoryScreen />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;

