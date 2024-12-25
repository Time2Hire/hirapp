import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Sidebar } from '@/components/ui/sidebar';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "fount.one | better hiring",
  description: "Find and hire the best talent for your startup",
  icons: {
    icon: [
      {
        url: '/favicon.png',
        type: 'image/png'
      }
    ],
    shortcut: '/favicon.png'
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" type="image/png" href="/favicon.png" />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="flex">
            <Sidebar />
            <div className="flex-1 ml-0 md:ml-64">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
