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
  FaPrayingHands,
  FaCoffee,
} from 'react-icons/fa';
import { GiMeditation, GiPeaceDove, GiFlame } from 'react-icons/gi';
import { MdOutlinePentagon } from 'react-icons/md';
import { TbStars, TbYinYang } from 'react-icons/tb';

const allReligions = [
  'All',
  'Admin',
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

const POSTS_PER_PAGE = 5;

export default function Home() {
  const iconEntries = Object.entries(religionIcons);
  const firstLine = iconEntries.slice(0, 9);
  const secondLine = iconEntries.slice(9);
  const [posts, setPosts] = useState<Post[]>([]);
  const [filtered, setFiltered] = useState<Post[]>([]);
  const [selected, setSelected] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const API = process.env.NEXT_PUBLIC_API_BASE_URL!;

  useEffect(() => {
    setLoading(true);
    fetch(`${API}/api/posts`)
      .then((r) => r.json())
      .then((data) => {
        const sortedData = [...data].sort((a, b) =>
          (b.pinned ? 1 : -1) - (a.pinned ? 1 : -1)
        );
        setPosts(sortedData);
      })
      .finally(() => setLoading(false));
  }, [API]);

  useEffect(() => {
    const filteredPosts = selected === 'All'
      ? posts
      : posts.filter((p) => p.religion === selected);

    const sortedFiltered = [...filteredPosts].sort((a, b) =>
      (b.pinned ? 1 : -1) - (a.pinned ? 1 : -1)
    );

    setFiltered(sortedFiltered);
    setCurrentPage(1);
  }, [selected, posts]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading posts, this might take a minute...
      </div>
    );
  }

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filtered.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-black text-gray-900 dark:text-gray-100 px-4 py-10">
      <div className="max-w-4xl mx-auto">

        {/* Curved Title */}
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

        {/* Coffee Icon - Mobile only
        <div className="md:hidden flex justify-center mb-6">
          <button
            className="flex items-center text-amber-800 dark:text-yellow-300 hover:scale-110 transition-transform"
            title="Buy me a coffee"
            onClick={() => window.location.href = '/coffee'}
          >
            <FaCoffee className="text-2xl" />
            <span className="ml-2 text-sm font-semibold">Coffee?</span>
          </button>
        </div> */}

        {/* Religion Icons - Mobile */}
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

        {/* Religion Icons - Desktop */}
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

        {/* Description */}
        <p className="text-lg mt-2 italic font-bold text-gray-600 dark:text-gray-400 text-center mb-8">
          So you think people should follow your path or should not follow something? WHY??<br />
          Well, the mic is yours, tap the button below.
        </p>

        {/* Share Button */}
        <div className="flex justify-center mb-7">
          <Link href="/create">
            <button className="flex items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-4 rounded-2xl shadow-xl transform hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-300 ease-in-out">
              <FaShareAlt className="mr-3 text-white" size={20} />
              <span className="text-lg font-semibold">share</span>
            </button>
          </Link>
        </div>

        {/* Coffee Button Below Share Button */}
        <div className="md:hidden flex justify-center mb-6">
          <button
            className="flex items-center bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 px-4 py-3 rounded-lg shadow-lg animate-pulse hover:scale-105 transition-transform"
            onClick={() => window.location.href = '/coffee'}
            title="Buy me a coffee"
          >
            <FaCoffee className="text-2xl" />
            <span className="ml-3 font-semibold text-base">?</span>
          </button>
        </div>





        

        <ReligionFilter
          selectedReligion={selected}
          onSelectReligion={setSelected}
          religions={allReligions}
        />

        {filtered.length > 0 ? (
          <>
            <PostList posts={currentPosts} />
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`mx-1 px-3 py-1 rounded-md ${
                      currentPage === page
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-300 hover:text-white'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
            No reflections found for the selected category. Be the first to share!
          </p>
        )}
      </div>
    </div>
  );
}
