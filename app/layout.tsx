import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import "./globals.css";
import cn from "classnames";
import { BASE_URL } from "@/utils/common";
import { TooltipProvider } from "@/components/tooltip";
import { Viewport } from "next";

import { Toaster } from "@/components/toast";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500"], display: "swap" });

const title = "V-Table.com";
const description = "V-Table";

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: title,
  description: description,
  openGraph: {
    type: "website",
    siteName: "V-Table.com",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@brokariim",
  },
};

export const viewport: Viewport = {
  themeColor: "#181818",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <TooltipProvider>
        <body className={cn("isolate", inter.className)}>
          {children}
          <Toaster position="top-center" offset={70} duration={2000} />
        </body>
      </TooltipProvider>
      <Analytics />
    </html>
  );
}
