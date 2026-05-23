import mongoose, { Document, Schema } from "mongoose";

export interface AIChatMessageDocument extends Document {
  aiChatId: mongoose.Types.ObjectId;
  role: "user" | "ai";
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const aiChatMessageSchema = new Schema<AIChatMessageDocument>(
  {
    aiChatId: {
      type: Schema.Types.ObjectId,
      ref: "AIChat",
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "ai"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const AIChatMessageModel = mongoose.model<AIChatMessageDocument>(
  "AIChatMessage",
  aiChatMessageSchema,
);

export default AIChatMessageModel;
