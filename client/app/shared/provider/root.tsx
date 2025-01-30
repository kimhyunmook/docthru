"use client";
import { PropsWithChildren } from "react";
import { AuthProvider } from "./authProvider";
import HeaderProvider from "./headerProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 60 * 1000 * 10,
    },
  },
});

export default function Provider({ children }: PropsWithChildren) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <HeaderProvider />
          {children}
        </AuthProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}
