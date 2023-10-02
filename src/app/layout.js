"use client";
import MainHeader from "@/components/header";
import { SessionProvider } from "next-auth/react";

import "./globals.css";
// import { Inter } from "next/font/google";
import UIProvider from "./UIProvider";
import localFont from "next/font/local";
import ProgressBar from "./Progreess";

const NotoSansArabic = localFont({
  src: [
    {
      path: "../../public/fonts/NotoSansArabic_Condensed-Regular.ttf",
      weight: "normal",
    },
    {
      path: "../../public/fonts/NotoSansArabic_SemiCondensed-SemiBold.ttf",
      weight: "bold",
    },
    {
      path: "../../public/fonts/NotoSansArabic_Condensed-Bold.ttf",
      weight: "900",
    },
    // {
    //   path: "../../public/fonts/GraphikArabic-Light.ttf",
    //   weight: "300",
    // },
  ],
  variable: "--font-NotoSansArabic",
});

const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <body className={`${NotoSansArabic.className} min-h-screen`}>
        <SessionProvider>
          <UIProvider>
            <ProgressBar />
            <MainHeader />
            {children}
          </UIProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
