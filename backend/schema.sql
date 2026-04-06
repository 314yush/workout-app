CREATE TABLE IF NOT EXISTS sessions (
  date_key TEXT PRIMARY KEY,
  day_name TEXT NOT NULL,
  timestamp INTEGER NOT NULL,
  exercises_json TEXT NOT NULL
);
