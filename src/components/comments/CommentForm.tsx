import { useState } from 'react';

interface CommentFormProps {
  postId: number;
  onCommentAdded: () => void;
}

export default function CommentForm({ postId, onCommentAdded }: CommentFormProps) {
  const [comment, setComment] = useState('');
  const [username, setUsername] = useState('');
  const API = process.env.NEXT_PUBLIC_API_BASE_URL!;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      const response = await fetch(`${API}/api/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: postId, text: comment, username }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      setComment('');
      onCommentAdded(); // Refresh comments
    } catch (err) {
      console.error('Comment submission error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 flex flex-col">
      <input
        type="text"
        placeholder="Your name (optional)"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full mb-2 p-2 border rounded dark:bg-gray-800 dark:text-white"
      />
      <textarea
        className="w-full p-2 border dark:border-gray-700 rounded bg-white dark:bg-gray-900 dark:text-white"
        rows={2}
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        type="submit"
        className="self-end mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
      >
        ➕ Comment
      </button>
    </form>
  );
}
