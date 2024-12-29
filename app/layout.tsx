import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import ThemeRegistry from "@/components/ThemeRegistry";
import Header from "@/components/Header";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/lib/queryClient";
import QueryClientWrapper from "@/components/QueryClientWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryClientWrapper>
          <AppRouterCacheProvider>
            <ThemeRegistry>
              <Header />
              {children}
            </ThemeRegistry>
          </AppRouterCacheProvider>
        </QueryClientWrapper>
      </body>
    </html>
  );
}
