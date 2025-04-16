
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Properties from "./pages/Properties";
import Tenants from "./pages/Tenants";
import Payments from "./pages/Payments";
import Maintenance from "./pages/Maintenance";
import Receipts from "./pages/Receipts";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/properties" element={
              <ProtectedRoute>
                <AppLayout>
                  <Properties />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/tenants" element={
              <ProtectedRoute>
                <AppLayout>
                  <Tenants />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/payments" element={
              <ProtectedRoute>
                <AppLayout>
                  <Payments />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/maintenance" element={
              <ProtectedRoute>
                <AppLayout>
                  <Maintenance />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/receipts" element={
              <ProtectedRoute>
                <AppLayout>
                  <Receipts />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/reports" element={
              <ProtectedRoute>
                <AppLayout>
                  <Reports />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
