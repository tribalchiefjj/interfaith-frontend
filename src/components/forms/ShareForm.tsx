'use client';

import { motion } from 'framer-motion';

interface ShareFormProps {
  form: {
    religion: string;
    sign: string;
    thought: string;
    username?: string;
    tags?: string;
  };
  religions: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ShareForm({ form, religions, onChange, onSubmit }: ShareFormProps) {
  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 mb-12 bg-gradient-to-br from-pink-100/80 via-purple-100/80 to-white/80 dark:from-pink-900/40 dark:via-purple-800/40 dark:to-gray-900/60 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-pink-200 dark:border-purple-600"
    >
  <p className="…">
  well well well, you are here , say it out loud , the signs are always plain as day… but we are biased ,&nbsp;
  &quot;our way is always the right way&quot; we only see the truth when someone speaks out loud.
</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Religion */}
        <div className="flex flex-col">
          <label htmlFor="religion" className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Your Path or the one you wanna talk about
          </label>
          <select
            id="religion"
            name="religion"
            value={form.religion}
            onChange={onChange}
            required
            className="p-3 border border-pink-300 dark:border-purple-600 rounded-lg bg-white dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-purple-500"
          >
            <option value="">Select Religion or Path</option>
            {religions.filter((r) => r !== 'All').map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Sign */}
        <div className="flex flex-col">
          <label htmlFor="sign" className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Topic of the sign
          </label>
          <input
            id="sign"
            name="sign"
            placeholder="e.g. Jesus died on The cross , etc"
            value={form.sign}
            onChange={onChange}
            required
            className="p-3 border border-pink-300 dark:border-purple-600 rounded-lg bg-white dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Thought */}
      <div className="flex flex-col">
        <label htmlFor="thought" className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          What It Made You Think
        </label>
        <textarea
          id="thought"
          name="thought"
          placeholder="Be Humble , Kind , and educative..."
          value={form.thought}
          onChange={onChange}
          required
          rows={5}
          className="p-3 border border-pink-300 dark:border-purple-600 rounded-lg bg-white dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-purple-500 resize-vertical"
        />
      </div>

      {/* Optional Name and Tags */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label htmlFor="username" className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Your Name (optional)
          </label>
          <input
            id="username"
            name="username"
            placeholder="Anonymous or your display name"
            value={form.username || ''}
            onChange={onChange}
            className="p-3 border border-pink-300 dark:border-purple-600 rounded-lg bg-white dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-purple-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="tags" className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Tags (optional)
          </label>
          <input
            id="tags"
            name="tags"
            placeholder="e.g. hope, reflection, peace"
            value={form.tags || ''}
            onChange={onChange}
            className="p-3 border border-pink-300 dark:border-purple-600 rounded-lg bg-white dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-3 bg-pink-600 dark:bg-purple-500 text-white font-semibold rounded-xl shadow hover:bg-pink-700 dark:hover:bg-purple-400 transition"
      >
        ✍️ Share Reflection
      </button>
    </motion.form>
  );
}
