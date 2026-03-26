import { useState, useCallback, useEffect } from "react";

export interface Reminder {
  id: string;
  medicineName: string;
  dosage: string;
  times: string[]; // e.g. ["08:00", "20:00"]
  notes: string;
  active: boolean;
  createdAt: number;
}

const STORAGE_KEY = "naturopathy-reminders";

function load(): Reminder[] {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    return s ? JSON.parse(s) : [];
  } catch {
    return [];
  }
}

function save(r: Reminder[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(r));
  } catch {}
}

export function useReminders() {
  const [reminders, setReminders] = useState<Reminder[]>(load);

  const addReminder = useCallback((r: Omit<Reminder, "id" | "createdAt" | "active">) => {
    setReminders((prev) => {
      const next = [...prev, { ...r, id: crypto.randomUUID(), active: true, createdAt: Date.now() }];
      save(next);
      return next;
    });
  }, []);

  const removeReminder = useCallback((id: string) => {
    setReminders((prev) => {
      const next = prev.filter((r) => r.id !== id);
      save(next);
      return next;
    });
  }, []);

  const toggleReminder = useCallback((id: string) => {
    setReminders((prev) => {
      const next = prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r));
      save(next);
      return next;
    });
  }, []);

  // Browser notification check
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // Simple notification scheduler
  useEffect(() => {
    if (!("Notification" in window) || Notification.permission !== "granted") return;
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      reminders
        .filter((r) => r.active && r.times.includes(currentTime))
        .forEach((r) => {
          new Notification("💊 Medicine Reminder", {
            body: `Time to take ${r.medicineName} (${r.dosage})`,
            icon: "/placeholder.svg",
          });
        });
    }, 60000);
    return () => clearInterval(interval);
  }, [reminders]);

  return { reminders, addReminder, removeReminder, toggleReminder };
}
