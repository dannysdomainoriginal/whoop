import { useEffect, useRef } from "react";
import { useAIChat } from "@/hooks/use-ai-chat";
import { AIChatMessage } from "./ai-chat-message";
import { Loader } from "lucide-react";

interface AIChatBodyProps {
  chatId: string;
}

export function AIChatBody({  }: AIChatBodyProps) {
  const { singleAIChat, isSingleAIChatLoading } = useAIChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [singleAIChat?.messages]);

  if (isSingleAIChatLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader className="animate-spin text-blue-500" size={32} />
      </div>
    );
  }

  if (!singleAIChat) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <p>No messages yet. Start a conversation!</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 flex flex-col">
      <div className="flex-1">
        {singleAIChat.messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Start chatting with the AI</p>
          </div>
        ) : (
          singleAIChat.messages.map((message) => (
            <AIChatMessage key={message._id} message={message} />
          ))
        )}
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
}
