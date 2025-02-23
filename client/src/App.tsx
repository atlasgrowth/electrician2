import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home";
import AdminPage from "@/pages/admin";

// Use '/electrician2' as the base path for GitHub Pages
const basePath = '/electrician2';

function RouterSetup() {
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