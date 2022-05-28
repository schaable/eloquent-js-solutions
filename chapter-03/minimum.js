import { expect } from 'chai';

function minimum(a, b) {
  return a < b ? a : b;
}

// Test cases
expect(minimum(1, 5)).to.equal(1);
expect(minimum(6, 7)).to.equal(6);
expect(minimum(3, 3)).to.equal(3);
expect(minimum(-8, 3)).to.equal(-8);
expect(minimum(-8, -10)).to.equal(-10);
expect(minimum(0, -2)).to.equal(-2);
expect(minimum(3, 0)).to.equal(0);
