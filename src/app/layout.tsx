import type { Metadata } from 'next';
import { ReactNode } from 'react';

import { GameProvider } from '@/context';
import { ErrorBoundary } from '@/components';
import { QueryProvider } from '@/lib/providers/query-provider';
import './globals.css';

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
      <ErrorBoundary>
        <QueryProvider>
          <GameProvider>{children}</GameProvider>
        </QueryProvider>
      </ErrorBoundary>
    </body>
  </html>
);

export default RootLayout;
