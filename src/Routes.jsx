import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import ProtectedRoute from "components/ProtectedRoute";
import NotFound from "pages/NotFound";

// Pages
import WellnessDashboard from './pages/wellness-dashboard';
import ChatInterface from './pages/chat-interface';
import ResourceLibrary from './pages/resource-library';
import CommunityGarden from './pages/community-garden';
import ProfessionalConnect from './pages/professional-connect';
import Homepage from './pages/homepage';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import PasswordResetPage from './pages/auth/PasswordResetPage';

// Dashboard Pages
import Dashboard from './pages/dashboard';
import ProfilePage from './pages/dashboard/ProfilePage';
import SettingsPage from './pages/dashboard/SettingsPage';
import WellnessTracker from './pages/dashboard/WellnessTracker';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Public Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/password-reset" element={<PasswordResetPage />} />

          {/* Feature Pages (Public for now, can be protected later) */}
          <Route path="/wellness-dashboard" element={<WellnessDashboard />} />
          <Route path="/chat-interface" element={<ChatInterface />} />
          <Route path="/resource-library" element={<ResourceLibrary />} />
          <Route path="/community-garden" element={<CommunityGarden />} />
          <Route path="/professional-connect" element={<ProfessionalConnect />} />
          <Route path="/homepage" element={<Homepage />} />

          {/* Protected Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/wellness-tracker"
            element={
              <ProtectedRoute>
                <WellnessTracker />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
