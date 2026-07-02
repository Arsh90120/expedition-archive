import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EXPEDITION ARCHIVE',
  description: 'Ongoing field documentation. Unclassified.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg text-textMain min-h-screen">{children}</body>
    </html>
  );
}
