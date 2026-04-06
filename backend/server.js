import cors from "cors";
import express from "express";
import { getSessionByDate, getSessions, initDb, upsertSession } from "./db.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

function toClientSession(row) {
  return {
    dateKey: row.date_key,
    day: row.day_name,
    timestamp: row.timestamp,
    exercises: JSON.parse(row.exercises_json),
  };
}

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/sessions", async (req, res) => {
  try {
    const day = typeof req.query.day === "string" ? req.query.day : null;
    const rows = await getSessions(day);
    res.json({ sessions: rows.map(toClientSession) });
  } catch (error) {
    res.status(500).json({ error: "Failed to load sessions." });
  }
});

app.get("/sessions/:dateKey", async (req, res) => {
  try {
    const row = await getSessionByDate(req.params.dateKey);
    if (!row) {
      res.status(404).json({ error: "Session not found." });
      return;
    }
    res.json({ session: toClientSession(row) });
  } catch (_error) {
    res.status(500).json({ error: "Failed to load session." });
  }
});

app.post("/sessions", async (req, res) => {
  try {
    const { dateKey, day, timestamp, exercises } = req.body || {};
    if (!dateKey || !day || typeof timestamp !== "number" || typeof exercises !== "object" || exercises === null) {
      res.status(400).json({ error: "Invalid payload." });
      return;
    }

    await upsertSession({
      dateKey,
      dayName: day,
      timestamp,
      exercisesJson: JSON.stringify(exercises),
    });

    const row = await getSessionByDate(dateKey);
    res.status(201).json({ session: toClientSession(row) });
  } catch (_error) {
    res.status(500).json({ error: "Failed to save session." });
  }
});

initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Workout backend listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize DB:", error);
    process.exit(1);
  });
