import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "../config/http.config";
import {
  createAIChatSchema,
  sendAIMessageSchema,
  aiChatIdSchema,
} from "../validators/aiChat.validator";
import {
  createAIChatService,
  getUserAIChatsService,
  getSingleAIChatService,
  sendAIMessageService,
  deleteAIChatService,
} from "../services/aiChat.service";

export const createAIChatController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const body = createAIChatSchema.parse(req.body);

    const chat = await createAIChatService(userId, body.title);

    return res.status(HTTPSTATUS.CREATED).json({
      message: "AI chat created successfully",
      chat,
    });
  },
);

export const getUserAIChatsController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const chats = await getUserAIChatsService(userId);

    return res.status(HTTPSTATUS.OK).json({
      message: "User AI chats retrieved successfully",
      chats,
    });
  },
);

export const getSingleAIChatController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const { id } = aiChatIdSchema.parse(req.params);

    const { chat, messages } = await getSingleAIChatService(id, userId);

    return res.status(HTTPSTATUS.OK).json({
      message: "AI chat and messages retrieved successfully",
      chat,
      messages,
    });
  },
);

export const sendAIMessageController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const body = sendAIMessageSchema.parse(req.body);

    const { userMessage, aiMessage } = await sendAIMessageService(
      body.aiChatId,
      userId,
      body.content,
    );

    return res.status(HTTPSTATUS.OK).json({
      message: "Message sent successfully",
      userMessage,
      aiMessage,
    });
  },
);

export const deleteAIChatController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const { id } = aiChatIdSchema.parse(req.params);

    await deleteAIChatService(id, userId);

    return res.status(HTTPSTATUS.OK).json({
      message: "AI chat deleted successfully",
    });
  },
);
