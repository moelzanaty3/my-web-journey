// © Mohammed Elzanaty - 11 Oct 2021

/* 🏅 push 🏅 */
const animals = ["🐈", "🐮", "🐔"];

animals.push("🐴");

console.log(animals); //👉🏻 ["🐈", "🐮", "🐔", "🐴"]

/* 🏅 pop 🏅 */
// animals array now 👉🏻 ["🐈", "🐮", "🐔", "🐴"]
const popped = animals.pop();
console.log(popped); //👉🏻 "🐴"

/* 🏅 fill 🏅 */
// animals array now 👉🏻 ["🐈", "🐮", "🐔"]

animals.fill("🐶"); //👉🏻  ["🐶", "🐶", "🐶"]
// fill with "🐶" from position 2 until position 3
animals.fill("🐶", 2, 3); //👉🏻 ["🐈", "🐮", "🐶"]
// fill with "🐶" from position 1;
animals.fill("🐶", 1); //👉🏻 ["🐈", "🐶", "🐶"]
