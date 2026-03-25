import { Leaf, User } from "lucide-react";

interface ChatMessageProps {
  content: string;
  role: "user" | "assistant";
  isTyping?: boolean;
}

const ChatMessage = ({ content, role, isTyping }: ChatMessageProps) => {
  const isUser = role === "user";

  if (isTyping) {
    return (
      <div className="flex gap-3 animate-fade-up">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-soft">
          <Leaf className="w-4 h-4 text-primary-foreground" />
        </div>
        <div className="bg-card rounded-2xl rounded-tl-sm px-4 py-3 shadow-soft">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary/50" style={{ animation: "typing-dot 1.2s ease-in-out infinite" }} />
            <span className="w-2 h-2 rounded-full bg-primary/50" style={{ animation: "typing-dot 1.2s ease-in-out 0.2s infinite" }} />
            <span className="w-2 h-2 rounded-full bg-primary/50" style={{ animation: "typing-dot 1.2s ease-in-out 0.4s infinite" }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex gap-3 animate-fade-up ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-soft ${
          isUser ? "bg-accent" : "bg-primary"
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4 text-accent-foreground" />
        ) : (
          <Leaf className="w-4 h-4 text-primary-foreground" />
        )}
      </div>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-soft ${
          isUser
            ? "bg-primary text-primary-foreground rounded-tr-sm"
            : "bg-card text-card-foreground rounded-tl-sm"
        }`}
      >
        {isUser ? (
          <p className="text-sm leading-relaxed">{content}</p>
        ) : (
          <div className="text-sm leading-relaxed prose prose-sm max-w-none">
            {content.split("\n").map((line, i) => {
              if (line.startsWith("## "))
                return (
                  <h3 key={i} className="text-base font-display font-semibold mt-0 mb-2 text-foreground">
                    {line.replace(/^##\s*/, "")}
                  </h3>
                );
              if (line.startsWith("### "))
                return (
                  <h4 key={i} className="text-sm font-semibold mt-3 mb-1 text-foreground/80">
                    {line.replace(/^###\s*/, "")}
                  </h4>
                );
              if (line.startsWith("- ")) {
                const text = line.replace(/^-\s*/, "");
                return (
                  <div key={i} className="flex gap-2 my-1">
                    <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>'),
                      }}
                    />
                  </div>
                );
              }
              if (line.startsWith("> "))
                return (
                  <blockquote key={i} className="border-l-2 border-accent pl-3 my-2 text-muted-foreground text-xs italic">
                    {line.replace(/^>\s*/, "").replace(/\*\*(.*?)\*\*/g, "$1")}
                  </blockquote>
                );
              if (line.startsWith("---")) return <hr key={i} className="my-3 border-border" />;
              if (line.startsWith("*") && line.endsWith("*"))
                return (
                  <p key={i} className="text-xs text-muted-foreground mt-2 italic">
                    {line.replace(/\*/g, "")}
                  </p>
                );
              if (line.trim() === "") return null;
              return (
                <p
                  key={i}
                  className="my-1"
                  dangerouslySetInnerHTML={{
                    __html: line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
