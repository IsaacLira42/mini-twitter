import { useState } from "react";
import { Heart } from "lucide-react";
import type { Post } from "../../schemas/post.schema";
import useUserStore from "../../store/useUserStore";
import { useToast } from "../ui/Toast";

export const PostCard = ({ post }: { post: Post }) => {
  const [selected, setSelected] = useState(false);
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  const { push } = useToast();
  const hasImage = !!post.image;
  const formattedDate = new Date(post.createdAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-4 shadow-sm flex flex-col transition-all duration-300 h-auto">
      {/* Header do Cardzinho */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[16px] font-bold text-text-body-timeline-light dark:text-white text-lg">
          {post.authorName}
        </span>
        <span className="text-[14px] text-text-body-timeline-light dark:text-text-body-dark text-base">
          ·
        </span>
        <span className="text-[14px] text-text-body-timeline-light dark:text-text-body-dark text-base">
          {formattedDate}
        </span>
      </div>

      {/* Título e Texto */}
      <div className="mb-4">
        <h2 className="text-[18px] font-bold text-text-body-timeline-light dark:text-white mb-2">
          {post.title}
        </h2>
        <p className="text-text-body-timeline-light dark:text-text-body-dark leading-relaxed">
          {post.content}
        </p>
      </div>

      {/* Seção Opcional de Imagem */}
      {hasImage && (
        <div className="mb-4 overflow-hidden rounded-xl border border-gray-100 dark:border-slate-800 h-50 w-full">
          <img
            src={post.image ?? undefined}
            alt="Post content"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Footer / Ações */}
      <div className="flex items-center gap-3 mt-auto">
        <button
          onClick={() => {
            if (!isAuthenticated) {
              push({ message: "Faça login para curtir", type: "info" });
              return;
            }
            setSelected(!selected);
          }}
          className={`group flex items-center transition-colors outline-none ${
            !isAuthenticated
              ? "cursor-not-allowed opacity-70"
              : "cursor-pointer"
          }`}
          aria-pressed={selected}
          disabled={!isAuthenticated}
        >
          <Heart
            size={24}
            className={`transition-all duration-200 text-red-500 stroke-[1.5] group-hover:fill-red-500 ${
              selected ? "fill-red-500" : "fill-transparent"
            }`}
          />
        </button>
        <span className="text-text-body-timeline-light dark:text-text-body-dark text-sm font-medium">
          {selected ? post.likesCount + 1 : post.likesCount}
        </span>
      </div>
    </div>
  );
};
