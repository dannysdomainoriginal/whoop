import AppWrapper from "@/components/app-wrapper";
import ChatList from "@/components/chat/chat-list";
import { AIChatList } from "@/components/ai-chat-list";
import useChatId from "@/hooks/use-chat-id";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  const chatId = useChatId();
  const location = useLocation();
  const isAIChatPath = location.pathname.includes("/ai-chat/");

  return (
    <AppWrapper>
      <div className="h-full">
        {/* ChatList - show for regular chats */}
        {!isAIChatPath && (
          <div className={cn(chatId ? "hidden lg:block" : "block")}>
            <ChatList />
          </div>
        )}

        {/* AI Chat List - show for AI chats */}
        {isAIChatPath && (
          <div className="hidden lg:block fixed inset-y-0 pb-20 lg:pb-0 lg:max-w-[379px] lg:block border-r border-border bg-sidebar max-w-[calc(100%-40px)] w-full left-10 z-[98]">
            <div className="flex-col h-full">
              <div className="border-b border-border px-4 py-3">
                <h2 className="font-semibold text-gray-900 dark:text-white">
                  AI Chats
                </h2>
              </div>
              <div className="flex-1 overflow-y-auto">
                <AIChatList />
              </div>
            </div>
          </div>
        )}

        <div
          className={cn(
            "lg:!pl-95 pl-7",
            !chatId && !isAIChatPath ? "hidden lg:block" : "block",
          )}
        >
          <Outlet />
        </div>
      </div>
    </AppWrapper>
  );
};

export default AppLayout;
