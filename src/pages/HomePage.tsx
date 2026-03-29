import { Link } from "react-router-dom";
import { MessageCircle, BookOpen, Leaf, Sparkles, Heart, Shield } from "lucide-react";
import { suggestedQuestions } from "@/data/remedies";
import MandalaDecor from "@/components/MandalaDecor";

const features = [
  { icon: Sparkles, title: "AI-Powered", desc: "Smart symptom matching with 50+ Ayurvedic conditions", emoji: "✨" },
  { icon: Heart, title: "Holistic Care", desc: "Herbal remedies, diet plans & Yoga guidance", emoji: "🙏" },
  { icon: Shield, title: "Works Offline", desc: "Full Ayurvedic knowledge base available anytime", emoji: "🌿" },
];

const HomePage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Decorative mandalas */}
      <div className="absolute top-8 left-4 text-saffron pointer-events-none">
        <MandalaDecor size={180} className="animate-spin-slow" />
      </div>
      <div className="absolute top-40 right-0 text-primary pointer-events-none">
        <MandalaDecor size={240} className="animate-spin-slow" />
      </div>
      <div className="absolute bottom-20 left-8 text-turmeric pointer-events-none">
        <MandalaDecor size={100} />
      </div>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 pt-16 pb-8 relative z-10">
        <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mb-6 animate-fade-up animate-float">
          <span className="text-5xl">🌿</span>
        </div>
        <div className="animate-fade-up">
          <p className="text-sm text-accent font-medium tracking-widest uppercase mb-2">आयुर्वेद · Ayurveda</p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-3 leading-tight">
            Naturopathy AI<br />
            <span className="text-primary">Assistant</span>
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto mb-8 text-sm md:text-base leading-relaxed">
            Your natural wellness companion rooted in ancient Indian Ayurvedic wisdom.
            Get personalized herbal remedies, diet suggestions & holistic health guidance.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 justify-center animate-fade-up">
          <Link
            to="/chat"
            className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-medium shadow-soft hover:shadow-elevated transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            Start Consultation
          </Link>
          <Link
            to="/remedies"
            className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-card border border-border text-foreground font-medium shadow-soft hover:bg-muted transition-all active:scale-95"
          >
            <BookOpen className="w-4 h-4" />
            Browse Remedies
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-10 relative z-10">
        <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          {features.map((f) => (
            <div key={f.title} className="flex flex-col items-center text-center p-5 rounded-2xl bg-card border border-border shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-200">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <span className="text-2xl">{f.emoji}</span>
              </div>
              <h3 className="font-display font-semibold text-foreground mb-1">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Ask */}
      <section className="px-6 pb-28 md:pb-12 relative z-10">
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
