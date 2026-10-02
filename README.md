# Sangyan Suraksha: Check before you trust

Built for the **SANGYAN Investor Resilience Hackathon** (SEBI x NSDL x SNTC, IIT BHU), Tracks A + B + E.

An investor-protection tool for first-time investors in Tier-2/3 India. It helps a user (1) check a suspicious WhatsApp/Telegram investment message *before* paying, and (2) know what to do in the first hour *after* a scam.

## Architecture
```
Browser (index.html)  --POST /api/analyze {text, lang}-->  Node.js server (server.js)
        ^                                                       |
        |  {s, f[], lv} risk score, reasons, level              v
        +--------------------------------------------  engine.js (rule-based red-flag engine)
        |
        +-- if the API is unreachable, the page runs the same rules on the device
```
- **Frontend:** `index.html`, a single page with Hindi/English, voice output, recovery checklist, reality-check slider and an Evidence tab.
- **Backend:** `server.js`, zero dependencies (Node 18+). Serves the page and exposes `GET /api/health` and `POST /api/analyze`.
- **Engine:** `engine.js`, a pure function with no I/O and no storage.
- **Tests:** `npm test` runs `engine.js` on `testset.json` (30 labelled messages: precision 93%, recall 88%, accuracy 90%).

## Run locally
```
npm start        # http://localhost:3000
npm test         # prints precision / recall / accuracy
```
API example:
```
curl -X POST localhost:3000/api/analyze -H "Content-Type: application/json" \
  -d '{"text":"Join VIP group, guaranteed 30% monthly returns","lang":"en"}'
```

## Deploy (free)
- **Full stack (frontend + backend):** create a free Web Service on Render from this repo (`render.yaml` is included). Build: `npm install`, start: `npm start`.
- **Frontend only on GitHub Pages:** works as-is (the page checks messages on the device). To point it at a hosted backend, set `<meta name="api-base" content="https://your-app.onrender.com">` in `index.html`.

## Guardrails
- No stock tips, buy/sell signals or price predictions
- No broker links, subscriptions or monetisation
- No SMS/OTP or financial record access. The API is stateless: message content is never logged or stored, only an in-memory request counter per minute is kept for rate limiting
- Shows reasons and uncertainty, never only a "safe/scam" verdict

## Limitations
- Rule-based engine (weighted regex), not a trained model
- Cannot confirm that a SEBI registration number is genuine; it checks format only and points to sebi.gov.in
- The sample set is team-written and small; known misses are a KYC phishing link and a paid "stock calls" pitch
- Next: Bhashini for more languages, on-device OCR for screenshots, testing on real reported messages

License: MIT
