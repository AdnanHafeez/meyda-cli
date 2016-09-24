const test = require('ava');
const td = require('testdouble');
const validation = require('../validation');

test.skip('doesn\'t throw with valid params', t => {
  t.notThrows(() => {
    console.log(validation.validate(['rms'], 'sine', 2048));
  });
});

test('throws with invalid feature', t => {
  t.throws(() => {
    validation.validate(['fish'], 'hanning', 2048);
  });
});

test('throws when feature is not an array', t => {
  t.throws(() => {
    validation.validate('rms', 'hanning', 2048);
  }, 'Feature must be in an array');
});

test.skip('throws with invalid windowing function', t => {
  t.throws(t => {
    validation.validate(['rms'], 'fish', 2048);
  }, /^Invalid Windowing Function/);
});

test.skip('throws with invalid buffer size', t => {
  t.throws(t => {
    validation.validate(['rms'], 'hanning', 15);
  }, 'Invalid Buffer Size');
});

test.todo('throws invalid windowing function exception');
test.todo('doesn\'t throw with valid windowing function');

test.todo('throws invalid buffer size exception');
test.todo('doesn\'t throw with valid buffer size');

test.todo('throws invalid feature exception');
test.todo('doesn\'t throw with valid feature');
