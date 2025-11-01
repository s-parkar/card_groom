import type {Metadata} from 'next';
import { Tangerine, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const tangerine = Tangerine({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-tangerine',
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant-garamond',
});


export const metadata: Metadata = {
  title: 'Vivah Scroll',
  description: 'An auspicious wedding invitation.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth dark">
      <body className={`${tangerine.variable} ${cormorantGaramond.variable} font-body antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
