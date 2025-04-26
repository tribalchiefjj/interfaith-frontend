// components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaCoffee, FaSun, FaMoon } from 'react-icons/fa';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // On mount: load stored or system theme
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  // Whenever theme changes: apply to <html> and persist
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <nav className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-700 dark:bg-gradient-to-r dark:from-purple-600 dark:via-pink-600 dark:to-purple-800 shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Left Side: Logo / Title + Mobile Theme Toggle */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="Logo"
                width={92}
                height={92}
                className="rounded-full animate-spin-slow hover:animate-spin-fast transition-transform"
              />
              <span className="text-2xl font-bold text-white">
                Echoes of Insight
              </span>
            </Link>

            {/* Theme Toggle (mobile only) */}
            <button
              onClick={toggleTheme}
              className="md:hidden p-2 rounded-full text-white hover:text-yellow-300 focus:outline-none transition"
              title="Toggle light / dark"
            >
              {theme === 'light' ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>
          </div>

          {/* Right Side: Desktop Menu + Mobile Hamburger */}
          <div className="flex items-center">
            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/about"
                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-pink-400 dark:hover:bg-purple-800"
              >
                About
              </Link>
              <Link
                href="/posts"
                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-pink-400 dark:hover:bg-purple-800"
              >
                Posts
              </Link>
              <Link
                href="/admin"
                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-pink-400 dark:hover:bg-purple-800"
              >
                Admin
              </Link>
              <Link
                href="/contact"
                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-pink-400 dark:hover:bg-purple-800"
              >
                Contact
              </Link>

              {/* Coffee Icon */}
              <Link
                href="/coffee"
                className="text-white hover:text-yellow-300 text-xl"
                title="Buy me a coffee ☕"
              >
                <FaCoffee />
              </Link>

              {/* Theme Toggle (desktop) */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-white hover:text-yellow-300 focus:outline-none transition"
                title="Toggle light / dark"
              >
                {theme === 'light' ? <FaSun /> : <FaMoon />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white hover:text-pink-300 focus:outline-none focus:text-pink-300"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {menuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1">
          <Link href="/about" onClick={() => setMenuOpen(false)}>
            <span className="block px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-pink-400 dark:hover:bg-purple-800">
              About
            </span>
          </Link>
          <Link href="/posts" onClick={() => setMenuOpen(false)}>
            <span className="block px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-pink-400 dark:hover:bg-purple-800">
              Posts
            </span>
          </Link>
          <Link href="/admin" onClick={() => setMenuOpen(false)}>
            <span className="block px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-pink-400 dark:hover:bg-purple-800">
              Admin Dashboard
            </span>
          </Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>
            <span className="block px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-pink-400 dark:hover:bg-purple-800">
              Contact
            </span>
          </Link>
          <Link
            href="/coffee"
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-white hover:text-yellow-300 text-xl"
            title="Buy me a coffee ☕"
          >
            <FaCoffee />
          </Link>
        </div>
      )}
    </nav>
  );
}
