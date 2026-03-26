import { useState } from "react";
import { Plus, Trash2, Bell, BellOff, Clock, X } from "lucide-react";
import { useReminders } from "@/hooks/useReminders";

const RemindersPage = () => {
  const { reminders, addReminder, removeReminder, toggleReminder } = useReminders();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [times, setTimes] = useState<string[]>(["08:00"]);
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !dosage.trim()) return;
    addReminder({ medicineName: name.trim(), dosage: dosage.trim(), times, notes: notes.trim() });
    setName("");
    setDosage("");
    setTimes(["08:00"]);
    setNotes("");
    setShowForm(false);
  };

  const addTimeSlot = () => setTimes((prev) => [...prev, "12:00"]);
  const removeTimeSlot = (i: number) => setTimes((prev) => prev.filter((_, idx) => idx !== i));
  const updateTime = (i: number, val: string) => setTimes((prev) => prev.map((t, idx) => (idx === i ? val : t)));

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-24 md:pb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Medicine Reminders</h1>
          <p className="text-sm text-muted-foreground">{reminders.length} reminder{reminders.length !== 1 ? "s" : ""}</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium shadow-soft hover:shadow-elevated transition-all active:scale-95"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Cancel" : "Add"}
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 rounded-2xl bg-card border border-border shadow-card space-y-4 animate-fade-up">
          <div>
            <label className="block text-xs font-medium text-foreground mb-1">Medicine Name *</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ashwagandha"
              className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground mb-1">Dosage *</label>
            <input
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              placeholder="e.g. 500mg, 1 tablet"
              className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground mb-1">Reminder Times</label>
            <div className="space-y-2">
              {times.map((t, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="time"
                    value={t}
                    onChange={(e) => updateTime(i, e.target.value)}
                    className="bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  {times.length > 1 && (
                    <button type="button" onClick={() => removeTimeSlot(i)} className="text-muted-foreground hover:text-destructive">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button type="button" onClick={addTimeSlot} className="mt-2 text-xs text-primary font-medium hover:underline">
              + Add another time
            </button>
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground mb-1">Notes (optional)</label>
            <input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Take after meals"
              className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm shadow-soft hover:shadow-elevated transition-all active:scale-95"
          >
            Save Reminder
          </button>
        </form>
      )}

      {/* Reminders List */}
      {reminders.length === 0 && !showForm ? (
        <div className="text-center py-16">
          <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-30" />
          <p className="text-muted-foreground text-sm">No reminders yet</p>
          <p className="text-xs text-muted-foreground mt-1">Add your first medicine reminder above</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reminders.map((r) => (
            <div
              key={r.id}
              className={`flex items-start gap-3 p-4 rounded-2xl border shadow-soft transition-all ${
                r.active ? "bg-card border-border" : "bg-muted/50 border-border/50 opacity-60"
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-sm">{r.medicineName}</h3>
                <p className="text-xs text-muted-foreground">{r.dosage}</p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {r.times.map((t, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">{t}</span>
                  ))}
                </div>
                {r.notes && <p className="text-xs text-muted-foreground mt-1">{r.notes}</p>}
              </div>
              <div className="flex gap-1.5 flex-shrink-0">
                <button onClick={() => toggleReminder(r.id)} className="p-2 rounded-full hover:bg-muted transition-colors" title={r.active ? "Pause" : "Resume"}>
                  {r.active ? <Bell className="w-4 h-4 text-primary" /> : <BellOff className="w-4 h-4 text-muted-foreground" />}
                </button>
                <button onClick={() => removeReminder(r.id)} className="p-2 rounded-full hover:bg-destructive/10 transition-colors" title="Delete">
                  <Trash2 className="w-4 h-4 text-destructive" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RemindersPage;
