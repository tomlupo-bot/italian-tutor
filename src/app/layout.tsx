import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "../components/BottomNav";

export const metadata: Metadata = {
  title: "Italian Tutor — Marco",
  description: "AI-powered Italian language learning",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-bg text-white min-h-screen">
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
