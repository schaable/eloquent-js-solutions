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
}

// Test cases
expect(Group).to.be.a('function');
expect(Group).itself.to.respondTo('from');
expect(Group).itself.to.not.respondTo('add');
expect(Group).itself.to.not.respondTo('delete');
expect(Group).itself.to.not.respondTo('has');

const group = new Group();
expect(group).to.be.instanceof(Group);
expect(group).to.respondTo('add');
expect(group).to.respondTo('delete');
expect(group).to.respondTo('has');
expect(group).to.not.respondTo('from');

expect(group.length).to.equal(0);
group.add(1);
expect(group.has(1)).to.be.true;
expect(group.length).to.equal(1);
group.add(1);
expect(group.length).to.equal(1);
group.delete(1);
expect(group.has(1)).to.be.false;
expect(group.length).to.equal(0);
group.delete(1);
expect(group.has(1)).to.be.false;
expect(group.length).to.equal(0);

group.add(1);
group.add('1');
expect(group.has(1)).to.be.true;
expect(group.has('1')).to.be.true;
expect(group.length).to.equal(2);

group.add({ a: 1 });
expect(group.has({ a: 1 })).to.be.true;
expect(group.length).to.equal(3);
group.add({ a: 1 });
expect(group.has({ a: 1 })).to.be.true;
expect(group.length).to.equal(3);
group.delete({ a: 1 });
expect(group.has({ a: 1 })).to.be.false;
expect(group.length).to.equal(2);

group.add([1, 2, 3]);
expect(group.has([1, 2, 3])).to.be.true;
expect(group.length).to.equal(3);
group.add([1, 2, 3]);
expect(group.has([1, 2, 3])).to.be.true;
expect(group.length).to.equal(3);
group.delete([1, 2, 3]);
expect(group.has([1, 2, 3])).to.be.false;
expect(group.length).to.equal(2);

const function1 = () => {
  console.log('This is a function!');
};
const function2 = () => {
  console.log('This is another function!');
};
group.add(function1);
expect(group.has(function1)).to.be.true;
expect(group.length).to.equal(3);
group.add(function1);
expect(group.has(function1)).to.be.true;
expect(group.length).to.equal(3);
group.add(function2);
expect(group.has(function2)).to.be.true;
expect(group.length).to.equal(4);
group.delete(function1);
expect(group.has(function1)).to.be.false;
expect(group.length).to.equal(3);

const groupFromArray = Group.from([1, 2, 3]);
expect(groupFromArray).to.be.instanceof(Group);
expect(groupFromArray.has(1)).to.be.true;
expect(groupFromArray.has(2)).to.be.true;
expect(groupFromArray.has(3)).to.be.true;
expect(groupFromArray.has(4)).to.be.false;
