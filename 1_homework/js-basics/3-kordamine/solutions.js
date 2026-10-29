const users = [
  { id: 1, name: "Mari", age: 22, active: true },
  { id: 2, name: "Jüri", age: 17, active: false },
  { id: 3, name: "Kati", age: 31, active: true },
  { id: 4, name: "Martin", age: 19, active: false },
  { id: 5, name: "Laura", age: 26, active: true }
];

// ---------------------------------------------------------------
// 3.1 Kuva kõikide kasutajate nimed
// forEach käib iga elemendi kohta läbi; user on jooksev objekt,
// .name võtab nimivälja ja console.log trükib selle.
// forEach ei tagasta uut massiivi.
// ---------------------------------------------------------------
console.log("3.1:");
users.forEach(user => console.log(user.name));

// ---------------------------------------------------------------
// 3.2 Leia kõik aktiivsed kasutajad
// filter jätab alles need elemendid, mille puhul callback tagastab true.
// user.active on juba tõeväärtus. Tulemus on uus massiiv,
// users jääb muutumatuks.
// ---------------------------------------------------------------
const activeUsers = users.filter(user => user.active);
console.log("3.2:", activeUsers.map(u => u.name)); // ["Mari", "Kati", "Laura"]

// ---------------------------------------------------------------
// 3.3 Leia kõik vähemalt 18-aastased
// Sama filter-loogika, tingimus age >= 18 (18 kaasa arvatud).
// Jüri (17) jääb välja, Martin (19) jääb sisse.
// ---------------------------------------------------------------
const adults = users.filter(user => user.age >= 18);
console.log("3.3:", adults.map(u => u.name));

// ---------------------------------------------------------------
// 3.4 Uus massiiv ainult nimedest
// map teisendab iga elemendi uueks väärtuseks ja tagastab
// sama pikkusega uue massiivi. Siin objekt → nimestring.
// ---------------------------------------------------------------
const names = users.map(user => user.name);
console.log("3.4:", names);

// ---------------------------------------------------------------
// 3.5 Leia kasutaja id-ga 3
// find tagastab ESIMESE vastava elemendi ja katkeb seal.
// Tulemus on terve objekt, mitte massiiv. Kui ei leita → undefined.
// ---------------------------------------------------------------
const userById = users.find(user => user.id === 3);
console.log("3.5:", userById);

// ---------------------------------------------------------------
// 3.6 Tavaline funktsioon, mis tagastab staatuse stringi
// Ternaarne operaator valib kahe stringi vahel user.active põhjal.
// return annab tulemuse välja.
// ---------------------------------------------------------------
function getUserStatus(user) {
  return user.active ? "Aktiivne" : "Mitteaktiivne";
}
console.log("3.6:", getUserStatus(users[0])); // "Aktiivne"
console.log("3.6:", getUserStatus(users[1])); // "Mitteaktiivne"

// ---------------------------------------------------------------
// 3.7 Noolfunktsioon template literal'iga
// Ühe parameetri puhul pole sulge vaja; avaldis pärast noolt on
// implicit return. ${} asendab muutuja stringi sisse.
// ---------------------------------------------------------------
const getGreeting = user => `Tere, ${user.name}! Sa oled ${user.age} aastat vana.`;
console.log("3.7:", getGreeting(users[2]));

// ---------------------------------------------------------------
// 3.8 Destructuring
// Vasakul on objektimuster: loetletud nimedega võetakse objektist
// vastavad omadused. Tulemuseks on kaks eraldi muutujat.
// ---------------------------------------------------------------
const { name, age } = users[0];
console.log("3.8:", name, age); // "Mari" 22

// ---------------------------------------------------------------
// 3.9 Uus kasutaja ilma originaali muutmata
// [...users, newUser] laotab vanad elemendid uude massiivi ja
// lisab lõppu uue. push muudaks users massiivi, spread mitte.
// ---------------------------------------------------------------
const newUser = { id: 6, name: "Karl", age: 24, active: true };
const usersWithNew = [...users, newUser];
console.log("3.9:", users.length, usersWithNew.length); // 5 6

// ---------------------------------------------------------------
// 3.10 Valikuline address ja turvaline lugemine
// Spread kopeerib Mari objekti ja lisab address omaduse.
// ?. lõikab ahela katki, kui address on undefined.
// ?? annab parema poole, kui vasak on null/undefined.
// ---------------------------------------------------------------
const userWithAddress = { ...users[0], address: { city: "Tallinn" } };
console.log("3.10:", userWithAddress.address?.city);        // "Tallinn"
console.log("3.10:", users[1].address?.city ?? "Linn puudub"); // "Linn puudub"

// ---------------------------------------------------------------
// 3.11 forEach + staatus
// Käime kõik kasutajad läbi ja kutsume igaühe jaoks getUserStatus.
// Template literal ühendab nime ja staatuse kriipsuga.
// ---------------------------------------------------------------
console.log("3.11:");
users.forEach(user => {
  console.log(`${user.name} – ${getUserStatus(user)}`);
});

// ---------------------------------------------------------------
// 3.12 Sorteeri noorimast vanimani
// [...users] teeb koopia, sest sort muudab massiivi kohapeal.
// Võrdlusfunktsioon: negatiivne → a ette, positiivne → b ette.
// ---------------------------------------------------------------
const sortedByAge = [...users].sort((a, b) => a.age - b.age);
console.log("3.12:", sortedByAge.map(u => `${u.name} (${u.age})`));
console.log("originaal jäi samaks:", users.map(u => u.age));