import { useAIChat } from "@/hooks/use-ai-chat";
import { Button } from "./ui/button";
import { Trash2, Bot } from "lucide-react";
import { useState } from "react";

interface AIChatHeaderProps {
  chatId: string;
}

export function AIChatHeader({ chatId }: AIChatHeaderProps) {
  const { singleAIChat, deleteAIChat } = useAIChat();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (isDeleting) return;
    if (confirm("Are you sure you want to delete this chat?")) {
      setIsDeleting(true);
      await deleteAIChat(chatId);
    }
  };

  if (!singleAIChat) return null;

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-950 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
          <Bot size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {singleAIChat.chat.title}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            AI Assistant
          </p>
        </div>
      </div>
      <Button
        onClick={handleDelete}
        disabled={isDeleting}
        size="sm"
        variant="destructive"
        className="flex items-center gap-2"
      >
        <Trash2 size={16} />
        Delete
      </Button>
    </div>
  );
}
