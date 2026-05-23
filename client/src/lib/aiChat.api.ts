import { API } from "./axios-client";
import type {
  AIChatType,
  AIChatMessageType,
  CreateAIChatType,
  SendAIChatMessageType,
} from "../types/aiChat.type";

export const aiChatAPI = {
  // Create a new AI chat
  createChat: async (data: CreateAIChatType) => {
    const response = await API.post<{
      message: string;
      chat: AIChatType;
    }>("/ai-chat", data);
    return response.data.chat;
  },

  // Get all AI chats for the user
  getUserChats: async () => {
    const response = await API.get<{
      message: string;
      chats: AIChatType[];
    }>("/ai-chat");
    return response.data.chats;
  },

  // Get a specific AI chat with messages
  getSingleChat: async (chatId: string) => {
    const response = await API.get<{
      message: string;
      chat: AIChatType;
      messages: AIChatMessageType[];
    }>(`/ai-chat/${chatId}`);
    return response.data;
  },

  // Send a message to AI chat
  sendMessage: async (data: SendAIChatMessageType) => {
    const response = await API.post<{
      message: string;
      userMessage: AIChatMessageType;
      aiMessage: AIChatMessageType;
    }>(`/ai-chat/${data.aiChatId}/message`, { content: data.content });
    return response.data;
  },

  // Delete an AI chat
  deleteChat: async (chatId: string) => {
    const response = await API.delete<{
      message: string;
    }>(`/ai-chat/${chatId}`);
    return response.data;
  },
};
