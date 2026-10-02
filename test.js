'use strict';
// Runs the engine on the labelled sample set and prints precision / recall / accuracy.
const { analyse } = require('./engine');
const set = require('./testset.json');
let tp = 0, fn = 0, fp = 0, tn = 0;
for (const d of set) {
  const flagged = analyse(d.text, 'en').lv !== 'Low';
  if (d.scam && flagged) tp++; else if (d.scam) { fn++; console.log('MISS  ', d.text.slice(0, 70)); }
  else if (flagged) { fp++; console.log('FALSE+', d.text.slice(0, 70)); } else tn++;
}
const pct = x => Math.round(x * 100) + '%';
console.log({ tp, fn, fp, tn, precision: pct(tp / (tp + fp || 1)), recall: pct(tp / (tp + fn || 1)), accuracy: pct((tp + tn) / set.length), n: set.length });
