import { InternetIdentityProvider } from "@caffeineai/core-infrastructure";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Retry once on failure (avoids hammering a broken connection)
      retry: 1,
      retryDelay: 1000,
      // Don't refetch on window focus — prevents surprise re-fetches after tabbing away
      refetchOnWindowFocus: false,
      // Treat errors as thrown so error boundaries can catch them if needed
      throwOnError: false,
    },
    mutations: {
      // Don't retry mutations — they might have side effects
      retry: 0,
      throwOnError: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <InternetIdentityProvider>
      <App />
    </InternetIdentityProvider>
  </QueryClientProvider>,
);
