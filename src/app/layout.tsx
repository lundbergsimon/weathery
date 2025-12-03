import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weathery",
  description: "Show the weather around you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="absolute w-full min-h-screen">
            <header className="px-2 py-1 font-mono flex gap-1 justify-center items-baseline">
              <h1>Weathery</h1>
              <h1 className="text-text-muted text-sm">(Alpha)</h1>
            </header>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
