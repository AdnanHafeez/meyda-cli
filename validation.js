const meyda = require('meyda');

const validateFeatures = (features) => {
  const invalidFeatures = (() => {
    try {
      // Get a list of the features that have been asked for that aren't supported
      return features.reduce((accumulator,feature) => {
        if (Object.keys(meyda.featureExtractors).indexOf(feature) < 0) {
          return accumulator.concat([feature]);
        }
        return accumulator;
      }, []);
    } catch (e) {
      throw {
        name: 'Invalid Features',
        message: 'Feature must be in an array'
      }
    }
  })();

  if (invalidFeatures.length > 0) {
    throw {
      name: 'Invalid Features',
      message: `Invalid feature(s) ${invalidFeatures.toString()}`
    };
  }

  return true;
}

const validateWindowingFunction = (windowingFunction) => {
  // TODO get this list of valid windowing functions from Meyda
  const validWindowingFunctions = [
    'hanning',
    'hamming',
    'blackman',
    'sine'
  ];

  if (validWindowingFunctions.indexOf(windowingFunction) > -1){
    throw {
      name: 'Invalid Windowing Function',
      message: 'Valid windowing functions list available here:\nhttps://github.com/hughrawlinson/meyda/wiki/audio-features#windowing-functions'
    };
  }

  return true;
}

const validateBufferSize = (bufferSize) => {
  // TODO validate buffer size
  if (!powerOfTwo(bufferSize)){
    throw {
      name: 'Invalid Buffer Size',
      message: 'The buffer size must be a power of two'
    }
  }
}

const validate = (features, windowingFunction, bufferSize) => {
  return validateFeatures(features) && validateWindowingFunction(windowingFunction) && validateBufferSize(bufferSize);
}

module.exports = {
  validate,
  validateFeatures,
  validateWindowingFunction,
  validateBufferSize
}
