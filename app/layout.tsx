import { memo } from "react";
import { Metadata } from "next";
import { RootLayoutProps } from "@/types/props";
import { ThemeProvider } from "@/components/provider/ThemeProvider";
import QueryProvider from "@/components/provider/QueryProvider";
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Plus_Jakarta_Sans } from 'next/font/google';
import "../styles/globals.css";
import Header from "@/components/layout/Header";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const inter = Plus_Jakarta_Sans({
  subsets: ["vietnamese"],
  weight: ["300", "400", "700", "700"],
  variable: "--font-sans",
});

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body
        className={cn('remove-scrollbar min-h-[600px] antialiased', inter.className)}
      >
        <QueryProvider>
          <NuqsAdapter>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              {children}
              <Toaster />
            </ThemeProvider>
          </NuqsAdapter>
        </QueryProvider>
      </body>
    </html>
  );
};

export default memo(RootLayout);

export const metadata: Metadata = {
  metadataBase:new URL("http://readify-gamma.vercel.app"),
  title: "Readify - Your Personal Article Library",
  description: "Discover, bookmark, and manage your favorite articles. Get personalized recommendations based on your interests and engage with a community of readers.",
  applicationName: "Readify",
  authors: [{ name: "sinanptm", url: "https://sinanptm.vercel.app" }],
  generator: "Next.js",
  keywords: [
    "article library",
    "reading platform",
    "content discovery",
    "bookmarking",
    "personal library",
    "reading list",
    "content curation",
    "article management"
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: { icon: '/favicon.ico' },
  verification: {
    other: {
      me: ['https://sinanptm.vercel.app'],
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Readify',
    title: 'Readify - Your Personal Article Library',
    description: 'Discover, bookmark, and manage your favorite articles. Get personalized recommendations based on your interests.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Readify - Your Personal Article Library',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Readify - Your Personal Article Library',
    description: 'Discover, bookmark, and manage your favorite articles. Get personalized recommendations based on your interests.',
    images: ['/og-image.jpg'],
    creator: '@readify',
  },
  category: 'reading',
};


