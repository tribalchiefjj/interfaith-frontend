'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Comment {
  id: number;
  post_id: number;
  text: string;
  created_at: string;
  username: string;
}

interface Post {
  id: number;
  religion: string;
  sign: string;
  thought: string;
  created_at: string;
  username: string;
  likes: number;
  dislikes: number;
  comments: Comment[];
  pinned: boolean;
}

export default function AdminDashboard() {
  const API = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editPostForm, setEditPostForm] = useState({
    religion: '',
    sign: '',
    thought: '',
    username: '',
  });
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editCommentForm, setEditCommentForm] = useState({
    text: '',
    username: '',
  });
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const t = localStorage.getItem('adminToken');
    if (!t) return router.push('/admin/login');
    setToken(t);
  }, [router]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: unknown = await res.json();
      if (!Array.isArray(data)) throw new Error('Invalid post data');

      const sortedPosts = [...data as Post[]].sort((a, b) =>
        (b.pinned ? 1 : -1) - (a.pinned ? 1 : -1)
      );
      setPosts(sortedPosts);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError('Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchPosts();
  }, [token]);

  const handleDeletePost = async (id: number) => {
    if (!confirm('Delete this post?')) return;
    await fetch(`${API}/api/posts/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    setPosts((ps) => ps.filter((p) => p.id !== id));
  };

  const handleEditPost = (post: Post) => {
    setEditingPostId(post.id);
    setEditPostForm({
      religion: post.religion,
      sign: post.sign,
      thought: post.thought,
      username: post.username,
    });
  };

  const handleSavePost = async (id: number) => {
    await fetch(`${API}/api/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editPostForm),
    });
    setEditingPostId(null);
    fetchPosts();
  };

  const handleDeleteComment = async (id: number) => {
    if (!confirm('Delete this comment?')) return;
    await fetch(`${API}/api/comments/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchPosts();
  };

  const handleEditComment = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditCommentForm({
      text: comment.text,
      username: comment.username,
    });
  };

  const handleSaveComment = async (id: number) => {
    await fetch(`${API}/api/comments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editCommentForm),
    });
    setEditingCommentId(null);
    fetchPosts();
  };

  const handleTogglePin = async (postId: number, isPinned: boolean) => {
    try {
      const res = await fetch(`${API}/api/posts/${postId}/pin`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ pinned: !isPinned }),
      });

      if (!res.ok) {
        throw new Error(`Failed to ${isPinned ? 'unpin' : 'pin'} post`);
      }

      setMessage(`Post ${isPinned ? 'unpinned' : 'pinned'} successfully`);
      setTimeout(() => setMessage(''), 3000);
      fetchPosts();
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError('Unknown error occurred');
      setTimeout(() => setError(''), 3000);
    }
  };

  if (!token) return <p>Checking authentication...</p>;

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={() => {
              localStorage.removeItem('adminToken');
              router.push('/admin/login');
            }}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Sign Out
          </button>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}

        {posts.map((post) => (
          <div
            key={post.id}
            className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6 ${
              post.pinned ? 'border-l-4 border-yellow-500' : ''
            }`}
          >
            {editingPostId === post.id ? (
              <div className="space-y-3">
                <input
                  className="w-full p-2 border rounded"
                  value={editPostForm.religion}
                  onChange={(e) =>
                    setEditPostForm((f) => ({ ...f, religion: e.target.value }))
                  }
                  placeholder="Religion"
                />
                <input
                  className="w-full p-2 border rounded"
                  value={editPostForm.sign}
                  onChange={(e) =>
                    setEditPostForm((f) => ({ ...f, sign: e.target.value }))
                  }
                  placeholder="Sign"
                />
                <textarea
                  className="w-full p-2 border rounded"
                  rows={3}
                  value={editPostForm.thought}
                  onChange={(e) =>
                    setEditPostForm((f) => ({ ...f, thought: e.target.value }))
                  }
                  placeholder="Thought"
                />
                <input
                  className="w-full p-2 border rounded"
                  value={editPostForm.username}
                  onChange={(e) =>
                    setEditPostForm((f) => ({ ...f, username: e.target.value }))
                  }
                  placeholder="Username"
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => handleSavePost(post.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingPostId(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    {post.pinned && (
                      <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-semibold text-yellow-800 mr-2">
                        📌 Pinned
                      </span>
                    )}
                    <h2 className="text-xl font-semibold">
                      [{post.religion}] {post.sign}
                    </h2>
                    <p className="mt-2">{post.thought}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {post.username} • {new Date(post.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEditPost(post)}
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleTogglePin(post.id, post.pinned)}
                      className={`${
                        post.pinned ? 'bg-yellow-600' : 'bg-gray-600'
                      } text-white px-3 py-1 rounded`}
                    >
                      {post.pinned ? 'Unpin' : 'Pin'}
                    </button>
                  </div>
                </div>

                {post.comments.length > 0 && (
                  <div className="space-y-4 mt-4">
                    {post.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="bg-gray-700 text-white p-3 rounded-md shadow-sm"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm">{comment.username}</p>
                            <p>{comment.text}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleDeleteComment(comment.id)}
                              className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => handleEditComment(comment)}
                              className="bg-blue-500 text-white px-2 py-1 rounded"
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                        {editingCommentId === comment.id && (
                          <div className="mt-2 space-y-2">
                            <textarea
                              className="w-full p-2 border rounded"
                              rows={2}
                              value={editCommentForm.text}
                              onChange={(e) =>
                                setEditCommentForm((f) => ({
                                  ...f,
                                  text: e.target.value,
                                }))
                              }
                              placeholder="Edit comment"
                            />
                            <input
                              className="w-full p-2 border rounded"
                              value={editCommentForm.username}
                              onChange={(e) =>
                                setEditCommentForm((f) => ({
                                  ...f,
                                  username: e.target.value,
                                }))
                              }
                              placeholder="Edit username"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleSaveComment(comment.id)}
                                className="bg-green-600 text-white px-3 py-1 rounded"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingCommentId(null)}
                                className="bg-gray-500 text-white px-3 py-1 rounded"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
