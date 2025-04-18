import { useState } from 'react';
import CommentForm from '../comments/CommentForm';
import CommentList from '../comments/CommentList';
import { Post } from '../../types';
import {
  FaComment,
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
  FaShareAlt,
  FaLightbulb,
  FaUserCircle,
  FaThumbsDown
} from 'react-icons/fa';
import { formatDistanceToNowStrict } from 'date-fns';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [showComments, setShowComments] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [likes, setLikes] = useState(post.likes);
  const [dislikes, setDislikes] = useState(post.dislikes);
  const [reflections, setReflections] = useState(post.reflections || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isReflected, setIsReflected] = useState(false);

  const handleCommentAdded = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleLike = async () => {
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    try {
      await fetch(`${API_BASE_URL}/api/posts/${post.id}/like`, { method: 'POST' });    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleDislike = async () => {
    await fetch(`${API_BASE_URL}/api/posts/${post.id}/dislike`, { method: 'POST' });    setDislikes((prev) => prev + 1);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleReflect = async () => {
    const newState = !isReflected;
    setIsReflected(newState);
    setReflections((prev) => (newState ? prev + 1 : prev - 1));

    try {
      await fetch(`${API_BASE_URL}/api/posts/${post.id}/reflect`, { method: 'POST' });    } catch (error) {
      console.error("Error reflecting on post:", error);
    }
  };

  const isAnonymous = !post.username;

  const generateAvatarColor = (username: string) => {
    // Generate a random color based on username
    const colors = ['bg-blue-400', 'bg-green-400', 'bg-red-400', 'bg-purple-400', 'bg-yellow-400'];
    const hash = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <div className="rounded-xl bg-white/70 dark:bg-white/10 backdrop-blur shadow mb-6 transition border border-transparent border-t-4 border-t-purple-700/80 animate-glow">
      <div className="flex items-center p-3">
        <div
          className={`rounded-full w-8 h-8 flex items-center justify-center mr-2 ${
            isAnonymous ? 'bg-yellow-200 dark:bg-yellow-500' : generateAvatarColor(post.username)
          }`}
        >
          {!isAnonymous ? (
            <span className="text-white font-semibold text-sm">
              {post.username.charAt(0).toUpperCase()}
            </span>
          ) : (
            <FaUserCircle className={`text-xl ${isAnonymous ? 'text-yellow-800' : 'text-white'}`} />
          )}
        </div>
        <div className="flex flex-col leading-tight">
          <span
            className={`font-semibold text-sm ${
              isAnonymous ? 'italic text-yellow-800 dark:text-yellow-300' : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            {isAnonymous ? 'Anonymous' : post.username}
          </span>
          <span className="text-gray-500 dark:text-gray-400 text-xs">
            {formatDistanceToNowStrict(new Date(post.created_at), { addSuffix: true })}
          </span>
        </div>
      </div>

      <div className="px-3 pb-3">
        <div className="text-blue-700 dark:text-blue-300 text-xs font-semibold">[{post.religion}]</div>
        <div className="italic text-lg text-gray-800 dark:text-gray-100 mt-1">“{post.sign}”</div>
        <p className="mt-2 text-gray-700 dark:text-gray-200 text-sm">{post.thought}</p>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-x-1 ${isLiked ? 'text-red-500' : 'text-gray-600 dark:text-gray-400'} hover:scale-110 transition-transform text-sm`}
            >
              {isLiked ? <FaHeart /> : <FaRegHeart />} <span className="text-xs">{likes}</span>
            </button>

            <button onClick={handleDislike} className="…">
  <FaThumbsDown /> <span>{dislikes}</span>
</button>


            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-x-1 text-gray-600 dark:text-gray-400 hover:scale-110 transition-transform text-sm"
            >
              <FaComment /> <span className="text-xs">{post.comments.length}</span>
            </button>

            <button
              onClick={handleReflect}
              className={`flex items-center gap-x-1 hover:scale-110 transition-transform text-sm ${isReflected ? 'text-blue-500' : 'text-gray-600 dark:text-gray-400'}`}
            >
              <FaLightbulb /> <span className="text-xs">{reflections}</span>
            </button>

            <button className="text-gray-600 dark:text-gray-400 hover:scale-110 transition-transform text-sm">
              <FaShareAlt />
            </button>
          </div>
          <button
            onClick={handleSave}
            className="text-gray-600 dark:text-gray-400 hover:scale-110 transition-transform text-sm"
          >
            {isSaved ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        </div>

        {post.comments.length > 0 && !showComments && (
          <button
            onClick={() => setShowComments(true)}
            className="text-xs mt-2 text-blue-600 dark:text-blue-300 hover:underline flex items-center gap-1"
          >
            <FaComment className="text-sm" /> View all {post.comments.length} comments
          </button>
        )}

        {showComments && (
          <div className="mt-2">
            <CommentList key={refreshKey} postId={post.id} />
            <CommentForm postId={post.id} onCommentAdded={handleCommentAdded} />
            <hr className="my-4 border-t border-gray-300 dark:border-gray-700" />
          </div>
        )}
      </div>
    </div>
  );
}
