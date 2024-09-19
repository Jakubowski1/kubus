import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/public/globals.css";
import "../styles/layout.module.css"


export const metadata: Metadata = {
  title: "Kubus",
  description: "Strona internetowa Kubusa piekarenki",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="layout">
      <body >
        {children}
      </body>
    </html>
  );
}
