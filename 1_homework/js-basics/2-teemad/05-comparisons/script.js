// 1. Võrdlusoperaatorid
console.log(5 === 5);   // true  – range võrdlus
console.log(5 !== 5);   // false
console.log(5 === "5"); // false – eri tüübid
console.log(5 == "5");  // true  – lõtv, teisendab
console.log(7 > 3);     // true
console.log(7 <= 3);    // false

// 2. Loogikaoperatsioonid
console.log(true && false); // false
console.log(true || false); // true
console.log(!true);         // false

// 3. Truthy ja falsy
console.log(Boolean(""));        // false
console.log(Boolean(0));         // false
console.log(Boolean(null));      // false
console.log(Boolean("tere"));    // true

// 4. if / else if / else
const age = 17;
const loggedIn = true;

if (age >= 18 && loggedIn) {
  console.log("Täiskasvanud ja sisse logitud");
} else if (age < 18 && loggedIn) {
  console.log("Alaealine, aga sisse logitud");
} else {
  console.log("Külaline");
}

// 5. Ternaarne operaator
console.log(loggedIn ? "Tere tagasi!" : "Palun logi sisse");

// LEVINUD VIGA: == kasutamine
// "0" == 0 → true, aga tüübid erinevad
// PARANDUS: kasuta alati ===