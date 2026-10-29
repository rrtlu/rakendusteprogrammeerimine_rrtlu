// 1. Päring ja ok-kontroll
async function loadUser(id) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

    // fetch ei viska 404 peale ise viga
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log(data.name, data.email);
  } catch (error) {
    console.log("Laadimine ebaõnnestus:", error.message);
  }
}

loadUser(1);    // õnnestub
loadUser(999);  // 404 → "HTTP 404"

// 2. JSON vs objekt
const json = '{"name":"Mari","age":22}';
console.log(typeof json);                 // "string"
console.log(typeof JSON.parse(json));     // "object"
console.log(JSON.parse(json).name);       // "Mari"
console.log(JSON.stringify({ a: 1 }));    // '{"a":1}'

// 3. Vigane JSON
try {
  JSON.parse("{vigane}");
} catch (error) {
  console.log("vigane JSON:", error.message);
}

// LEVINUD VIGA: response.ok kontrollimata jätmine
// 404 korral jõuab kood edasi ja json() viskab segase vea
// PARANDUS: if (!response.ok) throw new Error(...)