import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import Header from '@/components/layout/Header';
import Navigation from '../components/layout/Navigation';
import '../sass/base/index.scss';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Linkroll',
    description: 'Create curated lists of links in a flash!',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={spaceGrotesk.className}>
                <Header>
                    <Navigation />
                </Header>
                {children}
            </body>
        </html>
    );
}
