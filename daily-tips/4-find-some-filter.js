// © Mohammed Elzanaty - 19 Oct 2021

/* 🏅 Find 🏅 */
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

const found = numbers.find(number => number > 5)
console.log(found); //Output 👉🏻 6

/* 🏅 Some 🏅 */
const even = numbers.some(number => number % 2 === 0)
console.log(even); //Output 👉🏻  true

const hasNumbersGreaterThan10 = numbers.some(number => number > 10)
console.log(hasNumbersGreaterThan10); //Output 👉🏻  false

/* 🏅 Filter 🏅 */
const oddNumbersFiltered = numbers.filter(number => number % 2 !== 0)
console.log(oddNumbersFiltered); //Output 👉🏻  [1, 3, 5, 7]
