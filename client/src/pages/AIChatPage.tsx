import { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useAIChat } from "@/hooks/use-ai-chat";
import { AIChatHeader } from "@/components/ai-chat-header";
import { AIChatBody } from "@/components/ai-chat-body";
import { AIChatFooter } from "@/components/ai-chat-footer";

export function AIChatPage() {
  const { id } = useParams<{ id: string }>();
  const { fetchSingleAIChat, singleAIChat } = useAIChat();

  useEffect(() => {
    if (id && id !== "new") {
      fetchSingleAIChat(id);
    }
  }, [id, fetchSingleAIChat]);

  if (!id) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-950">
      <AIChatHeader chatId={id} />
      <AIChatBody chatId={id} />
      {singleAIChat && <AIChatFooter chatId={id} />}
    </div>
  );
}
