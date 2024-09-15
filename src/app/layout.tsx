import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/public/globals.css";


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
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
