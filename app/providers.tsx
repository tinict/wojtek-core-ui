"use client";

import type { ThemeProviderProps } from "next-themes";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { I18nProvider } from "@heroui/react";
import { IsSsrMobileContext } from "@/hooks/use-detect-mobile";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
  isMobile?: boolean;
  locale?: string;
};

export function Providers({ 
  children, 
  themeProps, 
  isMobile = false,
  locale = "en-US",
}: ProvidersProps) {
  return (
    <I18nProvider locale={locale}>
      <IsSsrMobileContext.Provider value={isMobile}>
        <NextThemesProvider 
          attribute="class" 
          defaultTheme="light" 
          enableSystem={false} 
          disableTransitionOnChange 
          {...themeProps}
        >
          {children}
        </NextThemesProvider>
      </IsSsrMobileContext.Provider>
    </I18nProvider>
  );
}