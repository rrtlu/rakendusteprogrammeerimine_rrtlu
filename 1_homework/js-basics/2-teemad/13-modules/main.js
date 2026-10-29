// Vaikeeksport ilma sulgudeta, nimelised ekspordid sulgudes
import multiply, { add, PI } from "./math.js";

console.log(add(2, 3));      // 5
console.log(PI);             // 3.14
console.log(multiply(2, 3)); // 6

// LEVINUD VIGA: vale klambrite kasutus
// import { multiply } from "./math.js"  → undefined, sest see on default
// PARANDUS: import multiply from "./math.js"