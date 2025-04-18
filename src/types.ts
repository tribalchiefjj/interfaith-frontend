export interface Comment {
    id: number;
    text: string;
    created_at: string;
    username: string; // 🆕
  }
  
  export interface Post {
    avatar: string | Blob | undefined;
    reflections?: number
    likes: number;
    id: number;
    religion: string;
    sign: string;
    thought: string;
    created_at: string;
    username: string; // 🆕
    comments: Comment[]; // 👈 Required comments array
    dislikes: number; // 👈 new
  }