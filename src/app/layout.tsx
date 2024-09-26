import type { Metadata } from 'next';
import '@/public/globals.css';
import './layout.css';

export const metadata: Metadata = {
  title: {
    default: 'Kubuś Piekarenka',
    template: '%s - Kubuś',
  },
  description:
    'Śniadanie & piekarenka. Otwarte codziennie 8:00 - 20:00 ul. Marszałkowska 19, Warszawa',
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="layout">
      <body>{children}</body>
    </html>
  );
}
