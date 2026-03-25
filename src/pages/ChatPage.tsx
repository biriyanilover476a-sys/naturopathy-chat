import { useRef, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { RotateCcw } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import { generateResponse, suggestedQuestions } from "@/data/remedies";
import { useChatHistory } from "@/hooks/useChatHistory";
import { useState } from "react";

const ChatPage = () => {
  const { messages, addMessage, clearHistory } = useChatHistory();
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQueryHandled = useRef(false);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, 50);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const handleSend = useCallback(
    (text: string) => {
      addMessage("user", text);
      setIsTyping(true);
      setTimeout(() => {
        const response = generateResponse(text);
        addMessage("assistant", response);
        setIsTyping(false);
      }, 600 + Math.random() * 600);
    },
    [addMessage]
  );

  // Handle ?q= query param from home page
  useEffect(() => {
    if (initialQueryHandled.current) return;
    const q = searchParams.get("q");
    if (q) {
      initialQueryHandled.current = true;
      setSearchParams({}, { replace: true });
      handleSend(q);
    }
  }, [searchParams, setSearchParams, handleSend]);

  return (
    <div className="flex flex-col h-[calc(100vh-48px)] md:h-[calc(100vh-52px)] max-w-2xl mx-auto">
      {/* Chat header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background/60 backdrop-blur-sm">
        <div>
          <h2 className="font-display font-semibold text-foreground text-sm">Chat with AI</h2>
          <p className="text-xs text-muted-foreground">{messages.length} messages</p>
        </div>
        {messages.length > 0 && (
          <button
            onClick={() => { clearHistory(); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-muted-foreground hover:bg-card hover:text-foreground transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear
          </button>
        )}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-hide">
        {messages.length === 0 && !isTyping ? (
          <div className="flex flex-col items-center justify-center h-full px-6 py-8">
            <p className="text-muted-foreground text-center text-sm mb-6">
              Ask me about any health condition and I'll suggest natural remedies.
            </p>
            <div className="flex flex-wrap gap-2 justify-center max-w-sm">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="px-3 py-1.5 rounded-full bg-card border border-border text-xs text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all active:scale-95"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 p-4">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} content={msg.content} role={msg.role} />
            ))}
            {isTyping && <ChatMessage content="" role="assistant" isTyping />}
          </div>
        )}
      </div>

      {/* Input — add bottom padding on mobile for tab bar */}
      <div className="pb-16 md:pb-0">
        <ChatInput onSend={handleSend} disabled={isTyping} />
      </div>
    </div>
  );
};

export default ChatPage;
