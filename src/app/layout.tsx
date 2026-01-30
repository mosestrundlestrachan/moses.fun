import type { Metadata } from "next";
import { Baskervville, Montserrat } from "next/font/google";
import "./globals.css";

const baskervville = Baskervville({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Moses | Data Science & Web Design",
  description: "Hi, I'm Moses. I like to build things.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${baskervville.variable} ${montserrat.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
