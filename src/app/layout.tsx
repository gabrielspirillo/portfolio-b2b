import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AudioProvider } from "@/lib/audio";
import { LanguageProvider } from "@/lib/i18n";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Gabriel Pirillo | Full Stack Developer",
  description: "De la idea a la app, en producción. Apps, plataformas web, mobile y automatización con IA para empresas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased overflow-x-clip`}
    >
      <body className="min-h-full flex flex-col bg-[#050505] text-silver-100 leading-snug tracking-tight overflow-x-clip">
        <LanguageProvider>
          <AudioProvider>
            <SmoothScrollProvider>
              {children}
            </SmoothScrollProvider>
          </AudioProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
