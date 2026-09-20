import "../style/index.scss";
import "./globals.css";

import Loading from "@/components/loading/Loading";
import NavigationLoadingTracker from "@/components/loading/NavigationLoadingTracker";
import AxiosRouterProvider from "@/components/providers/AxiosRouterProvider";
import AppProvider from "@/contextApi/AppProvider";
import AuthGuard from "@/guards/AuthGuard";
import { theme } from "@/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Suspense } from "react";

export const metadata = {
  title: "SITRA - SUPERADMIN",
  description: "Panel Administrativo SuperAdmin - SISTRA SRL",
};

const envTag = process.env.NEXT_PUBLIC_ENV_TAG;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="description" content="Panel Administrativo SuperAdmin - SISTRA SRL" />
        <meta name="robots" content="noindex, follow" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" type="image/svg+xml" href="/assets/img/logo/sitra.svg" />
      </head>

      <body suppressHydrationWarning>
        <div className="env-watermark">{envTag}</div>

        <ThemeProvider theme={theme}>
          <NextIntlClientProvider messages={messages}>
            <Loading />
            <Suspense fallback={null}>
              <NavigationLoadingTracker />
            </Suspense>
            <AxiosRouterProvider>
              <AppProvider>
                <AuthGuard>{children}</AuthGuard>
              </AppProvider>
            </AxiosRouterProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
