// 1. Primitiivid ja objektid
const text = "5";      // string
const number = 5;      // number
const flag = true;     // boolean
const obj = {};        // object
const arr = [];        // massiiv (ka object)

// 2. Tüübi kontroll
console.log(typeof text);       // "string"
console.log(typeof number);     // "number"
console.log(typeof flag);       // "boolean"
console.log(typeof obj);        // "object"
console.log(typeof undefined);  // "undefined"

// 3. Kaks veidrust
console.log(typeof null);       // "object"  <- ajalooline viga
console.log(typeof arr);        // "object"  <- massiiv pole oma tüüp
console.log(Array.isArray(arr)); // true – õige viis massiivi tuvastada

// 4. null vs undefined
let notSet;             // undefined – väärtust pole veel antud
let empty = null;       // null – teadlikult tühi
console.log(notSet, empty);

// 5. "5" vs 5
console.log("5" === 5);         // false – eri tüübid
console.log("5" == 5);          // true  – lõtv võrdlus teisendab

// LEVINUD VIGA: typeof-ga massiivi kontroll
// if (typeof arr === "object") → tõene ka objektide puhul
// PARANDUS: Array.isArray(arr)