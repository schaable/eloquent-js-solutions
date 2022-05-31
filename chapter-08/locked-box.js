import { expect } from 'chai';

const box = {
  locked: true,
  unlock() {
    this.locked = false;
  },
  lock() {
    this.locked = true;
  },
  _content: [],
  get content() {
    if (this.locked) throw new Error('Locked!');
    return this._content;
  },
};

function withBoxUnlocked(body) {
  try {
    box.unlock();
    body();
  } finally {
    box.lock();
  }
}

// Test cases
withBoxUnlocked(() => box.content.push('gold piece'));
withBoxUnlocked(() => expect(box.content).to.have.ordered.members(['gold piece']));
expect(box.locked).to.be.true;
expect(() =>
  withBoxUnlocked(() => {
    throw new Error('Pirates on the horizon! Abort!');
  })
).to.throw('Pirates on the horizon! Abort!');
expect(box.locked).to.be.true;
