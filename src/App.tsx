
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Properties from "./pages/Properties";
import Tenants from "./pages/Tenants";
import Payments from "./pages/Payments";
import Maintenance from "./pages/Maintenance";
import Receipts from "./pages/Receipts";  // New import
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          } />
          <Route path="/properties" element={
            <AppLayout>
              <Properties />
            </AppLayout>
          } />
          <Route path="/tenants" element={
            <AppLayout>
              <Tenants />
            </AppLayout>
          } />
          <Route path="/payments" element={
            <AppLayout>
              <Payments />
            </AppLayout>
          } />
          <Route path="/maintenance" element={
            <AppLayout>
              <Maintenance />
            </AppLayout>
          } />
          <Route path="/receipts" element={  // New route
            <AppLayout>
              <Receipts />
            </AppLayout>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
