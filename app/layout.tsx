import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Safespace - Mental Health Companion',
  description: 'A safe space to talk, reflect, and grow. Your personal mental health companion.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
