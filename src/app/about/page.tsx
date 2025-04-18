"use client";
import React from 'react';
import Navbar from '@/components/Navbar'; 
import Image from 'next/image'
const AboutUsPage = () => {
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
      {/* Scrollable Page Content Below Navbar */}
      <div className="relative z-10 mt-7 px-6 py-2 max-w-3xl mx-auto space-y-8">
        {/* --- Page Title --- */}
        <h1 className="text-4xl md:text-5xl font-bold text-center">About Us</h1>

        {/* --- Intro --- */}
        <p className="text-lg leading-relaxed">
          Welcome to <span className="font-semibold">Echoes of Insight</span>—a sanctuary where reflections from every faith, path, or philosophy come together in harmony. We believe that each of us carries unique “signs” or moments of clarity—those “Ohhhh…” realizations—that can spark understanding, empathy, and peace in others. Here’s who we are and what we stand for:
        </p>

        {/* --- Our Mission --- */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">🌟 Our Mission</h2>
          <p className="leading-relaxed">
            To bridge divides and foster mutual respect by giving voice to honest, heartfelt reflections. Instead of debating doctrines or traditions, we shine a light on the personal experiences and “signs” that move us, hoping to guide someone else toward a new perspective.
          </p>
        </div>

        {/* --- Our Community --- */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">🌍 Our Community</h2>
          <ul className="list-disc list-inside leading-relaxed space-y-1">
            <li><strong>Inclusive & Respectful:</strong> Everyone—whether you walk a religious path, follow spirituality, or simply seek meaning—is welcome.</li>
            <li><strong>Open Dialogue:</strong> Share your sign, your questions, your wonderings. Listen to others without judgment.</li>
            <li><strong>Support & Growth:</strong> Encourage one another, celebrate shared truths, and learn from different lenses.</li>
          </ul>
        </div>

        {/* --- How It Works --- */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">🔍 How It Works</h2>
          <ul className="list-decimal list-inside leading-relaxed space-y-1">
            <li>
              <strong>Share a Reflection</strong>
              <ul className="list-disc list-inside mt-1 ml-4 space-y-0.5">
                <li>Select your faith or path (or “Other”)</li>
                <li>Describe the sign you encountered</li>
                <li>Explain what it made you think, feel, or question</li>
              </ul>
            </li>
            <li>
              <strong>Explore & Filter</strong>
              <ul className="list-disc list-inside mt-1 ml-4 space-y-0.5">
                <li>Browse reflections by category or search for a specific theme</li>
                <li>“Like,” “Reflect,” or comment to deepen the conversation</li>
              </ul>
            </li>
            <li>
              <strong>Build Connections</strong>
              <ul className="list-disc list-inside mt-1 ml-4 space-y-0.5">
                <li>Follow usernames or anonymous posts</li>
                <li>Spark meaningful dialogue that transcends labels</li>
              </ul>
            </li>
          </ul>
        </div>

        {/* --- Guiding Principles --- */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">💬 Our Guiding Principles</h2>
          <ul className="list-disc list-inside leading-relaxed space-y-1">
            <li><strong>Kindness:</strong> Words have power—use them to uplift, not to divide.</li>
            <li><strong>Curiosity:</strong> Ask honest questions. Stay open to new insights.</li>
            <li><strong>Integrity:</strong> Speak your truth clearly, and respect others’ truths.</li>
            <li><strong>Peaceful Coexistence:</strong> Recognize that seeking truth is a shared journey, not a competition.</li>
          </ul>
        </div>

        {/* --- Join Us --- */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">🤝 Join Us</h2>
          <p className="leading-relaxed">
            Your story matters. By sharing your moment of reflection, you may be the catalyst for someone else’s journey toward peace, understanding, or faith. Whether you choose to post anonymously or with your name, your words can echo across communities and inspire hope.
          </p>
          <p className="italic text-center">
            Echoes of Insight—where individual reflections become collective wisdom. Start sharing today!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage; 