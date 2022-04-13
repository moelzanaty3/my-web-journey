// © Mohammed Elzanaty - 4 Oct 2021

// The slice() method returns a shallow copy of a portion of an array into a new array 
// The original array will not be modified.

const array = ["🐈", "🐮", "🐔", "🐴", "🐸", "🦜", "🐶"]

// A positive index can be used, indicating an offset from the beginning of the sequence. 
// slice(2) extracts the first two elements in the sequence.
array.slice(1) //=> ['🐮', '🐔', '🐴', '🐸', '🦜', '🐶']
array.slice(2) //=> ['🐔', '🐴', '🐸', '🦜', '🐶']
// A negative index can be used, indicating an offset from the end of the sequence. 
// slice(-2) extracts the last two elements in the sequence.
array.slice(-1) //=> ['🐶']
array.slice(-2) //=> ['🦜', '🐶']
// slice(start, end)
// start => Zero-based index at which to start extraction.
// end   => Zero-based index before which to end extraction. slice extracts up to but not including end. 
array.slice(1, 3) //=>  ['🐮', '🐔']