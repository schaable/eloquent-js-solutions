import { expect } from 'chai';

function arrayToList(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return null;
  }

  const list = {
    value: arr[0],
    rest: null,
  };
  let prev = list;
  for (let i = 1; i < arr.length; i += 1) {
    let current = {
      value: arr[i],
      rest: null,
    };
    prev.rest = current;
    prev = current;
  }

  return list;
}

function listToArray(list) {
  if (Object.prototype.toString.call(list) !== '[object Object]') {
    return [];
  }

  const array = [];
  let current = list;
  while (current) {
    array.push(current.value);
    current = current.rest;
  }

  return array;
}

function prepend(element, list) {
  return {
    value: element,
    rest: list,
  };
}

function nth(list, index) {
  let current = list;
  while (current && index > 0) {
    current = current.rest;
    index -= 1;
  }
  return index === 0 && current ? current.value : undefined;
}

function nthRec(list, index) {
  if (list.rest === null && index !== 0) {
    return undefined;
  }
  if (index === 0) {
    return list.value;
  }

  return nth(list.rest, index - 1);
}

// Test cases
expect(arrayToList('not an array')).to.equal(null);
expect(arrayToList([])).to.equal(null);
expect(arrayToList([10])).to.deep.equal({ value: 10, rest: null });
expect(arrayToList([10, 20])).to.deep.equal({ value: 10, rest: { value: 20, rest: null } });

expect(listToArray('not a list')).to.have.ordered.members([]);
expect(listToArray(null)).to.have.ordered.members([]);
expect(listToArray({ value: 10, rest: null })).to.have.ordered.members([10]);
expect(listToArray({ value: 10, rest: { value: 20, rest: null } })).to.have.ordered.members([10, 20]);
expect(listToArray(arrayToList([10, 20, 30, 40, 50]))).to.have.ordered.members([10, 20, 30, 40, 50]);

expect(prepend(10, prepend(20, null))).to.deep.equal({ value: 10, rest: { value: 20, rest: null } });

expect(nth(arrayToList([10, 20, 30]), 0)).to.equal(10);
expect(nth(arrayToList([10, 20, 30]), 1)).to.equal(20);
expect(nth(arrayToList([10, 20, 30]), 2)).to.equal(30);
expect(nth(arrayToList([10, 20, 30]), -1)).to.equal(undefined);
expect(nth(arrayToList([10, 20, 30]), 3)).to.equal(undefined);

expect(nthRec(arrayToList([10, 20, 30]), 0)).to.equal(10);
expect(nthRec(arrayToList([10, 20, 30]), 1)).to.equal(20);
expect(nthRec(arrayToList([10, 20, 30]), 2)).to.equal(30);
expect(nthRec(arrayToList([10, 20, 30]), -1)).to.equal(undefined);
expect(nthRec(arrayToList([10, 20, 30]), 3)).to.equal(undefined);
