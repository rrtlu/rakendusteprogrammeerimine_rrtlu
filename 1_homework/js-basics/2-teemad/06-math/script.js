// 1. Ümardamine
console.log(Math.round(4.6)); // 5 – lähim täisarv
console.log(Math.floor(4.9)); // 4 – alla
console.log(Math.ceil(4.1));  // 5 – üles

// 2. Miinimum ja maksimum
console.log(Math.min(3, 8, 1)); // 1
console.log(Math.max(3, 8, 1)); // 8

// 3. Math.random() annab 0 <= x < 1
console.log(Math.random());

// 4. Juhuslik täisarv 1–6
const die = Math.floor(Math.random() * 6) + 1;
console.log(die);

// 5. Juhuslik täisarv vahemikus
function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log(randomBetween(1, 100));

// LEVINUD VIGA: Math.random() * 6 annab 0–5, mitte 1–6
// PARANDUS: + 1 lõppu