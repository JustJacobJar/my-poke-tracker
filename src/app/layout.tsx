import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../lib/theme-provider";
import { SessionProvider } from "next-auth/react";
import { Providers } from "@/lib/providers";

export const metadata: Metadata = {
  title: { template: "%s | Poke Team", default: "Home" },
  description: "Landing Page",
  creator: "Jacob A-R",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SessionProvider>
              <div>{children}</div>
            </SessionProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
