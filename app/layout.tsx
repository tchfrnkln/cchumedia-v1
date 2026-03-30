import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Breadcrumbs from "@/components/Dashboard/Breadcrumbs";

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PrintHub by C-Chu Media — Order Your Printing Online',
  description: 'Professional printing and branding solutions in Abuja, Nigeria.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${syne.variable} ${dmSans.variable} antialiased`}
      >
        <Breadcrumbs />
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
