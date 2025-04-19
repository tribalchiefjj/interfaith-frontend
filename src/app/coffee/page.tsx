"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

const CoffeePage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-purple-900 via-pink-900 to-purple-800 text-white overflow-hidden">
      
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-30">
        <Navbar />
      </div>

      {/* Background Logo */}
      <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none">
        <Image
          src="/logo.png"
          alt="Logo"
          width={500}
          height={500}
          className="opacity-40 select-none"
          priority={false}
        />
      </div>

      {/* Page Content */}
      <div className="relative z-10 mt-7 px-6 py-10 max-w-2xl mx-auto space-y-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Support Echoes of Insight</h1>
        
        <p className="text-lg leading-relaxed">
          Hey friend ☕ — If you’ve found value in what we’re building here and want to support
          the hosting, database costs, and backend work that keep this space alive, you can help out right here.
        </p>

        <p className="text-pink-300 italic">
          We may not have fancy payment integrations yet, but we’re grateful for your intention and energy!
        </p>

        <div className="pt-4">
          <Image
            src="/coffee-cup.png"
            alt="Coffee Cup"
            width={100}
            height={100}
            className="mx-auto animate-bounce"
          />
        </div>

        <p className="text-sm text-gray-300">
          More ways to support (M-Pesa, PayPal, or bank) coming soon 💜
        </p>
      </div>
    </div>
  );
};

export default CoffeePage;
