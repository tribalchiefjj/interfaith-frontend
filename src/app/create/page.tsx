'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ShareForm from '@/components/forms/ShareForm';

const religions = ['Islam', 'Christianity', 'Hinduism', 'Judaism', 'Buddhism', 'Other'];

export default function CreatePage() {
  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const [form, setForm] = useState({
    religion: '',
    sign: '',
    thought: '',
    username: '',
    tags: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`${API}/api/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    router.push('/posts');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-black dark:to-gray-900 text-gray-900 dark:text-gray-100 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-800 dark:text-blue-300">
          ✍️ Share Your Reflection
        </h1>
        <ShareForm
          form={form}
          religions={religions}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
