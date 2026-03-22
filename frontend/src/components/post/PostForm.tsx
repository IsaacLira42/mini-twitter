import { useState } from "react";
import { Image } from "lucide-react";
import { Buttons } from "../ui/Buttons";
import postsService from "../../api/posts.service";
import type { PostFormData, Post } from "../../schemas/post.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const PostForm = ({ onCreate }: { onCreate?: (post: Post) => void }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<Post, unknown, PostFormData>({
    mutationKey: ["posts", "create"],
    mutationFn: (payload: PostFormData) => postsService.createPost(payload),
    onSuccess: (data: Post) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      if (onCreate) onCreate(data);
      setTitle("");
      setText("");
    },
    onError: (err: unknown) => {
      console.error(err);
    },
  });

  const canSubmit = title.trim().length >= 3 && text.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    mutate({ title: title.trim(), content: text.trim() });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-full bg-white border border-gray-100 rounded-xl p-4 shadow-[4px_4px_10px_rgba(0,0,0,0.08)] font-sans flex flex-col justify-between transition-all duration-300"
    >
      <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título (min. 3 caracteres)"
          className="w-full text-lg text-slate-900 placeholder:text-slate-400 mb-2 outline-none border-none p-0 bg-transparent"
        />

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="E aí, o que está rolando?"
          rows={3}
          className="w-full text-lg text-slate-900 placeholder:text-slate-400 resize-none outline-none border-none p-0 focus:ring-0 bg-transparent"
        />
      </div>

      <div className="mt-2">
        <hr className="border-gray-100 mb-2" />

        <div className="flex items-center justify-between">
          <button
            type="button"
            className="text-button hover:bg-button/10 p-2 rounded-full transition-colors cursor-pointer outline-none"
            aria-label="Anexar imagem"
          >
            <Image size={24} strokeWidth={1.5} />
          </button>

          <Buttons
            type="submit"
            disabled={!canSubmit || isPending}
            className="h-8 px-6 text-[14px] font-bold flex items-center justify-center shadow-[0_4px_12px_rgba(0,149,255,0.3)]"
          >
            {isPending ? "Postando..." : "Postar"}
          </Buttons>
        </div>
      </div>
    </form>
  );
};
