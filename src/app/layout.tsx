import type { Metadata } from 'next';
import { ReactNode } from 'react';

import { GameProvider } from '@/context';

import './globals.css';
import { QueryProvider } from '@/lib/providers/query-provider';

export const metadata: Metadata = {
  title: 'How to become a millionaire',
  description: 'Smart steps to your first million.',
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: Readonly<RootLayoutProps>) => (
  <html lang="en">
    <body>
      <QueryProvider>
        <GameProvider>{children}</GameProvider>
      </QueryProvider>
    </body>
  </html>
);

export default RootLayout;
