import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { PostCard } from "./PostCard";
import { PostForm } from "./PostForm";
import postsService from "../../api/posts.service";
import type { Post, PaginatedPosts } from "../../schemas/post.schema";
import { Pagination } from "./Pagination";

export const PostList = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState<number>(1);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";

  useEffect(() => {
    setPage(1);
  }, [search]);

  const { data, isLoading } = useQuery<
    PaginatedPosts,
    unknown,
    PaginatedPosts,
    [string, number, string]
  >({
    queryKey: ["posts", page, search],
    queryFn: () => postsService.getPosts(page, search),
    staleTime: 1000 * 60,
    placeholderData: keepPreviousData,
  });

  const posts: Post[] = data?.posts ?? [];

  const total = data?.total ?? 0;
  const limit = data?.limit ?? 10;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const handleCreate = (post: Post) => {
    if (page === 1) {
      queryClient.setQueryData<PaginatedPosts | undefined>(
        ["posts", 1],
        (old) => {
          if (!old) return { posts: [post], total: 1, page: 1, limit };
          return {
            ...old,
            posts: [post, ...(old.posts || [])],
            total: old.total + 1,
          };
        },
      );
    } else {
      setPage(1);
    }
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

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};
