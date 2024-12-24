import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Sidebar } from '@/components/ui/sidebar';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TalentMatch - Startup Talent Platform",
  description: "Find and hire the best talent for your startup",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
