import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home";
import AdminPage from "@/pages/admin";

// Get base path from environment variable or default to ''
const basePath = '/electrician2';

// Custom hook to handle base path
const useBasePath = () => {
  return (path: string) => {
    if (path === '/') return basePath || '/';
    return `${basePath}${path}`;
  };
};

function RouterSetup() {
  const getPath = useBasePath();

  return (
    <WouterRouter base={basePath}>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/admin" component={AdminPage} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterSetup />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;