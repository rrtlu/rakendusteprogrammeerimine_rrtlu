// 1. Objekti destructuring
const user = { id: 1, name: "Mari", age: 22 };
const { name, age } = user;
console.log(name, age);        // "Mari" 22

// 2. Massiivi destructuring
const [first, second] = ["a", "b"];
console.log(first, second);    // "a" "b"

// 3. Massiivi kopeerimine ja lisamine
const nums = [1, 2, 3];
const more = [...nums, 4];
console.log(more);             // [1, 2, 3, 4]
console.log(nums);             // [1, 2, 3] – originaal puutumata

// 4. Objekti kopeerimine uuendatud omadusega
const updated = { ...user, age: 23 };
console.log(updated.age, user.age); // 23 22

// 5. const objekti saab siiski muuta
const mutable = { a: 1 };
mutable.a = 2;                 // OK – const hoiab viidet, mitte sisu
console.log(mutable.a);        // 2

// 6. Spread on MADAL koopia
const original = { address: { city: "Tallinn" } };
const copy = { ...original };
copy.address.city = "Tartu";
console.log(original.address.city); // "Tartu" – pesastatud objekt on jagatud

// LEVINUD VIGA: arvatakse, et spread kopeerib sügavalt
// PARANDUS: structuredClone(original) või käsitsi pesastatud kopeerimine