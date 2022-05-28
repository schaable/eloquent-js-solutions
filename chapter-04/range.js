import { expect } from 'chai';

function range(a, b, step = 1) {
  const result = [];
  for (let i = a; a < b ? i <= b : i >= b; i += step) {
    result.push(i);
  }

  return result;
}

function sum(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

// Test cases
expect(range(1, 10)).to.have.ordered.members([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
expect(range(5, 2, -1)).to.have.ordered.members([5, 4, 3, 2]);
expect(range(-10, 2, 3)).to.have.ordered.members([-10, -7, -4, -1, 2]);
expect(range(6, -3, -2)).to.have.ordered.members([6, 4, 2, 0, -2]);
expect(sum(range(1, 10))).to.equal(55);
expect(sum(range(-10, 2, 3))).to.equal(-20);
