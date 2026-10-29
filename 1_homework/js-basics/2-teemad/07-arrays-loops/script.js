// 1. Loomine ja indekseerimine
const names = ["Mari", "Jüri", "Kati"];
console.log(names[0]);        // "Mari" – indeks algab 0-st
console.log(names.length);    // 3
console.log(names[names.length - 1]); // "Kati" – viimane

// 2. Otsimine ja muutmine
console.log(names.includes("Jüri")); // true

names.push("Laura");          // lisab lõppu – MUUDAB originaali
console.log(names.length);    // 4
console.log(names.pop());     // "Laura" – eemaldab lõpust

// 3. for-tsükkel: algväärtus, tingimus, samm
for (let i = 0; i < names.length; i++) {
  console.log(i, names[i]);
}

// 4. for...of – lihtsam lugemiseks
for (const n of names) {
  console.log(n);
}

// 5. break
for (const n of names) {
  if (n === "Kati") break;
  console.log("enne Katit:", n);
}

// LEVINUD VIGA: i <= names.length annab lõpus undefined
// PARANDUS: i < names.length