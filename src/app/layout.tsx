'use client';
import './globals.css';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { usePathname } from 'next/navigation';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [, setTheme] = useState<'light' | 'dark'>('light');
  const [showFooter, setShowFooter] = useState(true);  // State to control Footer visibility
  const pathname = usePathname(); // Get the current route

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    // Set footer visibility based on the current pathname
    setShowFooter(pathname !== '/');
  }, [pathname]);



  return (
    <html lang="en">
 <head>
  <title>Echoes of Insight</title>
  <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="512x512" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="shortcut icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />
</head>

      <body
        className={`${inter.className} bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-black text-gray-900 dark:text-gray-100`}
      >
        {/* Only render Navbar if not on the landing page */}
        {pathname !== '/' && <Navbar />}
        <div className="p-4 flex justify-end max-w-6xl mx-auto">
          {/* any additional header content you might have */}
        </div>
        {children}
        {/* Conditionally render Footer */}
        {showFooter && <Footer />}
      </body>
    </html>
  );
}
