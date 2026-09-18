import { cn } from "@/lib/utils";
import type { ChatExchange } from "@/components/chatbot/use-chatbot";

export function ChatbotMessage({ message }: { message: ChatExchange }) {
  const isUser = message.role === "user";
  const isFallback = message.role === "system-fallback";

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-lg px-3 py-2 text-sm",
          isUser && "bg-gradient-to-r from-brand-purple to-brand-blue text-white",
          !isUser && !isFallback && "border border-white/10 bg-white/[0.06] text-slate-100",
          isFallback && "border border-brand-accent/30 bg-brand-accent/10 text-orange-100",
        )}
        role={isFallback ? "status" : undefined}
      >
        {message.text}
      </div>
    </div>
  );
}
