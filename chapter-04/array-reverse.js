import { expect } from 'chai';

function reverseArray(arr) {
  const result = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    result.push(arr[i]);
  }
  return result;
}

function reverseArrayInPlace(arr) {
  const mid = Math.floor(arr.length / 2);
  const length = arr.length - 1;
  for (let i = 0; i < mid; i++) {
    [arr[length - i], arr[i]] = [arr[i], arr[length - i]];
  }
  return arr;
}

// Test cases
expect(reverseArray(['A', 'B', 'C'])).to.have.ordered.members(['C', 'B', 'A']);
expect(reverseArray(['A'])).to.have.ordered.members(['A']);
expect(reverseArray(['A', 'B'])).to.have.ordered.members(['B', 'A']);
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
expect(arrayValue).to.have.ordered.members([5, 4, 3, 2, 1]);
expect(reverseArrayInPlace(['A', 'B', 'C'])).to.have.ordered.members(['C', 'B', 'A']);
expect(reverseArrayInPlace(['A'])).to.have.ordered.members(['A']);
expect(reverseArrayInPlace(['A', 'B'])).to.have.ordered.members(['B', 'A']);
