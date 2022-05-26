import { expect } from 'chai';

class PGroup {
  static empty = new PGroup();
  #group;

  constructor(keys) {
    this.#group = {};
    if (Array.isArray(keys)) {
      keys.forEach((key) => (this.#group[key] = true));
    }
  }

  get #keys() {
    return Reflect.ownKeys(this.#group);
  }

  #keyFor(value) {
    const stringifiedValue = typeof value !== 'function' ? JSON.stringify(value) : value.toString();
    return Symbol.for(stringifiedValue);
  }

  add(value) {
    return new PGroup([...this.#keys, this.#keyFor(value)]);
  }

  delete(value) {
    return new PGroup(this.#keys.filter((key) => key !== this.#keyFor(value)));
  }

  has(value) {
    return !!this.#group[this.#keyFor(value)];
  }

  get length() {
    return this.#keys.length;
  }
}

// Test cases
expect(PGroup).to.be.a('function');
expect(PGroup).itself.to.not.respondTo('add');
expect(PGroup).itself.to.not.respondTo('delete');
expect(PGroup).itself.to.not.respondTo('has');
expect(PGroup).itself.to.have.property('empty');

const group = PGroup.empty;
expect(group).to.be.instanceof(PGroup);
expect(group).to.respondTo('add');
expect(group).to.respondTo('delete');
expect(group).to.respondTo('has');
expect(group).to.not.have.property('empty');
expect(group.length).to.equal(0);

const group2 = group.add(1);
expect(group.has(1)).to.be.false;
expect(group.length).to.equal(0);
expect(group2.has(1)).to.be.true;
expect(group2.length).to.equal(1);

const group3 = group2.delete(1);
expect(group2.has(1)).to.be.true;
expect(group2.length).to.equal(1);
expect(group3.has(1)).to.be.false;
expect(group3.length).to.equal(0);
