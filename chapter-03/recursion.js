import { expect } from 'chai';

function isEven(n) {
  const absNum = Math.abs(n);
  if (absNum === 0) {
    return true;
  }
  if (absNum === 1) {
    return false;
  }
  return isEven(absNum - 2);
}

// Test cases
expect(isEven(0)).to.be.true;
expect(isEven(1)).to.be.false;
expect(isEven(5)).to.be.false;
expect(isEven(8)).to.be.true;
expect(isEven(50)).to.be.true;
expect(isEven(75)).to.be.false;
expect(isEven(-1)).to.be.false;
expect(isEven(-18)).to.be.true;
