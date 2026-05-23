import { Router } from "express";
import authRoutes from "./auth.route";
import chatRoutes from "./chat.route";
import userRoutes from "./user.route";
import aiChatRoutes from "./aiChat.route";

const router = Router();
router.use("/auth", authRoutes);
router.use("/chat", chatRoutes);
router.use("/ai-chat", aiChatRoutes);
router.use("/user", userRoutes);

export default router;
