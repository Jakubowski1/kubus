import type { Metadata } from "next";
import localFont from "next/font/local";
import "../../public/globals.css";

const geistSans = localFont({
  src: "../fonts/Afacad-Regular.ttf"
});


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
      <body className={`${geistSans}`}>
        {children}
      </body>
    </html>
  );
}
