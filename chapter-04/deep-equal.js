import { expect } from 'chai';

function isObject(val) {
  return Object.prototype.toString.call(val) === '[object Object]';
}

function deepEqual(val1, val2) {
  if (isObject(val1) && isObject(val2)) {
    const keys1 = Object.keys(val1);
    const keys2 = Object.keys(val2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let i = 0; i < keys1.length; i += 1) {
      const key = keys1[i];
      if (!deepEqual(val1[key], val2[key])) {
        return false;
      }
    }

    return true;
  } else {
    return val1 === val2;
  }
}

const obj = { here: { is: 'an' }, object: 2 };
expect(deepEqual(obj, obj)).to.be.true;
expect(deepEqual(obj, { here: 1, object: 2 })).to.be.false;
expect(deepEqual(obj, { here: { is: 'an' }, object: 2 })).to.be.true;
expect(deepEqual(obj, { here: { is: 'an' }, object: 2, foo: 'bar' })).to.be.false;
expect(deepEqual({ here: { is: 'an' }, object: 2, foo: 'bar' }, obj)).to.be.false;
expect(deepEqual(obj, null)).to.be.false;
expect(deepEqual('a string', 37)).to.be.false;
expect(deepEqual(undefined, null)).to.be.false;
expect(deepEqual(true, false)).to.be.false;
expect(deepEqual(41, 41)).to.be.true;
expect(deepEqual('another string', 'another string')).to.be.true;
expect(deepEqual(undefined, undefined)).to.be.true;
expect(deepEqual(null, null)).to.be.true;
expect(deepEqual(true, true)).to.be.true;
