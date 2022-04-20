import { expect } from 'chai';

function flatten(array) {
  return array.reduce((acc, elem) => acc.concat(elem), []);
}

// Test cases
expect(flatten([1, 2, 3, [4], 5, [], 6])).to.have.ordered.members([1, 2, 3, 4, 5, 6]);
expect(flatten([[], 1])).to.have.ordered.members([1]);
expect(flatten([])).to.have.ordered.members([]);
expect(flatten([[]])).to.have.ordered.members([]);
expect(flatten([1, 2, 3, [4, 5, 6]])).to.have.ordered.members([1, 2, 3, 4, 5, 6]);
