import { memo } from "react";
import { Metadata } from "next";
import { RootLayoutProps } from "@/types/props";
import { ThemeProvider } from "@/components/provider/ThemeProvider";
import { Plus_Jakarta_Sans } from 'next/font/google'
import "../styles/globals.css";

const inter = Plus_Jakarta_Sans({
  subsets: ["vietnamese"],
  weight: ["300", "400", "700", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Readify",
  description: "Article Reading app",
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased ${inter.className}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default memo(RootLayout);