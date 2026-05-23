import { GoogleGenAI } from "@google/genai";
import { Env } from "../config/env.config";
import AIChatModel from "../models/aiChat.model";
import AIChatMessageModel from "../models/aiChatMessage.model";

// Properly type the modern SDK client instance
let ai: GoogleGenAI | null = null;

try {
  // The modern SDK automatically picks up process.env.GEMINI_API_KEY.
  // Since you are using a custom Env config object, we explicitly pass it here.
  if (Env.GOOGLE_GEMINI_API_KEY) {
    ai = new GoogleGenAI({ apiKey: Env.GOOGLE_GEMINI_API_KEY });
  } else {
    console.warn(
      "GOOGLE_GEMINI_API_KEY is missing from environment configuration.",
    );
  }
} catch (error) {
  console.error("Failed to initialize Google GenAI SDK:", error);
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

  // Get conversation history (including the message we just saved)
  const history = await AIChatMessageModel.find({ aiChatId }).sort({
    createdAt: 1,
  });

  // Generate AI response using modern Gemini SDK
  let aiResponse = "";
  try {
    if (!ai) {
      throw new Error("Google GenAI not initialized or API key missing");
    }

    // Format conversation history correctly for the new SDK ('user' or 'model')
    const conversationHistory = history.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // In the modern SDK, chats are managed under ai.chats.create()
    // We slice out the last message because we pass it directly to sendMessage() below
    const chatSession = ai.chats.create({
      model: "gemini-2.5-flash",
      history: conversationHistory.slice(0, -1),
      config: {
        systemInstruction:
          "You are a concise assistant. Provide accurate plain text answers. Say 'I don't know' if unsure. STRICT LIMITS: Absolute maximum 250 characters per response. NEVER use any markdown (no asterisks, hash marks, or code blocks). Output 100% plain text only. If possible add line breaks for clarity",
      },
    });

    // Send the latest user message
    const result = await chatSession.sendMessage({ message: userMessage });

    // Fallback gracefully if response text isn't returned cleanly
    aiResponse = result.text || "";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    aiResponse =
      "I apologize, but I encountered an error processing your message. Please try again.";
  }

  // Save AI response (Preserving your exact 'ai' schema role value)
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
