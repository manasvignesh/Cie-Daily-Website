import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CIE Daily — The internet, explained',
  description: 'Sharp, human stories about technology, startups, India and what comes next.',
  openGraph: { title: 'CIE Daily', description: 'The internet, explained daily.', images: [{ url: '/og.png', width: 1200, height: 630, alt: 'CIE Daily — The internet, explained daily.' }] },
  twitter: { card: 'summary_large_image', title: 'CIE Daily', description: 'The internet, explained daily.', images: ['/og.png'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
