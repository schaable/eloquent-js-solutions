import { expect } from 'chai';
import { parse } from './language.js';

// skipSpace was replaced in language.js
// left here only for reference
function skipSpace(string) {
  let match = string.match(/^(\s|#.*\n)*/);
  if (!match) return '';
  return string.slice(match[0].length);
}

expect(parse('# hello\nx')).to.deep.equal({ type: 'word', name: 'x' });
expect(parse('a # one\n   # two\n()')).to.deep.equal({
  type: 'apply',
  operator: { type: 'word', name: 'a' },
  args: [],
});
