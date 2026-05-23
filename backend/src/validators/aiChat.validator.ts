import { z } from "zod";

export const createAIChatSchema = z.object({
  title: z.string().trim().optional().default("New Chat"),
});

export const sendAIMessageSchema = z.object({
  aiChatId: z.string().trim().min(1),
  content: z.string().trim().min(1),
});

export const aiChatIdSchema = z.object({
  id: z.string().trim().min(1),
});
