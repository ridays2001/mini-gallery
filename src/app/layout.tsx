import { Header } from '@/components/Header';
import { Toaster } from '@/components/ui/sonner';

import { Montserrat, Playfair_Display } from 'next/font/google';
import './globals.css';

import type { Metadata } from 'next';

const playfairDisplay = Playfair_Display({ subsets: ['latin'], variable: '--font-heading' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-body' });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang='en' className={`dark ${playfairDisplay.variable} ${montserrat.variable}`}>
			<body className='font-body'>
				<Header />
				<main className='page px-4'>{children}</main>
				<Toaster />
			</body>
		</html>
	);
}

export const metadata: Metadata = {
	title: 'Mini Image Gallery',
	description: 'A simple image gallery built with Next.js and Netlify dynamic functions.'
};
