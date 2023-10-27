import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { TrpcProvider } from '@/util/trpcProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WS Test',
  description: 'tRPC with NextAuth over Websockets',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <TrpcProvider>{children}</TrpcProvider>
      </body>
    </html>
  );
}
