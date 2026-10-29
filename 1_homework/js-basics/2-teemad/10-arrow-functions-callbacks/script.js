// 1. Funktsiooniavaldis
const square = function (x) {
  return x * x;
};
console.log(square(4)); // 16

// 2. Noolfunktsioon, implicit return
const double = x => x * 2;
console.log(double(4)); // 8

// 3. Noolfunktsioon plokiga, explicit return
const doubleBlock = x => {
  return x * 2;
};
console.log(doubleBlock(4)); // 8

// 4. Callback – funktsioon, mis antakse teisele funktsioonile
function runTwice(callback) {
  callback();
  callback();
}
runTwice(() => console.log("tere"));

// 5. Callback massiivimeetodis
["Mari", "Jüri"].forEach(name => console.log(name));

// LEVINUD VIGA: objektikirjega nool
// const f = x => { x * 2 };  → undefined
// PARANDUS: const f = x => x * 2  või  x => { return x * 2; }