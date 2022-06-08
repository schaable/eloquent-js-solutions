import { expect } from 'chai';
import { anyStorage } from './async.js';
import { bigOak } from './crow-tech.js';

async function locateScalpel(nest) {
  let previousScalpelLocation = '';
  let scalpelLocation = nest.name;

  while (scalpelLocation !== previousScalpelLocation) {
    previousScalpelLocation = scalpelLocation;
    scalpelLocation = await anyStorage(nest, scalpelLocation, 'scalpel');
  }

  return scalpelLocation;
}

function locateScalpel2(nest) {
  function find(scalpelLocation, previousScalpelLocation) {
    if (scalpelLocation === previousScalpelLocation) {
      return scalpelLocation;
    }

    return anyStorage(nest, scalpelLocation, 'scalpel').then((newScalpelLocation) =>
      find(newScalpelLocation, scalpelLocation)
    );
  }

  return find(nest.name);
}

// Test cases
locateScalpel(bigOak).then((scalpelLocation) => {
  expect(scalpelLocation).to.equal('Butcher Shop');
});

locateScalpel2(bigOak).then((scalpelLocation) => {
  expect(scalpelLocation).to.equal('Butcher Shop');
});
