import { PostCard } from "../../components/post/PostCard";

const mockPostComImagem = {
  authorName: "Lucas Costa",
  userName: "@lucascosta",
  date: "22/03/2026",
  title: "Iniciando um novo processo seletivo! 🚀",
  content:
    "Really excited to share what we've be en working on. The team has put in countless hours to make this seamless. Check out the screenshot below! #product #launch",
  imageUrl:
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000",
};

const TimelinePage = () => {
  return (
    <div className="flex justify-center min-h-screen">
      <div className="flex flex-col max-w-160 w-full">
        <PostCard post={mockPostComImagem} />
      </div>
    </div>
  );
};

export default TimelinePage;
