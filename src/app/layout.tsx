import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { NavMenu } from '@/shared/components/navigation-menu';
import { SessionProvider } from 'next-auth/react';
import { AuthCheck } from '@/shared/components/auth-check';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DND',
  description: 'Company',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ru' className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className='flex min-h-full flex-col' suppressHydrationWarning>
        <SessionProvider>
          <AuthCheck>
            <header className='sticky top-0 z-50 w-full'>
              <NavMenu />
            </header>
            <main className='flex flex-1 flex-col'>{children}</main>
          </AuthCheck>
        </SessionProvider>
      </body>
    </html>
  );
}
