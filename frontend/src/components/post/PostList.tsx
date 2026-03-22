import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PostCard } from "./PostCard";
import { PostForm } from "./PostForm";
import postsService from "../../api/posts.service";
import type { Post, PaginatedPosts } from "../../schemas/post.schema";

export const PostList = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<PaginatedPosts>({
    queryKey: ["posts"],
    queryFn: () => postsService.getPosts(),
    staleTime: 1000 * 60,
  });

  const posts: Post[] = data?.posts ?? [];

  const handleCreate = (post: Post) => {
    queryClient.setQueryData<PaginatedPosts | undefined>(["posts"], (old) => {
      if (!old) return { posts: [post], total: 1, page: 1, limit: 10 };
      return {
        ...old,
        posts: [post, ...(old.posts || [])],
        total: old.total + 1,
      };
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <PostForm onCreate={handleCreate} />

      {isLoading ? (
        <div className="text-center p-4">Carregando...</div>
      ) : posts.length === 0 ? (
        <div className="text-center p-4">Nenhum post encontrado.</div>
      ) : (
        posts.map((post: Post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
};
