// Fill in this regular expression.
// ([+-]?\d+)? - Match +|- between 0 and 1 times and one or more digits. The whole group can happen between 0 and 1 times
// (\.\d+|\d+\.)? - Match a . followed by one or more digits, or one or more digits followed by a dot
// (\d+[eE][+-]?\d+)? - Match one or more digits followed by e|E followed by +|- between 0 and 1 times and one or more digits
let number = /^([+-]?\d+)?(\.\d+|\d+\.)?(\d+[eE][+-]?\d+)?$/;

// Tests:
for (let str of ['1', '-1', '+15', '1.55', '.5', '5.', '1.3e2', '1E-4', '1e+12']) {
  if (!number.test(str)) {
    console.log(`Failed to match '${str}'`);
  }
}
for (let str of ['1a', '+-1', '1.2.3', '1+1', '1e4.5', '.5.', '1f5', '.']) {
  if (number.test(str)) {
    console.log(`Incorrectly accepted '${str}'`);
  }
}
