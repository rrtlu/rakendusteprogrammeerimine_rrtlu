// Topic 1: plain Node.js. No document, no window, no server.
import process from 'node:process';
import { seedTasks } from './data/tasks.js';

const name = process.argv[2] ?? 'student';

console.log(`Hello, ${name}.`);
console.log(`Running on Node.js ${process.version}, platform ${process.platform}.`);
console.log('Is there a document object?', typeof document);
console.log('Tasks:');

for (const task of seedTasks) {
  console.log(`  #${task.id} ${task.title} — ${task.completed ? 'done' : 'open'}`);
}
