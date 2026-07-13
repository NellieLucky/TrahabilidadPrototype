import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AccessibilityProvider } from "@/components/accessibility/settings-provider";
import { ToastProvider } from "@/components/ui/toast";

const inter = Inter({
  variable: "--font-inter-family",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TrahAbilidad - Accessible Job Portal for PWDs",
  description: "Empowering People with Disabilities (PWDs) through inclusive hiring, screen-reader support, and transparent job accommodations.",
  keywords: ["accessibility", "PWD", "inclusive hiring", "job portal", "wcag", "jobs philippines"],
  authors: [{ name: "TrahAbilidad Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <AccessibilityProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}

