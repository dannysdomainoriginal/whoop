import mongoose, { Document, Schema } from "mongoose";

export interface AIChatDocument extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

const aiChatSchema = new Schema<AIChatDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      default: "New Chat",
    },
  },
  {
    timestamps: true,
  },
);

const AIChatModel = mongoose.model<AIChatDocument>("AIChat", aiChatSchema);

export default AIChatModel;
