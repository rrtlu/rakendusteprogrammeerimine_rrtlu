// 1. Deklareerimine, omistamine ja uuesti omistamine
let count = 1;
count = 2;                  // OK – let'i saab uuesti omistada
const name = "Mari";
// name = "Kati";           // VIGA: Assignment to constant variable
console.log(count, name);   // 2 "Mari"

// 2. Miks vana kood kasutab var-i
var legacy = "vana kood";   // var on funktsiooniskopeeritud
console.log(legacy);

// 3. Plokiskopeeritus
{
  let inside = "ainult plokis";
  var leaks = "põgeneb plokist";
  console.log(inside);      // OK – ploki sees
}
console.log(leaks);         // OK – var ei tunne plokiskopeeritust
// console.log(inside);     // ReferenceError – let on plokis kinni

// 4. Millal kumba
const MAX_ITEMS = 10;       // const, kui väärtus ei muutu
let counter = 0;            // let, kui väärtus muutub
counter += 1;
console.log(counter, MAX_ITEMS);

// LEVINUD VIGA: const-i uuesti omistamine
// const x = 1; x = 2;  → TypeError
// PARANDUS: kasuta let-i või kirjuta uus const.