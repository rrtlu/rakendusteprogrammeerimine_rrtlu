const products = [
  { name: "Klaviatuur", price: 45 },
  { name: "Hiir", price: 19 },
  { name: "Monitor", price: 210 }
];

// 1. map – teisendab iga elemendi, tagastab uue sama pikkusega massiivi
const withVat = products.map(p => ({ ...p, price: p.price * 1.24 }));
console.log(withVat.map(p => p.price)); // [55.8, 23.56, 260.4]

// 2. filter – jätab alles tingimusele vastavad, tagastab uue massiivi
const cheap = products.filter(p => p.price < 50);
console.log(cheap.length);              // 2
console.log(cheap.map(p => p.name));    // ["Klaviatuur", "Hiir"]

// 3. find – esimene vastav element, tagastab objekti või undefined
const monitor = products.find(p => p.name === "Monitor");
console.log(monitor?.price);            // 210

// 4. Kui midagi ei leita
console.log(products.find(p => p.name === "Printer"));   // undefined
console.log(products.filter(p => p.name === "Printer")); // []

// 5. Originaal jääb muutumatuks
console.log(products.length);           // 3

// LEVINUD VIGA: find tulemuse kasutamine kontrollimata
// products.find(...).price  → TypeError kui undefined
// PARANDUS: products.find(...)?.price