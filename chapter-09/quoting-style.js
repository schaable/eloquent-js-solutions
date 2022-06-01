import { expect } from 'chai';

// Test cases
expect("'I'm the cook,' he said, 'it's my job.'".replace(/'(.+?)'(\W+|$)/g, '"$1"$2')).to.equal(
  `"I'm the cook," he said, "it's my job."`
);
