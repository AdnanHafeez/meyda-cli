/* globals module */

const meyda = require('meyda');
const fs = require('fs');
const validation = require('./validation');

module.exports = function main(filename,
                               features = meyda.featureExtractors,
                               windowingFunction = 'hanning',
                               bufferSize = 1024){

  validation.validate(features, windowingFunction, bufferSize);

  const extract = (() => {
    meyda.bufferSize = bufferSize;
    meyda.windowingFunction = windowingFunction;
    return (chunk) => meyda.extract(features, chunk);
  })();

  return extract;
}
