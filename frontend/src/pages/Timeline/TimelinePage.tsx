import type { Post } from "../../schemas/post.schema";

const mockPostComImagem: Post = {
  id: 1,
  title: "Iniciando um novo processo seletivo! 🚀",
  content:
    "Really excited to share what we've been working on. The team has put in countless hours to make this seamless. Check out the screenshot below! #product #launch",
  image:
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000",
  authorId: 1,
  authorName: "Lucas Costa",
  likesCount: 128,
  createdAt: "2026-03-22T10:00:00.000Z",
};

const TimelinePage = () => {
  return (
    <div className="flex justify-center min-h-screen">
      <div className="flex flex-col max-w-160 w-full"></div>
    </div>
  );
};

export default TimelinePage;
