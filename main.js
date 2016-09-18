/* globals module */

const meyda = require('meyda')

module.exports = function main(filename,
                               features = meyda.featureExtractors,
                               windowingFunction='hanning',
                               chunks){

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
}
