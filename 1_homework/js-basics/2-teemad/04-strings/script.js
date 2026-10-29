// 1. Kolm kirjaviisi
const single = 'üksikud jutumärgid';
const double = "kaksikud jutumärgid";
const template = `backtick ehk template literal`;
console.log(single, double, template);

// 2. Stringi meetodid
const raw = "  mari kadakas  ";
const clean = raw.trim().toLowerCase();
console.log(clean);                     // "mari kadakas"
console.log(clean.length);              // 12
console.log(clean.includes("kadakas")); // true

// 3. Väärtuse sisestamine
const first = clean.split(" ")[0];
const greeting = `Tere, ${first}!`;
console.log(greeting);                  // "Tere, mari!"

// 4. Mitmerealised stringid
const multi = `rida 1
rida 2`;
console.log(multi);

// LEVINUD VIGA: template literal tavaliste jutumärkidega
// "Tere, ${first}!"  → jääb literaliseks
// PARANDUS: kasuta backtick'e