import { Syne, DM_Sans, Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'], // Adjust weights as needed (Montserrat supports these + more)
  variable: '--font-display',
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'], // Open Sans supports these (and up to 800 if you need more)
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PrintHub by C-Chu Media — Order Your Printing Online',
  description: 'Professional printing and branding solutions in Abuja, Nigeria.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${montserrat.variable} ${openSans.variable} antialiased`}>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}