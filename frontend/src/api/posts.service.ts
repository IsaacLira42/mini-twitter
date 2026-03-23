import api from "./axios";
import type {
  Post,
  PostFormData,
  PaginatedPosts,
} from "../schemas/post.schema";

const getPosts = async (page = 1, search = ""): Promise<PaginatedPosts> => {
  const res = await api.get("/posts", { params: { page, search } });
  return res.data as PaginatedPosts;
};

const createPost = async (payload: PostFormData): Promise<Post> => {
  const res = await api.post("/posts", payload);
  return res.data as Post;
};

export default { getPosts, createPost };
