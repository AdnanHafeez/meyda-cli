/* globals module */

const meyda = require('meyda');
const fs = require('fs');

module.exports = function main(filename,
                               features = meyda.featureExtractors,
                               windowingFunction='hanning',
                               bufferSize = 1024){

  // Get a list of the features that have been asked for that aren't supported
  const invalidFeatures = features.reduce((accumulator,feature) => {
    if (Object.keys(meyda.featureExtractors).indexOf(feature) < 0) {
      return accumulator.concat([feature]);
    }
    return accumulator;
  }, []);

  if (invalidFeatures.length >= 0) {
    throw {
      name: 'Invalid Features',
      message: `Invalid feature(s) ${invalidFeatures.toString()}`
    };
  }

  // TODO validate windowing function
  const stream = () => {
    if (validWavFile(filename)) {
      return fs.createReadStream(filename);
    }
    return process.stdin;
  }
  
  const extract = (() => {
    meyda.bufferSize = bufferSize;
    meyda.windowingFunction = windowingFunction;
    return (chunk) => meyda.extract(features, chunk);
  })();
  
  const chunkStream = new ChunkStream(extract, bufferSize);
  
  stream.pipe(chunkStream);
  chunkStream.pipe(process.stdout);
}
