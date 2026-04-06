import { useState, useEffect } from "react";

const DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const workoutData = [
  {
    day: "Monday", title: "Upper body", intensity: "Hard", duration: "60–75 min",
    color: { bg: "#EEEDFE", accent: "#534AB7", dark: "#3C3489", light: "#AFA9EC" },
    warmup: "5 min light cardio + arm circles, band pull-aparts × 15",
    blocks: [
      { name: "Chest & push", exercises: [
        { id: "m1", name: "Push-ups", target: "4 × 12–15", note: "Elevate feet for difficulty", type: "reps" },
        { id: "m2", name: "DB chest press", target: "4 × 8–10", note: "90s rest", type: "weight" },
      ]},
      { name: "Back & pull", exercises: [
        { id: "m3", name: "Pull-ups", target: "4 × max", note: "Band assist if needed", type: "reps" },
        { id: "m4", name: "Lat pulldowns", target: "3 × 10–12", note: "Slow eccentric 3s", type: "weight" },
        { id: "m5", name: "DB rows", target: "3 × 10 each", note: "Squeeze at top", type: "weight" },
      ]},
      { name: "Arms", exercises: [
        { id: "m6", name: "Bicep curls", target: "3 × 12", note: "Alternating", type: "weight" },
        { id: "m7", name: "Hammer curls", target: "3 × 12", note: "Both arms together", type: "weight" },
        { id: "m8", name: "Tricep overhead ext.", target: "3 × 12", note: "DB or cable", type: "weight" },
        { id: "m9", name: "Tricep pushdowns", target: "3 × 12", note: "Rope attachment", type: "weight" },
      ]},
      { name: "Shoulders", exercises: [
        { id: "m10", name: "Lateral raises", target: "3 × 15", note: "Light, strict form", type: "weight" },
        { id: "m11", name: "Front raises", target: "2 × 12", note: "Alternate arms", type: "weight" },
      ]},
    ],
    cooldown: "Chest doorway stretch, tricep stretch, cross-body shoulder — 30s each",
  },
  {
    day: "Tuesday", title: "Lower body", intensity: "Moderate", duration: "60–70 min",
    color: { bg: "#E6F1FB", accent: "#185FA5", dark: "#0C447C", light: "#85B7EB" },
    warmup: "5 min bike + 90/90 hip switches × 10, BW squats × 10",
    blocks: [
      { name: "Quads & compound", exercises: [
        { id: "t1", name: "Squats", target: "4 × 8–10", note: "Full depth", type: "weight" },
        { id: "t2", name: "Walking lunges", target: "3 × 10 each", note: "DBs optional", type: "weight" },
      ]},
      { name: "Posterior chain", exercises: [
        { id: "t3", name: "Romanian deadlifts", target: "4 × 8–10", note: "Feel hamstring stretch", type: "weight" },
        { id: "t4", name: "Back extensions", target: "3 × 12", note: "Hold top 2s", type: "reps" },
      ]},
      { name: "Knee health", exercises: [
        { id: "t5", name: "Nordic curls", target: "3 × 5–8", note: "Band assist if needed", type: "reps" },
        { id: "t6", name: "Reverse nordics", target: "3 × 8–10", note: "Slow and controlled", type: "reps" },
      ]},
      { name: "Ankles & glutes", exercises: [
        { id: "t7", name: "Calf raises", target: "3 × 15", note: "Pause top and bottom", type: "reps" },
        { id: "t8", name: "KOT split squat", target: "3 × 10 each", note: "Bodyweight first", type: "reps" },
        { id: "t9", name: "Clamshell", target: "3 × 15 each", note: "Band around knees", type: "reps" },
        { id: "t10", name: "Glute bridge", target: "3 × 12", note: "Single leg to progress", type: "reps" },
      ]},
    ],
    cooldown: "Couch stretch 60s each, pigeon 60s each, calf stretch 30s each",
  },
  {
    day: "Wednesday", title: "Functional & power", intensity: "Moderate", duration: "50–60 min",
    color: { bg: "#FAECE7", accent: "#993C1D", dark: "#712B13", light: "#F0997B" },
    warmup: "3 min easy rowing + high knees, butt kicks, lateral shuffle — 30s each",
    blocks: [
      { name: "Conditioning", exercises: [
        { id: "w1", name: "Rowing", target: "3 min", note: "Moderate pace, good form", type: "time" },
      ]},
      { name: "Plyometrics", exercises: [
        { id: "w2", name: "Seated vertical jumps", target: "3 × 5", note: "Explode from dead stop", type: "reps" },
        { id: "w3", name: "Depth jumps", target: "3 × 5", note: "12–18 in. box", type: "reps" },
        { id: "w4", name: "Single leg box jumps", target: "3 × 4 each", note: "Start low", type: "reps" },
      ]},
      { name: "Loaded carries & power", exercises: [
        { id: "w5", name: "Farmer carry", target: "4 × 30 sec", note: "Heavy, tall posture", type: "weight" },
        { id: "w6", name: "Kettlebell swings", target: "4 × 15", note: "Hip snap", type: "weight" },
      ]},
    ],
    cooldown: "Hip flexor stretch, hamstring stretch, thoracic rotation — 30s each",
  },
  {
    day: "Thursday", title: "Easy endurance", intensity: "Easy", duration: "30–40 min",
    color: { bg: "#E1F5EE", accent: "#0F6E56", dark: "#085041", light: "#5DCAA5" },
    warmup: "5 min walk, gradually increase pace",
    blocks: [
      { name: "Option A — Run/walk", exercises: [
        { id: "th1", name: "Jog/walk intervals", target: "25–35 min", note: "3 min jog, 2 min walk", type: "time" },
      ]},
      { name: "Option B — Bike", exercises: [
        { id: "th2", name: "Steady cycling", target: "30–40 min", note: "Low resistance", type: "time" },
      ]},
      { name: "Mobility (optional)", exercises: [
        { id: "th3", name: "Foam roll", target: "5 min", note: "Quads & IT band", type: "time" },
        { id: "th4", name: "World's greatest stretch", target: "5 each side", note: "Hold 3s each", type: "reps" },
      ]},
    ],
    cooldown: "5 min walk, light full-body stretching",
  },
  {
    day: "Friday", title: "Upper body (light)", intensity: "Moderate", duration: "45–55 min",
    color: { bg: "#EEEDFE", accent: "#534AB7", dark: "#3C3489", light: "#AFA9EC" },
    warmup: "5 min light cardio + band pull-aparts × 15, scap push-ups × 10",
    blocks: [
      { name: "Chest & push", exercises: [
        { id: "f1", name: "Push-ups", target: "3 × 10–12", note: "Standard or incline", type: "reps" },
        { id: "f2", name: "DB chest press", target: "3 × 10", note: "Lighter than Monday", type: "weight" },
      ]},
      { name: "Back & pull", exercises: [
        { id: "f3", name: "Pull-ups", target: "3 × submaximal", note: "Leave 2–3 in tank", type: "reps" },
        { id: "f4", name: "Cable rows", target: "3 × 12", note: "Focus on retraction", type: "weight" },
      ]},
      { name: "Arms (reduced)", exercises: [
        { id: "f5", name: "Bicep curls", target: "2 × 12", note: "Lighter weight", type: "weight" },
        { id: "f6", name: "Tricep pushdowns", target: "2 × 15", note: "Light, pump focus", type: "weight" },
      ]},
      { name: "Shoulders & prehab", exercises: [
        { id: "f7", name: "Lateral raises", target: "3 × 15", note: "Same as Monday", type: "weight" },
        { id: "f8", name: "Face pulls", target: "3 × 15", note: "Shoulder health", type: "weight" },
      ]},
    ],
    cooldown: "Chest stretch, lat stretch, wrist circles — 30s each",
  },
  {
    day: "Saturday", title: "Badminton", intensity: "Hard", duration: "60–90 min",
    color: { bg: "#FAEEDA", accent: "#854F0B", dark: "#633806", light: "#FAC775" },
    warmup: "5 min jog + dynamic lunges, arm swings, shadow footwork 2 min",
    blocks: [
      { name: "Footwork — 15 min", exercises: [
        { id: "s1", name: "6-corner footwork", target: "4 × 30 sec", note: "Full speed", type: "time" },
        { id: "s2", name: "Side-to-side shuffle", target: "3 × 45 sec", note: "Stay low", type: "time" },
        { id: "s3", name: "Front-back lunges", target: "3 × 30 sec", note: "Net-to-back sim", type: "time" },
      ]},
      { name: "Technical — 20 min", exercises: [
        { id: "s4", name: "Clear drills", target: "5 min", note: "Full rotation", type: "time" },
        { id: "s5", name: "Net shots", target: "5 min", note: "Soft touch", type: "time" },
        { id: "s6", name: "Smash practice", target: "5 min", note: "60% → 100%", type: "time" },
        { id: "s7", name: "Serve practice", target: "5 min", note: "Mix low/flick", type: "time" },
      ]},
      { name: "Match play — 30–45 min", exercises: [
        { id: "s8", name: "Competitive games", target: "Best of 3", note: "Go all out", type: "time" },
      ]},
    ],
    cooldown: "5 min walk, shoulder + hip + hamstring stretches — 45s each",
  },
  {
    day: "Sunday", title: "Active recovery", intensity: "Easy", duration: "20–30 min",
    color: { bg: "#F1EFE8", accent: "#5F5E5A", dark: "#444441", light: "#D3D1C7" },
    warmup: "No warmup — start slow",
    blocks: [
      { name: "Light movement", exercises: [
        { id: "su1", name: "Easy walk", target: "15–20 min", note: "Outdoors if possible", type: "time" },
      ]},
      { name: "Mobility & stretching", exercises: [
        { id: "su2", name: "Foam roll full body", target: "5–8 min", note: "Quads, glutes, lats", type: "time" },
        { id: "su3", name: "Deep squat hold", target: "3 × 30 sec", note: "Hold onto something", type: "time" },
        { id: "su4", name: "Pigeon stretch", target: "60s each side", note: "Breathe and relax", type: "time" },
        { id: "su5", name: "Cat-cow", target: "10 slow reps", note: "Sync with breath", type: "reps" },
        { id: "su6", name: "Thoracic rotation", target: "8 each side", note: "Open up for next week", type: "reps" },
      ]},
    ],
    cooldown: "Rest up for Monday.",
  },
];

