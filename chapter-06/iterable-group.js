import { expect } from 'chai';

class Group {
  static from(iterable) {
    const group = new Group();
    iterable.forEach((value) => group.add(value));
    return group;
  }

  group = {};

  #keyFor(value) {
    return typeof value !== 'function' ? JSON.stringify(value) : value.toString();
  }

  #valueFromSymbol(symbol) {
    return isValidJSON(symbol.description)
      ? JSON.parse(symbol.description)
      : new Function(`return ${symbol.description}`)();
  }

  add(value) {
    this.group[Symbol.for(this.#keyFor(value))] = true;
  }

  delete(value) {
    delete this.group[Symbol.for(this.#keyFor(value))];
  }

  has(value) {
    return !!this.group[Symbol.for(this.#keyFor(value))];
  }

  get length() {
    return Reflect.ownKeys(this.group).length;
  }

  [Symbol.iterator]() {
    let index = 0;

    return {
      next: () => {
        if (index === this.length) {
          return {
            done: true,
          };
        } else {
          return {
            done: false,
            value: this.#valueFromSymbol(Reflect.ownKeys(this.group)[index++]),
          };
        }
      },
    };
  }
}

/* Helper functions */
const isValidJSON = (string) => {
  try {
    JSON.parse(string);
  } catch (e) {
    return false;
  }
  return true;
};

// Test cases
expect([...Group.from([1, 2, 3])]).to.have.ordered.members([1, 2, 3]);
expect([...Group.from(['a', 2, { c: 3 }])]).to.have.deep.ordered.members(['a', 2, { c: 3 }]);
const groupWithFn = Group.from(['a', () => 1, () => 2]);
expect([...groupWithFn]).to.have.lengthOf(3);
expect([...groupWithFn][0]).to.equal('a');
expect([...groupWithFn][1].toString()).to.equal('() => 1');
expect([...groupWithFn][2].toString()).to.equal('() => 2');
