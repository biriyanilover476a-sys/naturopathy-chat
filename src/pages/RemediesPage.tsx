import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, MessageCircle, ChevronDown, ChevronUp } from "lucide-react";
import { remediesDatabase, categories, type Remedy } from "@/data/remedies";

const RemediesPage = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let results = remediesDatabase;
    if (selectedCategory) results = results.filter((r) => r.category === selectedCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(
        (r) =>
          r.condition.toLowerCase().includes(q) ||
          r.keywords.some((k) => k.includes(q)) ||
          r.symptoms.some((s) => s.toLowerCase().includes(q))
      );
    }
    return results;
  }, [search, selectedCategory]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 pb-24 md:pb-8">
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">Remedies Library</h1>
      <p className="text-sm text-muted-foreground mb-6">{remediesDatabase.length} conditions covered</p>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search conditions, symptoms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-card border border-border rounded-full pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all shadow-soft"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide mb-4">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            !selectedCategory ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground hover:bg-muted"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              selectedCategory === cat ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground hover:bg-muted"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">No conditions found. Try a different search term.</p>
      ) : (
        <div className="space-y-3">
          {filtered.map((remedy) => (
            <RemedyCard
              key={remedy.id}
              remedy={remedy}
              expanded={expandedId === remedy.id}
              onToggle={() => setExpandedId(expandedId === remedy.id ? null : remedy.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

function RemedyCard({ remedy, expanded, onToggle }: { remedy: Remedy; expanded: boolean; onToggle: () => void }) {
  return (
    <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden transition-all">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{remedy.icon}</span>
          <div>
            <h3 className="font-display font-semibold text-foreground text-sm">{remedy.condition}</h3>
            <p className="text-xs text-muted-foreground">{remedy.category}</p>
          </div>
        </div>
        {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-4 animate-fade-up">
          <Section title="Symptoms" items={remedy.symptoms} />
          <Section title="Common Causes" items={remedy.causes} />
          <Section title="Natural Remedies" items={remedy.remedies} html />
          <Section title="Diet Suggestions" items={remedy.diet} />
          <Section title="Lifestyle Tips" items={remedy.lifestyle} />
          {remedy.caution && (
            <p className="text-xs text-destructive bg-destructive/10 rounded-lg p-3">
              ⚠️ {remedy.caution}
            </p>
          )}
          <Link
            to={`/chat?q=${encodeURIComponent(remedy.condition)}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium hover:shadow-elevated transition-all active:scale-95"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Ask AI about this
          </Link>
        </div>
      )}
    </div>
  );
}

function Section({ title, items, html }: { title: string; items: string[]; html?: boolean }) {
  return (
    <div>
      <h4 className="text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-1.5">{title}</h4>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-xs text-foreground/80">
            <span className="text-primary mt-0.5 flex-shrink-0">•</span>
            {html ? (
              <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
            ) : (
              <span>{item}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RemediesPage;
