import { Link } from "react-router-dom";
import { MessageCircle, BookOpen, Bell, MapPin, Leaf, Heart, Sun, Moon as MoonIcon, Clock } from "lucide-react";
import { useReminders } from "@/hooks/useReminders";

const healthTips = [
  "Drink warm lemon water every morning to boost metabolism.",
  "Practice deep breathing for 5 minutes to reduce stress.",
  "Include turmeric in your diet for natural anti-inflammatory benefits.",
  "Walk barefoot on grass for 10 minutes — it improves sleep quality.",
  "Eat seasonal fruits to maintain optimal nutrition.",
  "Maintain a regular sleep schedule for better immunity.",
];

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
}

const DashboardPage = () => {
  const { reminders } = useReminders();
  const todayReminders = reminders.filter((r) => r.active);
  const tip = healthTips[new Date().getDate() % healthTips.length];

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 pb-24 md:pb-8 space-y-6">
      {/* Greeting */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Leaf className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">{getGreeting()} 🌿</h1>
          <p className="text-sm text-muted-foreground">Your natural wellness dashboard</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { to: "/chat", icon: MessageCircle, label: "Ask AI", color: "bg-primary/10 text-primary" },
          { to: "/remedies", icon: BookOpen, label: "Remedies", color: "bg-accent/10 text-accent" },
          { to: "/reminders", icon: Bell, label: "Reminders", color: "bg-secondary text-secondary-foreground" },
          { to: "/doctors", icon: MapPin, label: "Doctors", color: "bg-nature-sage/30 text-foreground" },
        ].map((a) => (
          <Link
            key={a.to}
            to={a.to}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card border border-border shadow-soft hover:shadow-card transition-all active:scale-95"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${a.color}`}>
              <a.icon className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-foreground">{a.label}</span>
          </Link>
        ))}
      </div>

      {/* Health Tip */}
      <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20">
        <div className="flex items-center gap-2 mb-2">
          <Heart className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">Daily Health Tip</span>
        </div>
        <p className="text-sm text-foreground">{tip}</p>
      </div>

      {/* Today's Reminders */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-semibold text-foreground">Today's Schedule</h2>
          <Link to="/reminders" className="text-xs text-primary font-medium hover:underline">View all</Link>
        </div>
        {todayReminders.length === 0 ? (
          <div className="p-6 rounded-2xl bg-card border border-border text-center">
            <Bell className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-40" />
            <p className="text-sm text-muted-foreground">No reminders set</p>
            <Link to="/reminders" className="text-xs text-primary font-medium mt-1 inline-block hover:underline">
              Add your first reminder
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
        <h2 className="font-display font-semibold text-foreground mb-3">Quick Ask</h2>
        <div className="flex flex-wrap gap-2">
          {["Headache relief", "Better sleep", "Boost immunity", "Reduce stress"].map((q) => (
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
