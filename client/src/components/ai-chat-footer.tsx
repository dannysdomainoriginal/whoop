import { useState } from "react";
import { useAIChat } from "@/hooks/use-ai-chat";
import { Button } from "./ui/button";
import { Send, Loader } from "lucide-react";

interface AIChatFooterProps {
  chatId: string;
}

export function AIChatFooter({ chatId }: AIChatFooterProps) {
  const [input, setInput] = useState("");
  const { sendAIMessage, isAISendingMsg } = useAIChat();

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    await sendAIMessage({
      aiChatId: chatId,
      content: input,
    });

    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-950">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isAISendingMsg}
        />
        <Button
          onClick={handleSendMessage}
          disabled={isAISendingMsg || !input.trim()}
          size="sm"
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          {isAISendingMsg ? (
            <Loader size={18} className="animate-spin" />
          ) : (
            <Send size={18} />
          )}
        </Button>
      </div>
    </div>
  );
}
