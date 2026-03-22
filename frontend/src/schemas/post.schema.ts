import { z } from "zod";

export const PostSchema = z.object({
  authorName: z.string().min(1, "Nome é obrigatório"),
  userName: z.string().startsWith("@", "Username deve começar com @"),
  date: z.string(),
  title: z.string().min(1, "O título é obrigatório"),
  content: z.string(),
  // Imagem opcional
  imageUrl: z.url("URL de imagem inválida").optional(),
});

export type PostData = z.infer<typeof PostSchema>;
