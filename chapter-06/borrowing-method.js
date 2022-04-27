import { expect } from 'chai';

const map = { foo: 'bar', hasOwnProperty: () => 'baz' };

// Test cases
expect(map.hasOwnProperty('foo')).to.equal('baz');
expect(Object.hasOwnProperty.call(map, 'foo')).to.be.true;
expect(Object.hasOwnProperty.call(map, 'hasOwnProperty')).to.be.true;
