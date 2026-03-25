import heroBotanical from "@/assets/hero-botanical.png";
import { suggestedQuestions } from "@/data/remedies";

interface WelcomeScreenProps {
  onSelectQuestion: (q: string) => void;
}

const WelcomeScreen = ({ onSelectQuestion }: WelcomeScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-6 py-8 animate-fade-up">
      <img
        src={heroBotanical}
        alt="Botanical herbs mandala"
        width={180}
        height={180}
        className="mb-6 opacity-90"
      />
      <h1 className="font-display text-2xl font-bold text-foreground text-center mb-2">
        Naturopathy AI
      </h1>
      <p className="text-muted-foreground text-center text-sm max-w-xs mb-8">
        Your natural wellness companion. Ask me about herbal remedies, lifestyle tips, and holistic health.
      </p>
      <div className="w-full max-w-sm space-y-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 text-center">
          Try asking about
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              onClick={() => onSelectQuestion(q)}
              className="px-4 py-2 rounded-full bg-card border border-border text-sm text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all shadow-soft active:scale-95"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
