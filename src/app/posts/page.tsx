'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ReligionFilter from '@/components/filters/ReligionFilter';
import PostList from '@/components/posts/PostList';
import { Post } from '../../types';
import {
  FaShareAlt,
  FaLightbulb,
  FaCross,
  FaOm,
  FaStarOfDavid,
  FaMoon,
} from 'react-icons/fa';
import { GiMeditation, GiPeaceDove, GiFlame } from 'react-icons/gi';
import { MdOutlinePentagon } from 'react-icons/md';
import { TbStars, TbYinYang } from 'react-icons/tb';
import { FaPrayingHands } from 'react-icons/fa';
// Add these imports for the error message
import { Database, Clock, RefreshCw } from 'lucide-react';

const allReligions = [
  'All',
  'Islam',
  'Christianity',
  'Hinduism',
  'Judaism',
  'Buddhism',
  'Sikhism',
  'Baháʼí Faith',
  'Jainism',
  'Shinto',
  'Taoism',
  'Paganism',
  'Atheism/Agnosticism',
  'Other',
];

const religionIcons: { [key: string]: React.ReactNode } = {
  Islam: <FaMoon className="text-blue-500 dark:text-blue-400" title="Islam" />,
  Christianity: <FaCross className="text-red-500 dark:text-red-400" title="Christianity" />,
  Hinduism: <FaOm className="text-orange-500 dark:text-orange-400" title="Hinduism" />,
  Judaism: <FaStarOfDavid className="text-purple-500 dark:text-purple-400" title="Judaism" />,
  Buddhism: <GiMeditation className="text-yellow-600 dark:text-yellow-400" title="Buddhism" />,
  Sikhism: <TbStars className="text-teal-500 dark:text-teal-400" title="Sikhism" />,
  'Baháʼí Faith': <TbStars className="text-lime-500 dark:text-lime-400" title="Baháʼí Faith" />,
  Jainism: <GiPeaceDove className="text-pink-500 dark:text-pink-400" title="Jainism" />,
  Shinto: <GiFlame className="text-red-600 dark:text-red-500" title="Shinto" />,
  Taoism: <TbYinYang className="text-indigo-500 dark:text-indigo-400" title="Taoism" />,
  Paganism: <MdOutlinePentagon className="text-green-600 dark:text-green-500" title="Paganism" />,
  'Atheism/Agnosticism': <FaLightbulb className="text-gray-500 dark:text-gray-400" title="Atheism/Agnosticism" />,
  Other: <FaPrayingHands className="text-gray-500 dark:text-gray-400" title="Other" />,
};

// Error Message Component
const DatabaseErrorMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6">
      {/* Error fetching post message */}
      <p className="text-red-500 dark:text-red-400 font-semibold text-lg mb-4 text-center">
        Error fetching posts!
      </p>
      
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 max-w-md w-full text-center shadow-lg border border-blue-200 dark:border-gray-600">
        
        {/* Icon with animation */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <Database className="w-16 h-16 text-blue-500 dark:text-blue-400" />
            <div className="absolute -top-1 -right-1">
              <RefreshCw className="w-6 h-6 text-orange-500 animate-spin" />
            </div>
          </div>
        </div>

        {/* Main message */}
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
          I am Working On It
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          i am experiencing a temporary technical issue with my database. 
          i am working to resolve this quickly.
        </p>

        {/* Status indicator */}
        <div className="flex items-center justify-center gap-2 mb-6 text-sm text-gray-500 dark:text-gray-400">
          <Clock className="w-4 h-4" />
          <span>Thank you for your patience</span>
        </div>

        {/* Action button */}
        <button 
          onClick={() => window.location.reload()} 
          className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 mx-auto"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    </div>
  );
};

export default function Home() {
  const iconEntries = Object.entries(religionIcons);
  const firstLine = iconEntries.slice(0, 9);
  const secondLine = iconEntries.slice(9);
  const [posts, setPosts] = useState<Post[]>([]);
  const [filtered, setFiltered] = useState<Post[]>([]);
  const [selected, setSelected] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const API = process.env.NEXT_PUBLIC_API_BASE_URL!;

  useEffect(() => {
    setLoading(true);
    fetch(`${API}/api/posts`)
      .then((r) => r.json())
      .then((data) => {
        setPosts(data);
        setFiltered(data);
      })
      .finally(() => setLoading(false));
  }, [API]);

  useEffect(() => {
    setFiltered(
      selected === 'All' ? posts : posts.filter((p) => p.religion === selected)
    );
  }, [selected, posts]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading posts, this might take a minute...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-black text-gray-900 dark:text-gray-100 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Curved Title with gradient */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold flex items-center justify-center gap-2">
            <FaShareAlt className="text-green-500 dark:text-green-400" size={24} />
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-700 bg-clip-text">
              <div className="flex items-center justify-center [transform-style:preserve-3d] space-x-2 text-transparent">
                <span className="inline-block transform -translate-y-3">Let</span>
                <span className="inline-block transform translate-y-1">there</span>
                <span className="inline-block transform translate-y-3">be</span>
                <span className="inline-block transform translate-y-1">light</span>
              </div>
            </div>
            <FaLightbulb className="text-yellow-500 dark:text-yellow-400" size={24} />
          </h1>
        </div>

        {/* Religion icons - Mobile view */}
        <div className="md:hidden space-y-4 mb-6">
          <div className="flex justify-center gap-2 flex-wrap px-2">
            {firstLine.map(([religion, icon]) => (
              <div 
                key={religion} 
                className="text-xl flex-shrink-0 transform transition-transform hover:scale-110"
              >
                {icon}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 flex-wrap px-2">
            {secondLine.map(([religion, icon]) => (
              <div
                key={religion}
                className="text-xl flex-shrink-0 transform transition-transform hover:scale-110"
              >
                {icon}
              </div>
            ))}
          </div>
        </div>

        {/* Religion icons - Desktop view */}
        <div className="hidden md:flex justify-center gap-3 mb-9 text-2xl lg:text-3xl overflow-x-auto scrollbar-hide px-2">
          {iconEntries.map(([religion, icon]) => (
            <div
              key={religion}
              className="flex-shrink-0 transform transition-transform hover:scale-110"
            >
              {icon}
            </div>
          ))}
        </div>

        {/* Description text */}
        <p className="text-lg mt-2 italic font-bold text-gray-600 dark:text-gray-400 text-center mb-8">
          So you think people should follow your path or should not follow something? WHY??<br />
          Well, the mic is yours, tap the button below.
        </p>

        {/* Share button */}
        <div className="flex justify-center mb-9">
          <Link href="/create">
            <button className="flex items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-4 rounded-2xl shadow-xl transform hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-300 ease-in-out">
              <FaShareAlt className="mr-3 text-white" size={20} />
              <span className="text-lg font-semibold">share</span>
            </button>
          </Link>
        </div>

        <ReligionFilter
          selectedReligion={selected}
          onSelectReligion={setSelected}
          religions={allReligions}
        />

        {filtered.length > 0 ? (
          <PostList posts={filtered} />
        ) : (
          <DatabaseErrorMessage />
        )}
      </div>
    </div>
  );
}