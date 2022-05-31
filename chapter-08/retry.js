import { expect } from 'chai';

class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure('Klunk');
  }
}

function reliableMultiply(a, b) {
  try {
    return primitiveMultiply(a, b);
  } catch (e) {
    if (e instanceof MultiplicatorUnitFailure) {
      return reliableMultiply(a, b);
    } else {
      throw e;
    }
  }
}

// Test cases
expect(reliableMultiply(8, 8)).to.equal(64);
expect(reliableMultiply(5, 4)).to.equal(20);
expect(reliableMultiply(3, 3)).to.equal(9);
expect(reliableMultiply(7, 4)).to.equal(28);
expect(reliableMultiply(5, 8)).to.equal(40);
expect(reliableMultiply(10, 9)).to.equal(90);
expect(reliableMultiply(-4, 4)).to.equal(-16);
expect(reliableMultiply(2.5, 3)).to.equal(7.5);
