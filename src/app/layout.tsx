import type { Metadata, Viewport } from "next";
import "./globals.css";
import BottomNav from "../components/BottomNav";
import ConvexClientProvider from "./ConvexClientProvider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Italian Tutor — Marco",
  description: "AI-powered Italian language learning",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-bg text-white min-h-screen">
        <ConvexClientProvider>
          {children}
          <BottomNav />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
