import { expect } from 'chai';

function countBs(str) {
  return countChar(str, 'B');
}

function countChar(str, char) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) {
      count++;
    }
  }

  return count;
}

// Test cases
expect(countBs('BBC')).to.equal(2);
expect(countChar('BBC', 'B')).to.equal(2);
expect(countChar('kakkerlak', 'k')).to.equal(4);
expect(countChar('kaKKerlak', 'k')).to.equal(2);
expect(countChar('foobar', 'j')).to.equal(0);
