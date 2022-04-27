import { expect } from 'chai';

class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(vector) {
    return new Vec(this.x + vector.x, this.y + vector.y);
  }

  minus(vector) {
    return new Vec(this.x - vector.x, this.y - vector.y);
  }

  get length() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }
}

// Test cases
expect(Vec).to.be.a('function');

const vector1 = new Vec(1, 5);
expect(vector1).to.be.instanceof(Vec);
expect(vector1).to.respondTo('plus');
expect(vector1).to.respondTo('minus');
expect(vector1).to.have.property('x', 1);
expect(vector1).to.have.property('y', 5);
expect(vector1).to.have.property('length', Math.sqrt(26));

const vector2 = vector1.plus(new Vec(3, -2));
expect(vector2).to.be.instanceof(Vec);
expect(vector2).to.respondTo('plus');
expect(vector2).to.respondTo('minus');
expect(vector2).to.have.property('x', 4);
expect(vector2).to.have.property('y', 3);
expect(vector2).to.have.property('length', 5);

const vector3 = vector1.minus(new Vec(-1, 0));
expect(vector3).to.be.instanceof(Vec);
expect(vector3).to.respondTo('plus');
expect(vector3).to.respondTo('minus');
expect(vector3).to.have.property('x', 2);
expect(vector3).to.have.property('y', 5);
expect(vector3).to.have.property('length', Math.sqrt(29));

expect(new Vec(0, 0)).to.have.property('length', 0);
expect(new Vec(-1, -1)).to.have.property('length', Math.sqrt(2));
