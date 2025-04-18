'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_API_BASE_URL!;  // pulled from .env.local

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('adminToken', data.token);
        router.push('/admin');
      } else {
        setErrorMsg(data.error || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMsg('An error occurred');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-200 dark:from-gray-800 dark:to-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full transform transition-all hover:scale-105"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600 dark:text-blue-300">
          Admin Login
        </h2>

        {errorMsg && (
          <p className="mb-4 text-center text-red-500">{errorMsg}</p>
        )}

        <div className="mb-4">
          <label
            htmlFor="username"
            className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-gray-100"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-gray-100"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 dark:bg-blue-500 text-white py-3 rounded hover:bg-blue-700 dark:hover:bg-blue-400 transition"
        >
          Log in
        </button>
      </form>
    </div>
  );
}
