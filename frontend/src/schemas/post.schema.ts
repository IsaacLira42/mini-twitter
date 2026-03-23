import { z } from "zod";

export const postFormSchema = z.object({
  title: z
    .string()
    .min(3, "O título deve ter pelo menos 3 caracteres")
    .max(100, "O título é muito longo"),
  content: z
    .string()
    .min(1, "O conteúdo não pode estar vazio")
    .max(5000, "O conteúdo excedeu o limite de caracteres"),
  image: z
    .string()
    .optional()
    .refine(
      (img) => !img || img.length <= 5 * 1024 * 1024,
      "A imagem deve ter no máximo 5MB",
    ),
});

export const postResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  image: z.string().nullable(),
  authorId: z.number(),
  authorName: z.string(), // Retornado pelo JOIN no PostService.getAll
  likesCount: z.number(), // Retornado pela subquery no PostService.getAll
  createdAt: z.string(), // Formato ISO/SQLite string
});

// 3. Schema para Resposta Paginada (GET /posts)
export const paginatedPostsSchema = z.object({
  posts: z.array(postResponseSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
});

// 4. Schema para parâmetros de query (Busca e Paginação)
export const postQuerySchema = z.object({
  page: z.string().optional().default("1"),
  search: z.string().optional(),
});

export type PostFormData = z.infer<typeof postFormSchema>;
export type PaginatedPosts = z.infer<typeof paginatedPostsSchema>;
export type Post = z.infer<typeof postResponseSchema>;
