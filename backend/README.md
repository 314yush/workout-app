# Workout Tracker Backend

Simple Express + SQLite API for workout session persistence.

## Run

1. Install dependencies:

```bash
npm install
```

2. Start server:

```bash
npm run dev
```

Server runs at `http://localhost:4000` by default.

## Frontend integration

`workout-tracker_1.jsx` uses `http://localhost:4000` by default. You can override it in the host app with:

```js
window.__WORKOUT_API_BASE_URL = "https://your-api.example.com";
```

## API

- `GET /health`
- `GET /sessions`
- `GET /sessions?day=Monday`
- `GET /sessions/:dateKey` where `dateKey` is `YYYY-MM-DD`
- `POST /sessions`

### POST /sessions payload

```json
{
  "dateKey": "2026-04-06",
  "day": "Monday",
  "timestamp": 1775443200000,
  "exercises": {
    "m1": { "value": "15, 14, 13", "done": true }
  }
}
```

### Notes

- `dateKey` is unique per day, so posting for the same date updates the existing session.
- Data is stored in `backend/data/workout-tracker.db`.
