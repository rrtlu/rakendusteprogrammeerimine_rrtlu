// 1. Objekti loomine
const profile = {
  name: "Mari",
  age: 22,
  address: { city: "Tallinn" }
};

// 2. Lugemine punkt- ja nurksulgudega
console.log(profile.name);
console.log(profile["name"]);

// 3. Lisamine ja uuendamine
profile.email = "mari@example.com";
profile.age = 23;
console.log(profile.age, profile.email);

// 4. Pesastatud objekt
console.log(profile.address.city);

// 5. Puuduv omadus
const noAddress = { name: "Jüri" };
console.log(noAddress.address);                        // undefined
// console.log(noAddress.address.city);                // TypeError
console.log(noAddress.address?.city);                  // undefined – turvaline
console.log(noAddress.address?.city ?? "Linn puudub"); // "Linn puudub"

// 6. ?? vs ||
console.log(0 || "vaikeväärtus");  // "vaikeväärtus" – 0 on falsy
console.log(0 ?? "vaikeväärtus");  // 0 – ?? hoiab 0 alles
console.log("" ?? "vaikeväärtus"); // ""

// LEVINUD VIGA: pesastatud omaduse lugemine ilma ?.
// PARANDUS: user.address?.city ?? "Linn puudub"