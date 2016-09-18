const test = require('ava');
const td = require('testdouble');
const main = require('../main');

test.todo('successfully returns a feature object');

test.skip('successfully passes the sample rate', t => {
  // "don't mock 'third party' code"
});

test.skip('properly filters the featureset', t => {
  // "don't mock 'third party' code"
});

test.skip('throws invalid chunk list exception', t => {
});

test('throws invalid features exception', t => {
  t.throws(() => {
    main('file.wav', ['fish']);
  }, 'Invalid feature(s) fish'
  );
});

test('throws invalid features exception', t => {
  t.throws(() => {
    main('file.wav', ['fish']);
  }, 'Invalid feature(s) fish'
  );
});

test.todo('throws invalid windowing function exception');
