import { useEffect, useState } from "react";
import { useAIChat } from "@/hooks/use-ai-chat";
import { AIChatListItem } from "./ai-chat-list-item";
import { Button } from "./ui/button";
import { Plus, Loader } from "lucide-react";
import { useParams } from "react-router-dom";

export function AIChatList() {
  const { aiChats, fetchAIChats, createAIChat, isAIChatsLoading } = useAIChat();
  const { id: activeId } = useParams();
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchAIChats();
  }, []);

  const handleNewChat = async () => {
    setIsCreating(true);
    await createAIChat({ title: "New Chat" });
    setIsCreating(false);
  };

  return (
    <div className="flex flex-col gap-3 p-4">
      <Button
        onClick={handleNewChat}
        disabled={isCreating}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2"
      >
        {isCreating ? (
          <Loader size={18} className="animate-spin" />
        ) : (
          <>
            <Plus size={18} />
            New Chat
          </>
        )}
      </Button>

      {isAIChatsLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader size={24} className="animate-spin text-blue-500" />
        </div>
      ) : aiChats.length === 0 ? (
        <p className="text-center text-gray-500 text-sm py-4">No chats yet</p>
      ) : (
        <div className="flex flex-col gap-2">
          {aiChats.map((chat) => (
            <AIChatListItem
              key={chat._id}
              chat={chat}
              isActive={chat._id === activeId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
