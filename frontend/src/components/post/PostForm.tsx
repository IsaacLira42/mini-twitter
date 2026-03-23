import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image, X } from "lucide-react";
import { Buttons } from "../ui/Buttons";
import postsService from "../../api/posts.service";
import {
  postFormSchema,
  type PostFormData,
  type Post,
} from "../../schemas/post.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUserStore from "../../store/useUserStore";
import { useToast } from "../ui/Toast";
import { useNavigate } from "react-router-dom";

export const PostForm = ({ onCreate }: { onCreate?: (post: Post) => void }) => {
  const queryClient = useQueryClient();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  const { push } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    setValue,
    setError,
    clearErrors,
  } = useForm<PostFormData>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
      content: "",
      image: undefined,
    },
    mode: "onChange",
  });

  const { mutate, isPending } = useMutation<Post, unknown, PostFormData>({
    mutationKey: ["posts", "create"],
    mutationFn: (payload: PostFormData) => postsService.createPost(payload),
    onSuccess: (data: Post) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      if (onCreate) onCreate(data);
      reset();
      setImagePreview(null);
    },
    onError: () => {
      push({ message: "Erro ao criar post", type: "error" });
    },
  });

  const onSubmit = (data: PostFormData) => {
    if (!isAuthenticated) {
      push({ message: "Faça login para criar um post", type: "info" });
      navigate("/auth");
      return;
    }

    mutate(data);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validação de tamanho (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("image", {
        type: "manual",
        message: "A imagem deve ter no máximo 5MB",
      });
      return;
    }

    clearErrors("image");

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setValue("image", base64String, { shouldValidate: true });
      setImagePreview(base64String);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setValue("image", undefined, { shouldValidate: true });
    setImagePreview(null);
    clearErrors("image");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-full bg-white border border-gray-100 rounded-xl p-4 shadow-[4px_4px_10px_rgba(0,0,0,0.08)] font-sans flex flex-col justify-between transition-all duration-300"
    >
      <div>
        {!isAuthenticated && (
          <div className="mb-3 text-sm text-text-body-light dark:text-text-body-dark">
            Faça login para publicar.{" "}
            <button
              type="button"
              className="text-button underline"
              onClick={() => navigate("/auth")}
            >
              Entrar
            </button>
          </div>
        )}

        <input
          {...register("title")}
          placeholder="Título (min. 3 caracteres)"
          disabled={!isAuthenticated}
          className={`w-full text-lg text-slate-900 placeholder:text-slate-400 mb-1 outline-none border-none p-0 bg-transparent ${
            errors.title ? "text-red-600" : ""
          }`}
        />
        {errors.title && (
          <p className="text-red-500 text-xs mt-0 mb-2">
            {errors.title.message}
          </p>
        )}

        <textarea
          {...register("content")}
          placeholder="E aí, o que está rolando?"
          rows={3}
          disabled={!isAuthenticated}
          className={`w-full text-lg text-slate-900 placeholder:text-slate-400 resize-none outline-none border-none p-0 focus:ring-0 bg-transparent ${
            errors.content ? "text-red-600" : ""
          }`}
        />
        {errors.content && (
          <p className="text-red-500 text-xs mt-0 mb-2">
            {errors.content.message}
          </p>
        )}

        {imagePreview && (
          <div className="relative mt-2 mb-2">
            <img
              src={imagePreview}
              alt="Preview"
              className="max-h-40 rounded-lg object-cover"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-1 right-1 bg-black/50 rounded-full p-1 hover:bg-black/70 transition-colors"
            >
              <X size={16} className="text-white" />
            </button>
          </div>
        )}

        {errors.image && (
          <p className="text-red-500 text-xs mt-0 mb-2">
            {errors.image.message}
          </p>
        )}
      </div>

      <div className="mt-2">
        <hr className="border-gray-100 mb-2" />

        <div className="flex items-center justify-between">
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
              disabled={isSubmitting || isPending || !isAuthenticated}
            />
            <label
              htmlFor="image-upload"
              className={`text-button hover:bg-button/10 p-2 rounded-full transition-colors inline-flex items-center justify-center ${
                !isAuthenticated
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              aria-label="Anexar imagem"
            >
              <Image size={24} strokeWidth={1.5} />
            </label>
          </div>

          <Buttons
            type="submit"
            disabled={!isValid || isSubmitting || isPending || !isAuthenticated}
            className="h-8 px-6 text-[14px] font-bold flex items-center justify-center shadow-[0_4px_12px_rgba(0,149,255,0.3)]"
          >
            {isSubmitting || isPending ? "Postando..." : "Postar"}
          </Buttons>
        </div>
      </div>
    </form>
  );
};
