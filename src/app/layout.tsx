import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "My Portfolio",
    template: "%s | Nalinka Heshan",
  },
  description: "Professional site and portfolio of Nalinka Heshan",
  keywords: [
    "Next.js",
    "React",
    "TypeScript",
    "Portfolio",
    "Frontend Developer",
  ],
  authors: [{ name: "Nalinka Heshan" }],
  creator: "Nalinka Heshan",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourdomain.com",
    siteName: "Nalinka Heshan Portfolio",
    title: "Nalinka Heshan Portfolio",
    description: "Professional site and portfolio of Nalinka Heshan",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nalinka Heshan Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nalinka Heshan Portfolio",
    description: "Professional site and portfolio of Nalinka Heshan",
    images: ["https://yourdomain.com/og-image.jpg"],
    creator: "@yourtwitterhandle",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
          lang="en"
          className={`${geistSans.variable}`}
          suppressHydrationWarning
      >
      <body className="min-h-screen bg-background font-sans antialiased">
      <SmoothScroll>
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </SmoothScroll>
      </body>
      </html>
  );
}
