'use strict';
// Zero-dependency backend: serves the web app and a stateless scam-check API.
const http = require('http'), fs = require('fs'), path = require('path');
const { analyse } = require('./engine');
const PORT = process.env.PORT || 3000;
const MAX_BODY = 10 * 1024, MAX_TEXT = 2000;
const hits = new Map(); // per-IP counter, in memory only (no message content)
setInterval(() => hits.clear(), 60 * 1000).unref();

function send(res, code, body, type) {
  res.writeHead(code, {
    'Content-Type': type || 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  });
  res.end(body);
}

const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  if (req.method === 'OPTIONS') return send(res, 204, '');
  if (req.method === 'GET' && (url === '/' || url === '/index.html')) {
    return fs.readFile(path.join(__dirname, 'index.html'), (e, d) =>
      e ? send(res, 500, '{"error":"page missing"}') : send(res, 200, d, 'text/html; charset=utf-8'));
  }
  if (req.method === 'GET' && url === '/api/health') return send(res, 200, JSON.stringify({ ok: true }));
  if (req.method === 'POST' && url === '/api/analyze') {
    const ip = req.socket.remoteAddress || 'x';
    const n = (hits.get(ip) || 0) + 1; hits.set(ip, n);
    if (n > 60) return send(res, 429, '{"error":"too many requests"}');
    let body = '', size = 0;
    req.on('data', c => { size += c.length; if (size > MAX_BODY) { req.destroy(); } else body += c; });
    req.on('end', () => {
      try {
        const j = JSON.parse(body);
        if (typeof j.text !== 'string' || !j.text.trim() || j.text.length > MAX_TEXT) throw 0;
        const lang = j.lang === 'en' ? 'en' : 'hi';
        send(res, 200, JSON.stringify(analyse(j.text, lang))); // message is never logged or stored
      } catch (e) { send(res, 400, '{"error":"send JSON {text, lang}, text up to 2000 chars"}'); }
    });
    return;
  }
  send(res, 404, '{"error":"not found"}');
});
server.listen(PORT, () => console.log('Sangyan Suraksha running on port ' + PORT));
