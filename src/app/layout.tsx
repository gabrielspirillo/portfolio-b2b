import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AudioProvider } from "@/lib/audio";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Gabriel | Full Stack & Automation Engineer",
  description: "B2B Portfolio of Gabriel, offering Full Stack Development, n8n Business Automation, UI/UX Design, and Audio UX.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-carbon-900 text-silver-100 leading-snug tracking-tight">
        <LanguageProvider>
          <AudioProvider>
            {children}
          </AudioProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