const STORAGE_KEY = "workout-log-data";
const API_BASE_URL = (typeof window !== "undefined" && window.__WORKOUT_API_BASE_URL) || "http://localhost:4000";
function getToday() { return DAYS[new Date().getDay()]; }
function dateKey() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; }
function formatDate(key) { const [y,m,d] = key.split("-").map(Number); return `${MONTHS[m-1]} ${d}, ${y}`; }
function prevSessionDate(logs, dayName, excludeKey) { return Object.keys(logs).filter(k => k !== excludeKey && logs[k]?.day === dayName).sort().reverse()[0] || null; }
function getWorkoutForDay(dayName) { return workoutData.find(w => w.day === dayName); }

function sessionsToLogs(sessions) {
  const out = {};
  sessions.forEach((session) => {
    if (!session?.dateKey || !session?.day) return;
    out[session.dateKey] = {
      day: session.day,
      exercises: session.exercises || {},
      timestamp: session.timestamp || Date.now(),
    };
  });
  return out;
}

async function loadSessionsFromApi() {
  const res = await fetch(`${API_BASE_URL}/sessions`);
  if (!res.ok) throw new Error("Failed to fetch sessions");
  const data = await res.json();
  return sessionsToLogs(data?.sessions || []);
}

async function saveSessionToApi(payload) {
  const res = await fetch(`${API_BASE_URL}/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to save session");
  const data = await res.json();
  return data?.session || null;
}

function LiveClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(id); }, []);
  const h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
  const h12 = h % 12 || 12;
  const time = `${h12}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")} ${h >= 12 ? "pm" : "am"}`;
  return (
    <div style={{ textAlign: "right", lineHeight: 1.3 }}>
      <div style={{ fontSize: 15, fontWeight: 500, color: "var(--color-text-primary)", fontVariantNumeric: "tabular-nums" }}>{time}</div>
      <div style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>{DAYS[now.getDay()]}, {MONTHS[now.getMonth()]} {now.getDate()}</div>
    </div>
  );
}

function WorkoutTimer() {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => { const id = setInterval(() => setElapsed(e => e + 1), 1000); return () => clearInterval(id); }, []);
  const m = Math.floor(elapsed / 60), s = elapsed % 60;
  return (
    <div style={{ textAlign: "right", lineHeight: 1.3 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6 }}>
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#E24B4A", animation: "pulse 1.5s ease-in-out infinite" }} />
        <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}`}</style>
        <span style={{ fontSize: 15, fontWeight: 500, color: "var(--color-text-primary)", fontVariantNumeric: "tabular-nums" }}>{m}:{String(s).padStart(2,"0")}</span>
      </div>
      <div style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>Workout in progress</div>
    </div>
  );
}

export default function WorkoutTracker() {
  const [logs, setLogs] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [selectedDayIdx, setSelectedDayIdx] = useState(null);
  const [currentDay, setCurrentDay] = useState(getToday());
  const [view, setView] = useState("today");
  const [activeSession, setActiveSession] = useState(null);
  const [sessionData, setSessionData] = useState({});
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [loadError, setLoadError] = useState("");
  const [historyFilter, setHistoryFilter] = useState(null);
  const [expandedKey, setExpandedKey] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const apiLogs = await loadSessionsFromApi();

        if (Object.keys(apiLogs).length === 0 && typeof window !== "undefined" && window.storage?.get) {
          // One-time migration path from legacy local logs if backend has no data yet.
          try {
            const legacy = await window.storage.get(STORAGE_KEY);
            const legacyLogs = legacy?.value ? JSON.parse(legacy.value) : {};
            const entries = Object.entries(legacyLogs);
            if (entries.length > 0) {
              await Promise.all(entries.map(([legacyDateKey, entry]) => saveSessionToApi({
                dateKey: legacyDateKey,
                day: entry.day,
                timestamp: entry.timestamp || Date.now(),
                exercises: entry.exercises || {},
              })));
              const migratedLogs = await loadSessionsFromApi();
              setLogs(migratedLogs);
            } else {
              setLogs(apiLogs);
            }
          } catch {
            setLogs(apiLogs);
          }
        } else {
          setLogs(apiLogs);
        }
      } catch {
        setLoadError("Could not load workout history from backend.");
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      const next = getToday();
      setCurrentDay((prev) => (prev === next ? prev : next));
    }, 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const idx = workoutData.findIndex((w) => w.day === currentDay);
    setSelectedDayIdx(idx >= 0 ? idx : 0);
  }, [currentDay]);

  const workout = selectedDayIdx !== null ? workoutData[selectedDayIdx] : null;
  const tk = dateKey();
  const todayLog = logs[tk];
  const prevKey = workout ? prevSessionDate(logs, workout.day, tk) : null;
  const prevLog = prevKey ? logs[prevKey] : null;

  const startSession = () => {
    const init = {};
    workout.blocks.forEach(b => b.exercises.forEach(ex => {
      init[ex.id] = { value: prevLog?.exercises?.[ex.id]?.value || "", done: false };
    }));
    setSessionData(init);
    setActiveSession(workout.day);
    setSaveError("");
    setSaved(false);
  };

  const updateEx = (id, val) => setSessionData((p) => ({ ...p, [id]: { ...(p[id] || {}), value: val } }));
  const toggleDone = (id) => setSessionData((p) => ({ ...p, [id]: { ...(p[id] || {}), done: !p[id]?.done } }));

  const saveSession = async () => {
    const entry = { day: workout.day, exercises: {}, timestamp: Date.now() };
    Object.entries(sessionData).forEach(([id, d]) => { entry.exercises[id] = { value: d.value || "", done: Boolean(d.done) }; });
    try {
      const savedSession = await saveSessionToApi({
        dateKey: tk,
        day: entry.day,
        timestamp: entry.timestamp,
        exercises: entry.exercises,
      });
      if (savedSession) {
        setLogs((p) => ({
          ...p,
          [savedSession.dateKey]: {
            day: savedSession.day,
            exercises: savedSession.exercises || {},
            timestamp: savedSession.timestamp || Date.now(),
          },
        }));
      }
      setSaved(true);
      setSaveError("");
      setActiveSession(null);
    } catch {
      setSaveError("Could not save this session. Please try again.");
    }
  };

  const allEx = workout ? workout.blocks.flatMap(b => b.exercises) : [];
  const doneCount = activeSession ? Object.values(sessionData).filter(d => d.done).length : 0;

  const historyEntries = Object.entries(logs)
    .filter(([, v]) => !historyFilter || v.day === historyFilter)
    .sort(([a], [b]) => b.localeCompare(a));

  if (!loaded || selectedDayIdx === null) return null;

  return (
    <div style={{ fontFamily: "var(--font-sans)", maxWidth: 480, margin: "0 auto", padding: "0.25rem 0" }}>
      {loadError && (
        <div style={{ marginBottom: 12, padding: "10px 12px", borderRadius: "var(--border-radius-md)", background: "#FFF2F1", color: "#8F2E2C", fontSize: 12 }}>
          {loadError}
        </div>
      )}
      {/* Header: tabs + clock */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ display: "flex", gap: 0, background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: 3 }}>
          {["today", "history"].map(v => (
            <button key={v} onClick={() => { setView(v); if (v === "history") setExpandedKey(null); }} style={{
              fontSize: 13, padding: "6px 14px", fontWeight: view === v ? 500 : 400, border: "none", cursor: "pointer", borderRadius: 6,
              background: view === v ? "var(--color-background-primary)" : "transparent",
              color: view === v ? "var(--color-text-primary)" : "var(--color-text-secondary)",
              boxShadow: view === v ? "0 0 0 0.5px var(--color-border-tertiary)" : "none",
            }}>{v === "today" ? "Workout" : "History"}</button>
          ))}
        </div>
        {activeSession ? <WorkoutTimer /> : <LiveClock />}
      </div>

      {/* ====== WORKOUT VIEW ====== */}
      {view === "today" && (
        <>
          <div style={{ display: "flex", gap: 6, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
            {workoutData.map((w, i) => {
              const isToday = w.day === currentDay;
              const sel = i === selectedDayIdx;
              return (
                <div key={i} onClick={() => { setSelectedDayIdx(i); setActiveSession(null); setSaved(false); }} style={{
                  flexShrink: 0, width: 44, height: 52, borderRadius: "var(--border-radius-md)",
                  background: sel ? w.color.bg : "var(--color-background-secondary)",
                  border: sel ? `1.5px solid ${w.color.accent}` : isToday ? `1.5px solid var(--color-border-secondary)` : "0.5px solid var(--color-border-tertiary)",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.15s", gap: 2,
                }}>
                  <span style={{ fontSize: 10, fontWeight: 500, color: sel ? w.color.dark : "var(--color-text-tertiary)", textTransform: "uppercase" }}>{w.day.slice(0,3)}</span>
                  {isToday && <div style={{ width: 4, height: 4, borderRadius: "50%", background: sel ? w.color.accent : "var(--color-text-tertiary)" }} />}
                </div>
              );
            })}
          </div>

          {workout && (
            <div style={{ background: "var(--color-background-primary)", borderRadius: "var(--border-radius-lg)", border: "0.5px solid var(--color-border-tertiary)", overflow: "hidden" }}>
              {/* Header */}
              <div style={{ padding: "16px 16px 12px", borderLeft: `4px solid ${workout.color.accent}`, background: workout.color.bg }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 18, fontWeight: 500, color: workout.color.dark }}>{workout.title}</span>
                  <span style={{ fontSize: 11, fontWeight: 500, padding: "3px 10px", borderRadius: 20, background: workout.intensity === "Hard" ? "#F09595" : `${workout.color.accent}18`, color: workout.intensity === "Hard" ? "#501313" : workout.color.accent }}>{workout.intensity}</span>
                </div>
                <span style={{ fontSize: 13, color: workout.color.accent }}>{workout.duration}</span>
                <div style={{ marginTop: 10, fontSize: 12, color: workout.color.dark, lineHeight: 1.5, opacity: 0.8 }}>
                  <span style={{ fontWeight: 500 }}>Warmup:</span> {workout.warmup}
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: "12px 16px 16px", borderLeft: `4px solid ${workout.color.accent}` }}>
                {activeSession && (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderRadius: "var(--border-radius-md)", background: "var(--color-background-secondary)", marginBottom: 14 }}>
                    <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>{doneCount}/{allEx.length} done</span>
                    <div style={{ width: 80, height: 4, borderRadius: 2, background: "var(--color-border-tertiary)" }}>
                      <div style={{ width: `${allEx.length ? Math.round(doneCount/allEx.length*100) : 0}%`, height: "100%", borderRadius: 2, background: workout.color.accent, transition: "width 0.2s" }} />
                    </div>
                  </div>
                )}

                {workout.blocks.map((block, bi) => (
                  <div key={bi} style={{ marginBottom: 18 }}>
                    <div style={{ fontSize: 11, fontWeight: 500, color: workout.color.accent, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>{block.name}</div>
                    {block.exercises.map(ex => {
                      const prev = prevLog?.exercises?.[ex.id];
                      const td = todayLog?.exercises?.[ex.id];
                      const sd = sessionData[ex.id];
                      const indent = activeSession || td?.done ? 26 : 0;
                      return (
                        <div key={ex.id} style={{ padding: "10px 0", borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                {activeSession && (
                                  <div onClick={() => toggleDone(ex.id)} style={{
                                    width: 20, height: 20, borderRadius: 4, flexShrink: 0, cursor: "pointer",
                                    border: sd?.done ? `2px solid ${workout.color.accent}` : "1.5px solid var(--color-border-secondary)",
                                    background: sd?.done ? workout.color.accent : "transparent",
                                    display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s",
                                  }}>
                                    {sd?.done && <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2.5 6l2.5 2.5 4.5-5" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                                  </div>
                                )}
                                {!activeSession && td?.done && (
                                  <div style={{ width: 18, height: 18, borderRadius: 4, flexShrink: 0, background: workout.color.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2.5 6l2.5 2.5 4.5-5" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                  </div>
                                )}
                                <span style={{ fontSize: 14, color: "var(--color-text-primary)", textDecoration: (activeSession && sd?.done) ? "line-through" : "none", opacity: (activeSession && sd?.done) ? 0.5 : 1 }}>{ex.name}</span>
                              </div>
                              <span style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginLeft: indent }}>{ex.note}</span>
                            </div>
                            <span style={{ fontSize: 13, fontWeight: 500, color: workout.color.accent, whiteSpace: "nowrap" }}>{ex.target}</span>
                          </div>
                          {prev && !activeSession && <div style={{ marginTop: 6, marginLeft: indent, fontSize: 12, color: "var(--color-text-tertiary)" }}><span style={{ opacity: 0.6 }}>Last: </span>{prev.value || "—"}</div>}
                          {td && !activeSession && td.value && <div style={{ marginTop: 4, marginLeft: indent, fontSize: 12, color: workout.color.accent }}><span style={{ opacity: 0.7 }}>Today: </span>{td.value}</div>}
                          {activeSession && (
                            <div style={{ marginTop: 8, marginLeft: 26, display: "flex", alignItems: "center", gap: 8 }}>
                              {prev && <span style={{ fontSize: 11, color: "var(--color-text-tertiary)", flexShrink: 0 }}>Last: {prev.value || "—"}</span>}
                              <input type="text" placeholder={ex.type === "weight" ? "e.g. 20kg × 10" : ex.type === "time" ? "e.g. 32 min" : "e.g. 12, 10, 8"}
                                value={sd?.value || ""} onChange={e => updateEx(ex.id, e.target.value)}
                                style={{ flex: 1, fontSize: 13, padding: "6px 10px", borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-secondary)", background: "var(--color-background-primary)", color: "var(--color-text-primary)", outline: "none", minWidth: 0 }} />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}

                <div style={{ padding: "10px 12px", borderRadius: "var(--border-radius-md)", background: "var(--color-background-secondary)", marginBottom: 14, fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
                  <span style={{ fontWeight: 500, color: "var(--color-text-primary)" }}>Cooldown:</span> {workout.cooldown}
                </div>
                {saveError && (
                  <div style={{ marginBottom: 12, padding: "10px 12px", borderRadius: "var(--border-radius-md)", background: "#FFF2F1", color: "#8F2E2C", fontSize: 12 }}>
                    {saveError}
                  </div>
                )}

                {!activeSession && !saved && !todayLog && (
                  <button onClick={startSession} style={{ width: "100%", padding: "12px", fontSize: 14, fontWeight: 500, background: workout.color.accent, color: "#fff", border: "none", borderRadius: "var(--border-radius-md)", cursor: "pointer" }}>Start workout</button>
                )}
                {!activeSession && (todayLog || saved) && (
                  <div style={{ textAlign: "center", padding: "10px", fontSize: 13, color: workout.color.accent, fontWeight: 500 }}>Workout logged for today</div>
                )}
                {activeSession && (
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => { setActiveSession(null); setSessionData({}); }} style={{ flex: 1, padding: "12px", fontSize: 14, background: "transparent", border: "0.5px solid var(--color-border-secondary)", borderRadius: "var(--border-radius-md)", color: "var(--color-text-secondary)", cursor: "pointer" }}>Cancel</button>
                    <button onClick={saveSession} style={{ flex: 2, padding: "12px", fontSize: 14, fontWeight: 500, background: workout.color.accent, color: "#fff", border: "none", borderRadius: "var(--border-radius-md)", cursor: "pointer" }}>Save workout</button>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {/* ====== HISTORY VIEW ====== */}
      {view === "history" && (
        <div>
          {/* Filter chips */}
          <div style={{ display: "flex", gap: 6, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
            <div onClick={() => setHistoryFilter(null)} style={{
              flexShrink: 0, padding: "6px 12px", borderRadius: "var(--border-radius-md)", cursor: "pointer", fontSize: 12, fontWeight: 500,
              background: !historyFilter ? "var(--color-text-primary)" : "var(--color-background-secondary)",
              color: !historyFilter ? "var(--color-background-primary)" : "var(--color-text-secondary)",
              border: "0.5px solid var(--color-border-tertiary)",
            }}>All</div>
            {workoutData.map(w => (
              <div key={w.day} onClick={() => setHistoryFilter(historyFilter === w.day ? null : w.day)} style={{
                flexShrink: 0, padding: "6px 12px", borderRadius: "var(--border-radius-md)", cursor: "pointer", fontSize: 12, fontWeight: 500,
                background: historyFilter === w.day ? w.color.bg : "var(--color-background-secondary)",
                color: historyFilter === w.day ? w.color.dark : "var(--color-text-secondary)",
                border: historyFilter === w.day ? `1px solid ${w.color.accent}` : "0.5px solid var(--color-border-tertiary)",
              }}>{w.day.slice(0,3)}</div>
            ))}
          </div>

          {historyEntries.length === 0 && (
            <div style={{ textAlign: "center", padding: "48px 16px", color: "var(--color-text-tertiary)", fontSize: 14 }}>
              {Object.keys(logs).length === 0 ? "No workouts logged yet. Start a session from the workout tab." : "No sessions found for this filter."}
            </div>
          )}

          {historyEntries.map(([key, entry]) => {
            const w = getWorkoutForDay(entry.day);
            if (!w) return null;
            const exList = w.blocks.flatMap(b => b.exercises);
            const completed = exList.filter(ex => entry.exercises?.[ex.id]?.done).length;
            const isExp = expandedKey === key;
            return (
              <div key={key} style={{ background: "var(--color-background-primary)", borderRadius: "var(--border-radius-lg)", border: "0.5px solid var(--color-border-tertiary)", overflow: "hidden", marginBottom: 8 }}>
                <div onClick={() => setExpandedKey(isExp ? null : key)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", cursor: "pointer", borderLeft: `4px solid ${w.color.accent}` }}>
                  <div style={{ width: 40, height: 40, borderRadius: "var(--border-radius-md)", background: w.color.bg, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 500, color: w.color.dark }}>{entry.day.slice(0,2)}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-primary)" }}>{w.title}</div>
                    <div style={{ fontSize: 12, color: "var(--color-text-tertiary)" }}>{formatDate(key)}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: w.color.accent }}>{completed}/{exList.length}</div>
                    <div style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>done</div>
                  </div>
                  <span style={{ fontSize: 16, color: "var(--color-text-tertiary)", transition: "transform 0.2s", transform: isExp ? "rotate(180deg)" : "rotate(0deg)", marginLeft: 4 }}>▾</span>
                </div>

                {isExp && (
                  <div style={{ padding: "0 14px 14px", borderLeft: `4px solid ${w.color.accent}` }}>
                    {w.blocks.map((block, bi) => (
                      <div key={bi} style={{ marginBottom: 12 }}>
                        <div style={{ fontSize: 11, fontWeight: 500, color: w.color.accent, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6, marginTop: bi === 0 ? 4 : 0 }}>{block.name}</div>
                        {block.exercises.map(ex => {
                          const lg = entry.exercises?.[ex.id];
                          return (
                            <div key={ex.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 0", borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, minWidth: 0 }}>
                                {lg?.done ? (
                                  <div style={{ width: 16, height: 16, borderRadius: 3, background: w.color.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                    <svg width="10" height="10" viewBox="0 0 12 12"><path d="M2.5 6l2.5 2.5 4.5-5" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                  </div>
                                ) : (
                                  <div style={{ width: 16, height: 16, borderRadius: 3, border: "1.5px solid var(--color-border-tertiary)", flexShrink: 0 }} />
                                )}
                                <span style={{ fontSize: 13, color: lg?.done ? "var(--color-text-primary)" : "var(--color-text-tertiary)" }}>{ex.name}</span>
                              </div>
                              <span style={{ fontSize: 12, color: lg?.value ? w.color.accent : "var(--color-text-tertiary)", fontWeight: lg?.value ? 500 : 400, whiteSpace: "nowrap" }}>{lg?.value || "—"}</span>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {historyEntries.length > 0 && (
            <div style={{ textAlign: "center", padding: "12px", fontSize: 12, color: "var(--color-text-tertiary)" }}>
              {historyEntries.length} session{historyEntries.length !== 1 ? "s" : ""} logged
            </div>
          )}
        </div>
      )}
    </div>
  );
}
