import "@/styles/globals.css";
import { GetServerSidePropsContext, Metadata, Viewport } from "next";
import clsx from "clsx";
import { headers } from "next/headers";

import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import RegisterSW from "@/components/register-sw";
import PWAInstallPrompt from "@/components/pwa-install-prompt";
import { getIsSsrMobile } from "@/lib/getIsSsrMobile";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const context = { req: { headers: { "user-agent": userAgent } } } as GetServerSidePropsContext;
  const isSsrMobile = getIsSsrMobile(context);

  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/icon512_maskable.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icon512_maskable.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FFFFFF" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={siteConfig.name} />
        <link rel="apple-touch-startup-image" href="/images/splash/launch-640x1136.png" sizes="640x1136" />
        <link rel="apple-touch-startup-image" href="/images/splash/launch-750x1294.png" sizes="750x1334" />
        <link rel="apple-touch-startup-image" href="/images/splash/launch-1242x2148.png" sizes="1242x2148" />
        <link rel="apple-touch-startup-image" href="/images/splash/launch-1125x2436.png" sizes="1125x2436" />
        <link rel="apple-touch-startup-image" href="/images/splash/launch-1536x2048.png" sizes="1536x2048" />
        <link rel="apple-touch-startup-image" href="/images/splash/launch-1668x2224.png" sizes="1668x2224" />
        <link rel="apple-touch-startup-image" href="/images/splash/launch-2048x2732.png" sizes="2048x2732" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </head>
      <body
        className={clsx(
          "min-h-screen text-foreground bg-white font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers
          themeProps={{ attribute: "class", defaultTheme: "light" }}
          isMobile={isSsrMobile}
        >
          <RegisterSW />
          <PWAInstallPrompt />
          {children}
        </Providers>
      </body>
    </html>
  );
}
