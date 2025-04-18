interface Post {
    id: number;
    religion: string;
    sign: string;
    thought: string;
    created_at: string;
  }
  
  interface ReflectionListProps {
    posts: Post[];
  }
  
  export default function ReflectionList({ posts }: ReflectionListProps) {
    return (
      <>
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-100">
          🧠 Recent Reflections
        </h2>
  
        {posts.map((post) => (
          <div
            key={post.id}
            className="border dark:border-gray-700 p-4 mb-4 rounded-xl bg-white/70 dark:bg-white/10 backdrop-blur shadow hover:scale-[1.01] transition"
          >
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              {new Date(post.created_at).toLocaleString()}
            </div>
            <div className="font-semibold text-blue-700 dark:text-blue-300">[{post.religion}]</div>
            <div className="italic text-xl text-gray-800 dark:text-gray-100 mt-1">“{post.sign}”</div>
            <p className="mt-2 text-gray-700 dark:text-gray-200">{post.thought}</p>
          </div>
        ))}
      </>
    );
  }
  