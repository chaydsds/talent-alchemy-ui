
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import AuthenticatedApp from "./components/auth/AuthenticatedApp";
import UnauthenticatedApp from "./components/auth/UnauthenticatedApp";

const queryClient = new QueryClient();

// Temporary bypass for testing - set to true to skip authentication
const BYPASS_AUTH_FOR_TESTING = true;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {BYPASS_AUTH_FOR_TESTING ? (
          <AuthenticatedApp />
        ) : (
          <>
            <SignedIn>
              <AuthenticatedApp />
            </SignedIn>
            <SignedOut>
              <UnauthenticatedApp />
            </SignedOut>
          </>
        )}
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
