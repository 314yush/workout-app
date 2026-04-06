import fs from "fs";
import path from "path";
import sqlite3 from "sqlite3";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, "data");
const dbPath = path.join(dataDir, "workout-tracker.db");
const schemaPath = path.join(__dirname, "schema.sql");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

export const db = new sqlite3.Database(dbPath);

export function initDb() {
  const schema = fs.readFileSync(schemaPath, "utf8");
  return new Promise((resolve, reject) => {
    db.exec(schema, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

export function getSessions(dayName) {
  const baseSql = "SELECT date_key, day_name, timestamp, exercises_json FROM sessions";
  const sql = dayName ? `${baseSql} WHERE day_name = ? ORDER BY date_key DESC` : `${baseSql} ORDER BY date_key DESC`;
  const params = dayName ? [dayName] : [];
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

export function getSessionByDate(dateKey) {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT date_key, day_name, timestamp, exercises_json FROM sessions WHERE date_key = ?",
      [dateKey],
      (err, row) => {
        if (err) reject(err);
        else resolve(row || null);
      }
    );
  });
}

export function upsertSession({ dateKey, dayName, timestamp, exercisesJson }) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO sessions (date_key, day_name, timestamp, exercises_json)
       VALUES (?, ?, ?, ?)
       ON CONFLICT(date_key) DO UPDATE SET
         day_name = excluded.day_name,
         timestamp = excluded.timestamp,
         exercises_json = excluded.exercises_json`,
      [dateKey, dayName, timestamp, exercisesJson],
      (err) => {
        if (err) reject(err);
        else resolve();
      }
    );
  });
}
