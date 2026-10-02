'use strict';
// Scam red-flag engine. Pure function, no I/O, no storage.
var R=[
{w:30,re:/guarantee|assured|100\s*%\s*(safe|profit|sure)|risk[- ]?free|गारंटी|पक्का\s*(मुनाफ|रिटर्न)|रिस्क\s*फ्री/i,en:"Promises guaranteed or risk-free returns. No genuine market product can do this.",hi:"गारंटीशुदा या बिना जोखिम के मुनाफ़े का वादा। असली बाज़ार में ऐसा संभव नहीं।"},
{w:25,re:/\b\d{2,3}\s*%[^.\n]{0,25}(month|week|daily|day|monthly|महीन|हफ्त|रोज|दिन)|(month|week|daily|महीन|हफ्त|रोज)[^.\n]{0,25}\d{2,3}\s*%/i,en:"Claims a very high return in a short time (tens of % per month/week).",hi:"थोड़े समय में बहुत ज़्यादा रिटर्न (महीने/हफ़्ते में दसियों %) का दावा।"},
{w:20,re:/double|2x|दोगुना|डबल/i,en:"Promises to double your money.",hi:"पैसा दोगुना करने का वादा।"},
{w:15,re:/limited (seats|slots|time)|today only|last chance|hurry|act now|जल्दी|आज ही|सीमित|आखिरी मौका/i,en:"Creates urgency to make you act before thinking.",hi:"सोचने का समय न देकर जल्दबाज़ी कराने की कोशिश।"},
{w:15,re:/telegram|t\.me\/|join (our|my|the) (vip|group|channel)|vip group|ग्रुप\s*(जॉइन|में जुड़)|टेलीग्राम/i,en:"Pushes you into a private Telegram/WhatsApp 'VIP' group, a common pump-and-dump route.",hi:"आपको निजी टेलीग्राम/WhatsApp 'VIP' ग्रुप में खींचना — पंप-एंड-डंप का आम तरीका।"},
{w:25,re:/(send|pay|transfer|deposit)[^.\n]{0,30}(upi|paytm|gpay|phonepe|account)|@(ybl|oksbi|okhdfcbank|paytm|axl|ibl)|\bUPI\b[^.\n]{0,15}[a-z0-9.]+@|पर\s*(पैसे|रकम)\s*भेज|ट्रांसफर\s*करें/i,en:"Asks you to pay into a personal UPI ID or account instead of a regulated broker platform.",hi:"नियमित ब्रोकर के बजाय निजी UPI/खाते में पैसे भेजने को कहना।"},
{w:30,re:/anydesk|teamviewer|quicksupport|rustdesk/i,en:"Asks you to install a remote-access app. Genuine firms never need this.",hi:"रिमोट-एक्सेस ऐप इंस्टॉल करने को कहना। असली कंपनियाँ ऐसा नहीं कहतीं।"},
{w:15,re:/sure[- ]?shot|insider|operator|jackpot|multibagger|ऑपरेटर|जैकपॉट|सुरेशॉट/i,en:"Uses 'sure-shot / insider / operator' tip language.",hi:"'सुरेशॉट / इनसाइडर / ऑपरेटर' जैसी टिप वाली भाषा।"},
{w:20,re:/(bit\.ly|tinyurl|cutt\.ly|wa\.me)\/|https?:\/\/[^\s]*\.(xyz|top|vip|click|site|online|buzz)\b|https?:\/\/[^\s]*(sebi|nse|bse|zerodha|upstox|groww)[^\s]*-[^\s]*/i,en:"Contains a shortened or lookalike link that could imitate an official site.",hi:"छोटा या नकली-जैसा लिंक जो किसी आधिकारिक साइट की नक़ल हो सकता है।"}];
function analyse(x,L){var s=0,f=[];x=x.replace(/\b(not|no|never)\s+(be\s+)?guarantee\w*/gi,"");R.forEach(function(r){if(r.re.test(x)){s+=r.w;f.push(r[L])}});
 var claim=/sebi\s*(registered|approved|certified)|सेबी\s*(पंजीकृत|रजिस्टर|मान्य)/i.test(x);
 if(claim){var ok=/\bIN[ZHAPMB]\d{9}\b/i.test(x);
  if(!ok){s+=20;f.push(L=="hi"?"'SEBI पंजीकृत' बताया पर सही फ़ॉर्मेट का पंजीकरण नंबर (जैसे INH + 9 अंक) नहीं दिया।":"Claims to be 'SEBI registered' but gives no registration number in a valid format (e.g. INH + 9 digits).")}
  else f.push(L=="hi"?"पंजीकरण नंबर दिया गया है — सिर्फ़ फ़ॉर्मेट सही दिखता है; असली है या नहीं, SEBI साइट पर खुद जाँचें।":"A registration number is given and its format looks valid; confirm it on SEBI's site, the format alone proves nothing.")}
 s=Math.min(s,100);return{s:s,f:f,lv:s>=55?"High":s>=25?"Medium":"Low"}}

module.exports={analyse:analyse};
