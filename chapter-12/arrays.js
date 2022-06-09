import { expect } from 'chai';
import { topScope, run } from './language.js';

topScope.array = (...values) => values;

topScope.length = (array) => array.length;

topScope.element = (array, n) => array[n];

const program = `
do(define(sum, fun(array,
     do(define(i, 0),
        define(sum, 0),
        while(<(i, length(array)),
          do(define(sum, +(sum, element(array, i))),
             define(i, +(i, 1)))),
        sum))),
   print(sum(array(1, 2, 3))))
`;
expect(run(program)).to.equal(6); // print also returns the printed value
