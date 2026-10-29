// 1. Deklareerimine ja kutsumine
function greet(name) {
  return `Tere, ${name}!`;
}
console.log(greet("Mari"));   // "Tere, Mari!"

// 2. Parameeter vs argument
//    "name" on parameeter, "Mari" on argument

// 3. Vaikeväärtus
function greetDefault(name = "külaline") {
  return `Tere, ${name}!`;
}
console.log(greetDefault());  // "Tere, külaline!"

// 4. return vs console.log
function logOnly(x) {
  console.log(x);             // trükib, aga ei tagasta
}
const result = logOnly("ainult log"); // trükib "ainult log"
console.log(result);                   // undefined

// 5. Varajane return
function sign(n) {
  if (n < 0) return "negatiivne";
  if (n === 0) return "null";
  return "positiivne";
}
console.log(sign(-1), sign(0), sign(5));

// LEVINUD VIGA: return ununeb ära
// function double(x) { x * 2 }  → undefined
// PARANDUS: return x * 2