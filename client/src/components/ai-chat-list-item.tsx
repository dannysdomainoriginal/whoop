import { Link } from "react-router-dom";
import type { AIChatType } from "@/types/aiChat.type";
import { Bot, Trash2 } from "lucide-react";
import { useAIChat } from "@/hooks/use-ai-chat";

interface AIChatListItemProps {
  chat: AIChatType;
  isActive?: boolean;
}

export function AIChatListItem({ chat, isActive }: AIChatListItemProps) {
  const { deleteAIChat } = useAIChat();

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this chat?")) {
      deleteAIChat(chat._id);
    }
  };

  return (
    <Link
      to={`/ai-chat/${chat._id}`}
      className={`p-3 rounded-lg flex items-center justify-between gap-2 transition-colors ${
        isActive
          ? "bg-blue-500 text-white"
          : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
      }`}
    >
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <Bot size={18} className="flex-shrink-0" />
        <span className="truncate text-sm font-medium">{chat.title}</span>
      </div>
      <button
        onClick={handleDelete}
        className={`flex-shrink-0 p-1 rounded hover:bg-opacity-20 ${
          isActive
            ? "hover:bg-white"
            : "hover:bg-gray-300 dark:hover:bg-gray-600"
        }`}
      >
        <Trash2 size={14} />
      </button>
    </Link>
  );
}
