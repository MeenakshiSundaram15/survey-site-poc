import "./globals.css";
import type { Metadata } from "next";
import Providers from "@/utils/Providers";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import { Suspense } from "react";
import { URLParamsConsumer } from "@/components/URLParamsConsumer";
import { GoogleAnalytics } from "@next/third-parties/google";
import { WhatsappContact } from "@/components/WhatsappContact";
import { BottomSheets } from "@/components/page/BottomSheets";

const myFont = localFont({
  src: "./fonts/Bauhaus Bugler W00 Medium.ttf",
  variable: "--font-bauhaus",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Wisebite",
    default: "Wisebite - Customizable diet plans!",
  },
  description: "Wisebite - Customizable diet plans!",
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${myFont.variable}`}>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      <body className={`w-full relative antialiased flex flex-col xl:min-h-full`}>
        {children}
        <Providers>
          <Suspense>
            <URLParamsConsumer suppressHydrationWarning />
          </Suspense>
          <Header />
          <BottomSheets />
          <WhatsappContact />
        </Providers>
      </body>
    </html>
  );
}
