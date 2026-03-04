import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "ChiliHub — AI-Powered Chili Farming Platform",
  description:
    "The first dedicated platform for chili pepper farmers. AI disease detection, real-time price tracking, growing guides, and profitability analysis.",
  keywords: [
    "chili farming",
    "pepper disease detection",
    "chili price tracker",
    "agriculture AI",
    "crop disease identification",
  ],
  openGraph: {
    title: "ChiliHub — AI-Powered Chili Farming Platform",
    description: "The first dedicated platform for chili pepper farmers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
