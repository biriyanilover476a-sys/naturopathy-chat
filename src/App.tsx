import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import HomePage from "@/pages/HomePage";
import ChatPage from "@/pages/ChatPage";
import RemediesPage from "@/pages/RemediesPage";
import NotFound from "@/pages/NotFound";
import { useTheme } from "@/hooks/useTheme";

const queryClient = new QueryClient();

const AppContent = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/remedies" element={<RemediesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
