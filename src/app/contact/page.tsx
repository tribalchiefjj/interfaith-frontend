"use client";
import React from 'react';
import { FaInstagram, FaEnvelope, FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';
import Navbar from '@/components/Navbar'; // Adjust the path based on your project
import Image from 'next/image'
const ContactUsPage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-purple-900 via-pink-900 to-purple-800 text-white overflow-hidden">
      
      <div className="fixed top-0 left-0 right-0 z-30">
        <Navbar />
      </div>

      <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none">
  <Image
    src="/logo.png"
    alt="Logo"
    width={500}        
    height={500}
    className="opacity-50 select-none"
    priority={false}  
  />
</div>

      <div className="relative z-10 mt-24 px-6 py-12 max-w-2xl mx-auto space-y-8 text-center">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="text-lg leading-relaxed">
          While we’re working on an official contact form, feel free to reach out through any of the platforms below. If you have questions or feedback, we’d love to hear from you!
        </p>

        {/* Social Media Links */}
        <div className="flex justify-center gap-8 text-3xl">
          <a
            href="https://www.instagram.com/_jjafar"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400 transition"
          >
            <FaInstagram title="Instagram" />
          </a>
          <a
            href="mailto:tribalchiefjj@gmail.com"
            className="hover:text-pink-400 transition"
          >
            <FaEnvelope title="Email" />
          </a>
          <a
            href="https://wa.me/+254728738541"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400 transition"
          >
            <FaWhatsapp title="WhatsApp" />
          </a>
          <a
            href="https://t.me/Tribalchiefjj"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400 transition"
          >
            <FaTelegramPlane title="Telegram" />
          </a>
        </div>

        <p className="italic text-sm text-gray-300">
          A contact form is coming soon. Thanks for your patience!
        </p>
      </div>
    </div>
  );
};

export default ContactUsPage;
