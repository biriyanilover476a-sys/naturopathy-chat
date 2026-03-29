import { Link } from "react-router-dom";
import { MessageCircle, BookOpen, Bell, MapPin, Leaf, Heart, Clock } from "lucide-react";
import { useReminders } from "@/hooks/useReminders";
import MandalaDecor from "@/components/MandalaDecor";
import { useLanguage } from "@/i18n/LanguageContext";

const healthTips = [
  "🌿 Drink warm lemon water every morning to boost metabolism and digestion.",
  "🧘 Practice Pranayama for 10 minutes daily — it calms the mind and strengthens the lungs.",
  "🍛 Include turmeric (Haldi) and holy basil (Tulsi) in your daily diet for natural immunity.",
  "🌸 Apply sandalwood paste on forehead to cool pitta dosha and relieve headaches.",
  "🥗 Eat seasonal fruits and follow the Ritucharya (seasonal regimen) for optimal health.",
  "🌙 Sleep before 10 PM — Ayurveda says late nights aggravate Vata dosha.",
];

const DashboardPage = () => {
  const { reminders } = useReminders();
  const { t } = useLanguage();
  const todayReminders = reminders.filter((r) => r.active);
  const tip = healthTips[new Date().getDate() % healthTips.length];

  const h = new Date().getHours();
  const greeting = h < 12 ? t("greeting_morning") : h < 17 ? t("greeting_afternoon") : t("greeting_evening");

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 pb-24 md:pb-8 space-y-6 relative">
      <div className="absolute top-0 right-0 text-saffron pointer-events-none">
        <MandalaDecor size={200} className="animate-spin-slow" />
      </div>
      <div className="absolute bottom-20 left-0 text-primary pointer-events-none">
        <MandalaDecor size={140} className="animate-spin-slow" />
      </div>

      {/* Greeting */}
      <div className="flex items-center gap-4 relative">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
          <span className="text-2xl">🙏</span>
        </div>
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">Namasté, {greeting}</h1>
          <p className="text-sm text-muted-foreground">{t("welcome_message")}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { to: "/chat", label: t("ask_ai"), emoji: "🤖", color: "bg-primary/10 text-primary" },
          { to: "/remedies", label: t("view_remedies"), emoji: "🌿", color: "bg-saffron-light text-accent" },
          { to: "/reminders", label: t("add_reminder"), emoji: "⏰", color: "bg-secondary text-secondary-foreground" },
          { to: "/doctors", label: t("doctors"), emoji: "🏥", color: "bg-primary/5 text-foreground" },
        ].map((a) => (
          <Link
            key={a.to}
            to={a.to}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card border border-border shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all duration-200 active:scale-95"
          >
            <div className={`w-11 h-11 rounded-full flex items-center justify-center ${a.color}`}>
              <span className="text-xl">{a.emoji}</span>
            </div>
            <span className="text-xs font-medium text-foreground">{a.label}</span>
          </Link>
        ))}
      </div>

      {/* Tri-Dosha Banner */}
      <div className="rounded-2xl border border-border overflow-hidden">
        <div className="px-4 py-3 bg-primary/5 border-b border-border">
          <h2 className="font-display font-semibold text-foreground text-sm flex items-center gap-2">
            <Leaf className="w-4 h-4 text-primary" />
            {t("tri_dosha")}
          </h2>
        </div>
        <div className="grid grid-cols-3 divide-x divide-border">
          {[
            { name: t("vata"), emoji: "💨", desc: t("vata_desc"), color: "bg-muted" },
            { name: t("pitta"), emoji: "🔥", desc: t("pitta_desc"), color: "bg-saffron-light" },
            { name: t("kapha"), emoji: "🌊", desc: t("kapha_desc"), color: "bg-primary/10" },
          ].map((d) => (
            <div key={d.name} className={`p-3 text-center ${d.color}`}>
              <span className="text-2xl block mb-1">{d.emoji}</span>
              <p className="font-display font-semibold text-foreground text-sm">{d.name}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Health Tip */}
      <div className="p-4 rounded-2xl ayurveda-gradient border border-primary/15 relative overflow-hidden">
        <div className="absolute top-2 right-2 text-saffron pointer-events-none">
          <MandalaDecor size={60} />
        </div>
        <div className="flex items-center gap-2 mb-2">
          <Heart className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">{t("daily_tip_title")}</span>
        </div>
        <p className="text-sm text-foreground leading-relaxed relative z-10">{tip}</p>
      </div>

      {/* Today's Reminders */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-semibold text-foreground">{t("todays_reminders")}</h2>
          <Link to="/reminders" className="text-xs text-primary font-medium hover:underline">{t("view_remedies")}</Link>
        </div>
        {todayReminders.length === 0 ? (
          <div className="p-6 rounded-2xl bg-card border border-border text-center rangoli-dots">
            <span className="text-3xl block mb-2">🕐</span>
            <p className="text-sm text-muted-foreground">{t("no_reminders_today")}</p>
            <Link to="/reminders" className="text-xs text-primary font-medium mt-1 inline-block hover:underline">
              {t("add_reminder")}
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {todayReminders.slice(0, 4).map((r) => (
              <div key={r.id} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border shadow-soft">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{r.medicineName}</p>
                  <p className="text-xs text-muted-foreground">{r.dosage} · {r.times.join(", ")}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Chat Prompts */}
      <div>
        <h2 className="font-display font-semibold text-foreground mb-3">{t("quick_ask")}</h2>
        <div className="flex flex-wrap gap-2">
          {["Headache remedy", "Improve digestion", "Boost immunity", "Better sleep", "Reduce stress"].map((q) => (
            <Link
              key={q}
              to={`/chat?q=${encodeURIComponent(q)}`}
              className="px-4 py-2 rounded-full bg-card border border-border text-xs text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all active:scale-95 shadow-soft"
            >
              {q}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
