// 1. Miks asünkroonsust vaja on
console.log("1 – algus");

// 2. Promise ja selle seisundid
const wait = (ms, value) =>
  new Promise(resolve => setTimeout(() => resolve(value), ms));

const p = wait(100, "valmis");
console.log(p); // Promise { <pending> }
p.then(v => console.log("then:", v));

// 3. async/await
async function run() {
  const result = await wait(100, "pärast ootamist");
  console.log(result);
}
run();

// 4. async funktsioon tagastab alati promise'i
console.log(run()); // Promise { <pending> }

// 5. Vigade käsitlemine
async function failing() {
  try {
    await Promise.reject(new Error("Midagi läks valesti"));
  } catch (error) {
    console.log("viga:", error.message);
  }
}
failing();

// 6. Paralleelsus
async function parallel() {
  const [a, b] = await Promise.all([wait(50, "A"), wait(50, "B")]);
  console.log("paralleelselt:", a, b);
}
parallel();

console.log("2 – see jookseb enne async-tulemusi");

// LEVINUD VIGA: await ununeb ära
// const v = wait(100, "x");  → v on Promise, mitte "x"
// PARANDUS: const v = await wait(100, "x")