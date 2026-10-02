# Sangyan Suraksha: Check before you trust

Built for the **SANGYAN Investor Resilience Hackathon** (SEBI x NSDL x SNTC, IIT BHU), Tracks A + B + E.

An investor-protection tool for first-time investors in Tier-2/3 India. It helps a user (1) check a suspicious WhatsApp/Telegram investment message *before* paying, and (2) know exactly what to do in the first hour *after* a scam.

## Features
- **Scam Check:** paste a message; get a Low / Medium / High risk reading with plain-language reasons (guaranteed returns, urgency, personal UPI ID, remote-access apps, lookalike links, unverifiable SEBI claims) and a list of what the tool cannot verify.
- **Voice output** in Hindi or English (browser speech synthesis).
- **After-Scam Recovery:** six-step first-hour checklist (bank freeze, 1930, cybercrime.gov.in, SCORES) and an auto-filled complaint draft.
- **Reality check:** shows what a claimed monthly return compounds to in a year.
- **Evidence tab:** runs the engine live on a 30-message labelled sample set (16 scam, 14 genuine) and shows precision, recall and accuracy, including its mistakes.
- Hindi/English toggle and large-text mode for senior citizens.

## Run it
No build step and no backend. Open `index.html` in a browser, or enable GitHub Pages (Settings > Pages > Deploy from branch > main > /root).

## Guardrails
- No stock tips, buy/sell signals or price predictions
- No broker links, subscriptions or monetisation
- Privacy by design: no SMS/OTP or financial record access; the message is processed in the browser and never sent or stored
- Shows reasons and uncertainty, never only a "safe/scam" verdict

## Limitations
- Rule-based engine (weighted regex rules), not a trained model
- Cannot confirm that a SEBI registration number is genuine; it checks format only and points to sebi.gov.in
- The sample set is team-written and small; known misses are a KYC phishing link and a paid "stock calls" pitch
- Next: Bhashini for more languages, on-device OCR for screenshots, testing on real reported messages

## Files
- `index.html`: the whole prototype
- `docs/Sangyan_Suraksha_Deck.pptx`: presentation

License: MIT
