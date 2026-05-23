/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import type {
  AIChatType,
  AIChatMessageType,
  CreateAIChatType,
  SendAIChatMessageType,
} from "@/types/aiChat.type";
import { aiChatAPI } from "@/lib/aiChat.api";
import { toast } from "sonner";
import { generateUUID } from "@/lib/helper";

interface AIChatState {
  aiChats: AIChatType[];
  singleAIChat: {
    chat: AIChatType;
    messages: AIChatMessageType[];
  } | null;

  isAIChatsLoading: boolean;
  isSingleAIChatLoading: boolean;
  isAISendingMsg: boolean;

  fetchAIChats: () => Promise<void>;
  createAIChat: (payload: CreateAIChatType) => Promise<AIChatType | null>;
  fetchSingleAIChat: (chatId: string) => Promise<void>;
  sendAIMessage: (payload: SendAIChatMessageType) => Promise<void>;
  deleteAIChat: (chatId: string) => Promise<void>;

  addNewAIChat: (newChat: AIChatType) => void;
  addNewAIMessage: (messages: AIChatMessageType[]) => void;
  clearSingleAIChat: () => void;
}

export const useAIChat = create<AIChatState>()((set, get) => ({
  aiChats: [],
  singleAIChat: null,

  isAIChatsLoading: false,
  isSingleAIChatLoading: false,
  isAISendingMsg: false,

  fetchAIChats: async () => {
    set({ isAIChatsLoading: true });
    try {
      const chats = await aiChatAPI.getUserChats();
      set({ aiChats: chats });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch AI chats");
    } finally {
      set({ isAIChatsLoading: false });
    }
  },

  createAIChat: async (payload: CreateAIChatType) => {
    set({ isAIChatsLoading: true });
    try {
      const chat = await aiChatAPI.createChat(payload);
      get().addNewAIChat(chat);
      toast.success("AI chat created successfully");
      return chat;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to create AI chat");
      return null;
    } finally {
      set({ isAIChatsLoading: false });
    }
  },

  fetchSingleAIChat: async (chatId: string) => {
    set({ isSingleAIChatLoading: true });
    try {
      const { chat, messages } = await aiChatAPI.getSingleChat(chatId);
      set({ singleAIChat: { chat, messages } });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch AI chat");
    } finally {
      set({ isSingleAIChatLoading: false });
    }
  },

  sendAIMessage: async (payload: SendAIChatMessageType) => {
    set({ isAISendingMsg: true });
    const { aiChatId, content } = payload;

    if (!aiChatId || !content) return;

    const tempUserMsgId = generateUUID();

    // Optimistically add user message
    const tempUserMessage: AIChatMessageType = {
      _id: tempUserMsgId,
      aiChatId,
      role: "user",
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set((state) => {
      if (state.singleAIChat?.chat._id !== aiChatId) return state;
      return {
        singleAIChat: {
          ...state.singleAIChat,
          messages: [...state.singleAIChat.messages, tempUserMessage],
        },
      };
    });

    try {
      const { userMessage, aiMessage } = await aiChatAPI.sendMessage(payload);

      // Replace temp user message and add AI message
      set((state) => {
        if (!state.singleAIChat) return state;
        return {
          singleAIChat: {
            ...state.singleAIChat,
            messages: state.singleAIChat.messages
              .map((msg) => (msg._id === tempUserMsgId ? userMessage : msg))
              .concat(aiMessage),
          },
        };
      });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to send message");

      // Remove temp message on error
      set((state) => {
        if (!state.singleAIChat) return state;
        return {
          singleAIChat: {
            ...state.singleAIChat,
            messages: state.singleAIChat.messages.filter(
              (msg) => msg._id !== tempUserMsgId,
            ),
          },
        };
      });
    } finally {
      set({ isAISendingMsg: false });
    }
  },

  deleteAIChat: async (chatId: string) => {
    try {
      await aiChatAPI.deleteChat(chatId);
      set((state) => ({
        aiChats: state.aiChats.filter((chat) => chat._id !== chatId),
      }));
      get().clearSingleAIChat();
      toast.success("AI chat deleted successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete AI chat");
    }
  },

  addNewAIChat: (newChat: AIChatType) => {
    set((state) => {
      const existingChatIndex = state.aiChats.findIndex(
        (c) => c._id === newChat._id,
      );
      if (existingChatIndex !== -1) {
        return {
          aiChats: [
            newChat,
            ...state.aiChats.filter((c) => c._id !== newChat._id),
          ],
        };
      } else {
        return {
          aiChats: [newChat, ...state.aiChats],
        };
      }
    });
  },

  addNewAIMessage: (messages: AIChatMessageType[]) => {
    set((state) => {
      if (!state.singleAIChat) return state;
      return {
        singleAIChat: {
          ...state.singleAIChat,
          messages: [...state.singleAIChat.messages, ...messages],
        },
      };
    });
  },

  clearSingleAIChat: () => {
    set({ singleAIChat: null });
  },
}));
