import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminSkills from "./pages/AdminSkills";
import AdminExperience from "./pages/AdminExperience";
import AdminProjects from "./pages/AdminProjects";
import AdminCertificates from "./pages/AdminCertificates";
import AdminMessages from "./pages/AdminMessages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<AdminLogin />} />
            
            {/* Protected Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/skills"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminSkills />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/experience"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminExperience />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/projects"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminProjects />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/certificates"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminCertificates />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/messages"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminMessages />
                </ProtectedRoute>
              }
            />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
