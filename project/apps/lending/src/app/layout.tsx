import './global.css';
import { Geist, Goldman, JetBrains_Mono } from 'next/font/google';
import { cn } from '@/lib/utils';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });
const goldman = Goldman({
  weight: ['700'],
  variable: '--font-goldman',

  subsets: ['latin'],
});
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata = {
  title: 'Kvasir',
  description: 'Your deep learning platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        'font-sans',
        geist.variable,
        goldman.variable,
        mono.variable,
        'dark',
      )}
    >
      <body>{children}</body>
    </html>
  );
}
