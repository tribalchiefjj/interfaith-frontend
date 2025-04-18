import { useState } from 'react';
import { motion } from 'framer-motion';

interface Comment {
  id: number;
  text: string;
  created_at: string;
  username: string;
  replies?: Comment[];
}

interface Props {
  comment: Comment;
  postId: number;
  onReplyAdded: () => void;
}

export default function CommentItem({ comment, postId, onReplyAdded }: Props) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replyUsername, setReplyUsername] = useState('');
  const API = process.env.NEXT_PUBLIC_API_BASE_URL!;

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    try {
      await fetch(`${API}/api/comments/${comment.id}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          post_id: postId,
          text: replyText,
          username: replyUsername
        }),
      });

      setReplyText('');
      setReplyUsername('');
      setShowReplyForm(false);
      onReplyAdded(); // Refresh the comment tree
    } catch (err) {
      console.error('Reply failed:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="ml-4 mt-2 border-l border-blue-200 dark:border-blue-700 pl-3"
    >
      <div className="text-sm text-gray-800 dark:text-gray-200 bg-white/70 dark:bg-white/10 backdrop-blur p-2 rounded">
        <div className="font-medium text-xs text-gray-600 dark:text-gray-400 flex items-center gap-2 mb-1">
          {comment.username === 'Anonymous' ? (
            <span className="italic text-gray-500 flex items-center gap-1">🕵️‍♂️ Anonymous</span>
          ) : (
            <span className="text-blue-600 dark:text-blue-300 font-semibold flex items-center gap-1">👤 {comment.username}</span>
          )}
          <span className="text-[10px] text-gray-400 ml-auto">{new Date(comment.created_at).toLocaleString()}</span>
        </div>
        <div>{comment.text}</div>
        <button
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="text-xs text-blue-500 hover:underline mt-1"
        >
          ↩️ Reply
        </button>

        {showReplyForm && (
          <form onSubmit={handleReplySubmit} className="mt-2 space-y-1">
            <input
              type="text"
              placeholder="Your name (optional)"
              value={replyUsername}
              onChange={(e) => setReplyUsername(e.target.value)}
              className="w-full text-sm p-1 border rounded dark:bg-gray-800 dark:text-white"
            />
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={2}
              className="w-full text-sm p-1 border rounded dark:bg-gray-800 dark:text-white"
              placeholder="Write a reply..."
            />
            <button type="submit" className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
              ➕ Reply
            </button>
          </form>
        )}
      </div>

      {/* Recursive replies */}
      {comment.replies && comment.replies.map((reply) => (
        <CommentItem key={reply.id} comment={reply} postId={postId} onReplyAdded={onReplyAdded} />
      ))}
    </motion.div>
  );
}
