import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://cie-daily-website.vercel.app'),
  title: 'CIE Daily — Home of Breakpoint',
  description:
    'CIE Daily is the public website for Breakpoint, a news and knowledge platform with source-linked reporting, concise briefs, and full stories.',
  openGraph: {
    title: 'CIE Daily — Home of Breakpoint',
    description:
      'The public website for Breakpoint, a news and knowledge platform with source-linked reporting.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'CIE Daily — Home of Breakpoint',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CIE Daily — Home of Breakpoint',
    description:
      'The public website for Breakpoint, a news and knowledge platform with source-linked reporting.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
