import { expect } from 'chai';

function loop(value, testFn, updateFn, bodyFn) {
  for (let i = value; testFn(i); i = updateFn(i)) {
    bodyFn(i);
  }
}

// Test cases
let powArr = [];
loop(
  1,
  (i) => i < 10,
  (i) => i + 1,
  (i) => powArr.push(i * i)
);
expect(powArr).to.have.ordered.members([1, 4, 9, 16, 25, 36, 49, 64, 81]);
