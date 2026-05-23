import type { AIChatMessageType } from "@/types/aiChat.type";
import { formatDistanceToNow } from "date-fns";
import { Bot } from "lucide-react";

interface AIChatMessageProps {
  message: AIChatMessageType;
}

export function AIChatMessage({ message }: AIChatMessageProps) {
  const isAI = message.role === "ai";

  return (
    <div
      className={`flex gap-2 mb-4 ${isAI ? "flex-row" : "flex-row-reverse"}`}
    >
      {isAI && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
          <Bot size={18} className="text-white" />
        </div>
      )}

      <div
        className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg ${
          isAI
            ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
            : "bg-blue-500 text-white"
        }`}
      >
        <p className="text-sm break-words">{message.content}</p>
        <p
          className={`text-xs mt-1 ${isAI ? "text-gray-600 dark:text-gray-400" : "text-blue-100"}`}
        >
          {formatDistanceToNow(new Date(message.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
    </div>
  );
}
