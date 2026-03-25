import { Link } from "react-router-dom";
import { MessageCircle, BookOpen, Leaf, Sparkles, Heart, Shield } from "lucide-react";
import heroBotanical from "@/assets/hero-botanical.png";
import { suggestedQuestions } from "@/data/remedies";

const features = [
  { icon: Sparkles, title: "AI-Powered", desc: "Smart symptom matching with 50+ conditions" },
  { icon: Heart, title: "Holistic Care", desc: "Remedies, diet, and lifestyle guidance" },
  { icon: Shield, title: "Works Offline", desc: "Full knowledge base available anytime" },
];

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 pt-12 pb-8">
        <img
          src={heroBotanical}
          alt="Botanical herbs mandala"
          width={160}
          height={160}
          className="mb-6 opacity-90 animate-fade-up"
        />
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3 animate-fade-up">
          Naturopathy AI Assistant
        </h1>
        <p className="text-muted-foreground max-w-md mb-8 animate-fade-up">
          Your natural wellness companion. Get personalized herbal remedies, diet suggestions, and holistic health guidance — all powered by AI.
        </p>
        <div className="flex flex-wrap gap-3 justify-center animate-fade-up">
          <Link
            to="/chat"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-soft hover:shadow-elevated transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            Start Chat
          </Link>
          <Link
            to="/remedies"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-card border border-border text-foreground font-medium shadow-soft hover:bg-muted transition-all active:scale-95"
          >
            <BookOpen className="w-4 h-4" />
            Browse Remedies
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-10">
        <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          {features.map((f) => (
            <div key={f.title} className="flex flex-col items-center text-center p-5 rounded-2xl bg-card border border-border shadow-card">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-1">{f.title}</h3>
              <p className="text-xs text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Ask */}
      <section className="px-6 pb-28 md:pb-12">
        <div className="max-w-lg mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="w-4 h-4 text-primary" />
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Popular topics</p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {suggestedQuestions.map((q) => (
              <Link
                key={q}
                to={`/chat?q=${encodeURIComponent(q)}`}
                className="px-4 py-2 rounded-full bg-card border border-border text-sm text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all shadow-soft active:scale-95"
              >
                {q}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
