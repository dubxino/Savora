import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import "./redesign.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SAVORA Trading FZE LLC | Foodstuff Trading & Agricultural Sourcing",
  description:
    "Discover SAVORA Trading, a UAE-licensed trading business built on grocery retail and wholesale experience in Kerala since 2000.",
  metadataBase: new URL("https://savoratrading.com"),
  openGraph: {
    title: "SAVORA Trading FZE LLC",
    description: "Connecting markets. Moving opportunities.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable}`}>{children}</body>
    </html>
  );
}
