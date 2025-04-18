import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Comment {
  id: number;
  text: string;
  created_at: string;
  username: string;
  replies?: Comment[];
}

export default function CommentList({ postId }: { postId: number }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState<string>('');
  const API = process.env.NEXT_PUBLIC_API_BASE_URL!;


  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/comments/${postId}`);
      if (!res.ok) throw new Error('Failed to fetch comments');
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error('Fetch failed:', err);
    }
  }, [API, postId]); // Add dependencies here

  useEffect(() => {
    fetchComments();
  }, [postId, fetchComments]);

  const handleReply = async (parentId: number) => {
    if (!replyText.trim()) return;

    try {
      const res = await fetch(`${API}/api/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          post_id: postId,
          text: replyText,
          parent_comment_id: parentId,
          username: 'Anonymous', 
        }),
      });

      if (!res.ok) throw new Error('Failed to post reply');
      setReplyText('');
      setReplyingTo(null);
      fetchComments(); // refresh comment list
    } catch (err) {
      console.error('Failed to reply:', err);
    }
  };

  const renderComment = (comment: Comment, depth: number = 0) => (
    <motion.div
      key={comment.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`ml-${depth * 4} mt-2 border-l-2 pl-2 ${
        depth === 0 ? 'border-blue-300 dark:border-blue-500' : 'border-blue-200 dark:border-blue-400'
      } text-sm text-gray-800 dark:text-gray-200 bg-white/70 dark:bg-white/10 backdrop-blur p-2 rounded`}
    >
      <div className="font-medium text-xs text-gray-600 dark:text-gray-400 mb-1 flex items-center gap-2">
        {comment.username === 'Anonymous' ? (
          <span className="italic text-gray-500 flex items-center gap-1">🕵️‍♂️ Anonymous</span>
        ) : (
          <span className="text-blue-600 dark:text-blue-300 font-semibold flex items-center gap-1">👤 {comment.username}</span>
        )}
        <span className="text-[10px] text-gray-400 ml-auto">
          {new Date(comment.created_at).toLocaleString()}
        </span>
      </div>

      <div>{comment.text}</div>

      <div className="mt-1">
        <button
          onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
          className="text-xs text-blue-500 hover:underline"
        >
          Reply
        </button>

        {replyingTo === comment.id && (
          <div className="mt-2 space-y-1">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write your reply..."
              className="w-full p-2 text-sm rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              rows={2}
            />
            <div className="flex gap-2">
              <button
                onClick={() => handleReply(comment.id)}
                className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Submit
              </button>
              <button
                onClick={() => {
                  setReplyingTo(null);
                  setReplyText('');
                }}
                className="text-xs text-gray-500 hover:underline"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {comment.replies &&
        comment.replies.map((reply) => renderComment(reply, depth + 1))}
    </motion.div>
  );

  return (
    <div className="mt-3 space-y-2">
      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">💬 Comments:</h4>
      {comments.length === 0 ? (
        <p className="text-xs text-gray-500 dark:text-gray-400">No comments yet.</p>
      ) : (
        comments.map((comment) => renderComment(comment))
      )}
    </div>
  );
}
