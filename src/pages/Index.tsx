import { useState, useRef, useEffect, useCallback } from "react";
import { Leaf, RotateCcw } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import WelcomeScreen from "@/components/WelcomeScreen";
import { generateResponse } from "@/data/remedies";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, 50);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const handleSend = useCallback((text: string) => {
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const response = generateResponse(text);
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: response };
      setIsTyping(false);
      setMessages((prev) => [...prev, aiMsg]);
    }, 800 + Math.random() * 700);
  }, []);

  const handleReset = () => {
    setMessages([]);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-screen max-w-lg mx-auto" style={{ background: "var(--gradient-chat-bg)" }}>
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 border-b border-border bg-background/70 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-soft">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-display font-semibold text-foreground text-base leading-tight">Naturopathy AI</h2>
            <p className="text-xs text-muted-foreground">Natural wellness assistant</p>
          </div>
        </div>
        {messages.length > 0 && (
          <button
            onClick={handleReset}
            className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:bg-card hover:text-foreground transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </header>

      {/* Chat area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-hide">
        {messages.length === 0 ? (
          <WelcomeScreen onSelectQuestion={handleSend} />
        ) : (
          <div className="flex flex-col gap-4 p-4">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} content={msg.content} role={msg.role} />
            ))}
            {isTyping && <ChatMessage content="" role="assistant" isTyping />}
          </div>
        )}
      </div>

      {/* Input */}
      <ChatInput onSend={handleSend} disabled={isTyping} />
    </div>
  );
};

export default Index;
