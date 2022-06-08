import { expect } from 'chai';

function Promise_all(promises) {
  return new Promise((resolve, reject) => {
    let pendingPromises = promises.length;

    if (pendingPromises === 0) {
      resolve([]);
    }

    const responses = Array.from({ length: pendingPromises });
    promises.map((promise, i) =>
      promise.then((result) => {
        responses[i] = result;
        pendingPromises -= 1;
        if (pendingPromises === 0) {
          resolve(responses);
        }
      }, reject)
    );
  });
}

// Test cases
Promise_all([]).then((array) => {
  expect(array).to.have.ordered.members([]);
});

function soon(val) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(val), Math.random() * 500);
  });
}

Promise_all([soon(1), soon(2), soon(3)]).then((array) => {
  expect(array).to.have.ordered.members([1, 2, 3]);
});

Promise_all([soon(1), Promise.reject('X'), soon(3)]).catch((e) => {
  expect(e).to.equal('X');
});
