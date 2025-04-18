import PostCard from './PostCard';
import { Post } from '../../types'; // shared types

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-100">
        🧠 Recent Reflections 
      </h2>

      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
}