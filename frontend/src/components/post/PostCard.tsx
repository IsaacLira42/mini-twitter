import { useState } from "react";
import { Heart } from "lucide-react";

export const PostCard = ({ post }: { post: any }) => {
  const [selected, setSelected] = useState(false);
  const hasImage = !!post.imageUrl;

  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col transition-all duration-300 h-auto">
      {/* Header do Cardzinho */}
      <div className="flex items-center gap-2 mb-4">
        <span className="font-bold text-slate-900 text-lg">
          {post.authorName}
        </span>
        <span className="text-slate-500 text-base">{post.userName}</span>
        <span className="text-slate-500 text-base">·</span>
        <span className="text-slate-500 text-base">{post.date}</span>
      </div>

      {/* Título e Texto */}
      <div className="mb-4">
        <h2 className="text-[18px] font-bold text-slate-800 mb-2">
          {post.title}
        </h2>
        <p className="text-slate-600 leading-relaxed">{post.content}</p>
      </div>

      {/* Seção Opcional de Imagem */}
      {hasImage && (
        <div className="mb-4 overflow-hidden rounded-xl border border-gray-100 h-50 w-full">
          <img
            src={post.imageUrl}
            alt="Post content"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Footer / Ações */}
      <div>
        <button
          onClick={() => setSelected(!selected)}
          className="cursor-pointer group flex items-center transition-colors outline-none"
        >
          <Heart
            size={24}
            className={`
                transition-all duration-200 
                text-red-500 stroke-[1.5]
                group-hover:fill-red-500 
                ${selected ? "fill-red-500" : "fill-transparent"}
              `}
          />
        </button>
      </div>
    </div>
  );
};
