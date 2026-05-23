export type AIChatType = {
  _id: string;
  userId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export type AIChatMessageType = {
  _id: string;
  aiChatId: string;
  role: "user" | "ai";
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateAIChatType = {
  title?: string;
};

export type SendAIChatMessageType = {
  aiChatId: string;
  content: string;
};
