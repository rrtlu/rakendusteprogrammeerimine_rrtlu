// 1. Aritmeetika
console.log(2 + 3);    // 5
console.log(10 - 4);   // 6
console.log(3 * 4);    // 12
console.log(12 / 3);   // 4
console.log(10 % 3);   // 1  – jääk
console.log(2 ** 3);   // 8  – astendamine

// 2. Väärtuse uuendamine
let total = 5;
total += 3;            // total = total + 3
total++;               // total = total + 1
console.log(total);    // 9

// 3. Teisendamine
console.log("5" + 2);           // "52" – + kleebib stringi
console.log(Number("5") + 2);   // 7    – teadlik teisendus
console.log(String(42));        // "42"

// 4. NaN
console.log(Number("abc"));         // NaN – "not a number"
console.log(NaN === NaN);           // false – NaN pole iseendaga võrdne
console.log(Number.isNaN(Number("abc"))); // true – õige kontroll

// LEVINUD VIGA: sisendi teisendamata jätmine
// const sum = "5" + 2;  → "52"
// PARANDUS: Number(input) enne arvutust