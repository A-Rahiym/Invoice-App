import type { Metadata } from "next";
import { League_Spartan} from "next/font/google";
import ThemeInitializer from "@/components/Themeinitializer";
import "./globals.css";

const leagueSpartan = League_Spartan({
 subsets: ["latin"],
 variable: "--font-sans",
 weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "Invoice App",
  description: "Modern invoice management application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${leagueSpartan.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-app">
        <ThemeInitializer />
        {children}
      </body>
    </html>
  );
}
