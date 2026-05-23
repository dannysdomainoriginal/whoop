import { Router } from "express";
import { passportAuthenticateJwt } from "../config/passport.config";
import {
  createAIChatController,
  getUserAIChatsController,
  getSingleAIChatController,
  sendAIMessageController,
  deleteAIChatController,
} from "../controllers/aiChat.controller";

const router = Router()
  .use(passportAuthenticateJwt)
  .post("/", createAIChatController)
  .get("/", getUserAIChatsController)
  .get("/:id", getSingleAIChatController)
  .post("/:id/message", sendAIMessageController)
  .delete("/:id", deleteAIChatController);

export default router;
