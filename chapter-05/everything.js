import { expect } from 'chai';

function everyLoop(array, predicateFn) {
  let result = true;

  for (let i = 0; i < array.length; i = i + 1) {
    result = result && predicateFn(array[i]);
  }

  return result;
}

// Test cases
expect(everyLoop([], (n) => n > 10)).to.be.true;
expect(everyLoop([1], (n) => n > 10)).to.be.false;
expect(everyLoop([11], (n) => n > 10)).to.be.true;
expect(everyLoop([11, 12, 13], (n) => n > 10)).to.be.true;
expect(everyLoop([11, -5, 13], (n) => n > 10)).to.be.false;
expect(everyLoop([11, 22, 13, 18, 45, 0], (n) => n > 10)).to.be.false;

function everySome(array, predicateFn) {
  return !array.some((elem) => !predicateFn(elem));
}

// Test cases
expect(everySome([], (n) => n > 10)).to.be.true;
expect(everySome([1], (n) => n > 10)).to.be.false;
expect(everySome([11], (n) => n > 10)).to.be.true;
expect(everySome([11, 12, 13], (n) => n > 10)).to.be.true;
expect(everySome([11, -5, 13], (n) => n > 10)).to.be.false;
expect(everySome([11, 22, 13, 18, 45, 0], (n) => n > 10)).to.be.false;
