import { expect } from 'chai';
import { specialForms, evaluate, run } from './language.js';

specialForms.set = (args, localScope) => {
  if (args.length != 2 || args[0].type != 'word') {
    throw new SyntaxError('Incorrect use of set');
  }

  let scope = localScope;
  while (scope !== null && !Object.prototype.hasOwnProperty.call(scope, args[0].name)) {
    scope = Object.getPrototypeOf(scope);
  }

  if (scope === null) {
    throw new ReferenceError(`${args[0].name} is not defined`);
  }

  let value = evaluate(args[1], localScope);
  scope[args[0].name] = value;
  return value;
};

const program = `
do(define(x, 4),
   define(setx, fun(val, set(x, val))),
   setx(50),
   print(x))
`;
expect(run(program)).to.equal(50);
expect(() => run(`set(quux, true)`)).to.throw('quux is not defined');
