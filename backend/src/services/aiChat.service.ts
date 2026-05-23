import { Env } from "../config/env.config";
import AIChatModel from "../models/aiChat.model";
import AIChatMessageModel from "../models/aiChatMessage.model";

let genAI: any = null;

try {
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  genAI = new GoogleGenerativeAI(Env.GOOGLE_GEMINI_API_KEY);
} catch (error) {
  console.warn(
    "Google Generative AI not initialized - install @google/generative-ai",
  );
}

export const createAIChatService = async (userId: string, title?: string) => {
  const chat = new AIChatModel({
    userId,
    title: title || "New Chat",
  });
  await chat.save();
  return chat;
};

export const getUserAIChatsService = async (userId: string) => {
  const chats = await AIChatModel.find({ userId }).sort({ createdAt: -1 });
  return chats;
};

export const getSingleAIChatService = async (
  chatId: string,
  userId: string,
) => {
  const chat = await AIChatModel.findOne({ _id: chatId, userId });
  if (!chat) {
    throw new Error("Chat not found");
  }

  const messages = await AIChatMessageModel.find({ aiChatId: chatId }).sort({
    createdAt: 1,
  });

  return { chat, messages };
};

export const sendAIMessageService = async (
  aiChatId: string,
  userId: string,
  userMessage: string,
) => {
  // Verify chat belongs to user
  const chat = await AIChatModel.findOne({ _id: aiChatId, userId });
  if (!chat) {
    throw new Error("Chat not found");
  }

  // Save user message
  const userMsg = new AIChatMessageModel({
    aiChatId,
    role: "user",
    content: userMessage,
  });
  await userMsg.save();

  // Get conversation history
  const history = await AIChatMessageModel.find({ aiChatId }).sort({
    createdAt: 1,
  });

  // Generate AI response using Gemini
  let aiResponse = "";
  try {
    if (!genAI) {
      throw new Error("Google Generative AI not initialized");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Format conversation history for the model
    const conversationHistory = history.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // Start chat session
    const chat = model.startChat({
      history: conversationHistory.slice(0, -1), // Exclude the last user message we just added
    });

    // Send the latest user message
    const result = await chat.sendMessage(userMessage);
    aiResponse = result.response.text();
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    aiResponse =
      "I apologize, but I encountered an error processing your message. Please try again.";
  }

  // Save AI response
  const aiMsg = new AIChatMessageModel({
    aiChatId,
    role: "ai",
    content: aiResponse,
  });
  await aiMsg.save();

  // Update chat title if it's the first message
  if (history.length === 1) {
    const shortTitle =
      userMessage.substring(0, 30) + (userMessage.length > 30 ? "..." : "");
    chat.title = shortTitle;
    await chat.save();
  }

  return {
    userMessage: userMsg,
    aiMessage: aiMsg,
  };
};

export const deleteAIChatService = async (chatId: string, userId: string) => {
  const chat = await AIChatModel.findOneAndDelete({ _id: chatId, userId });
  if (!chat) {
    throw new Error("Chat not found");
  }

  // Also delete all messages in this chat
  await AIChatMessageModel.deleteMany({ aiChatId: chatId });

  return chat;
};
