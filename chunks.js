const Transform = require('stream').Transform;

function zeroes(n) {
  return Array.apply(null, Array(n)).map(Number.prototype.valueOf,0);
}

let buffer = [];

class ChunkStream extends Transform {
  constructor(extract, bufferSize, options) {
    this.extract = extract;
    this.bufferSize = bufferSize;
    super(options);
  }
}

ChunkStream.prototype._transform = function (obj, encoding, callback) {
  try {
    buffer = buffer.concat(obj);
    if (buffer.length >= this.bufferSize) {
      this.push(this.extract(Float32Array.from(obj.slice(0,this.bufferSize))));
      buffer = buffer.slice(this.bufferSize);
    }
  } catch(err) {
    return callback(err);
  }
  // TODO handle input stream closing case
  callback();
};

/* // Earlier implementation that might still be useful
function(stream, bitDepth, bufferSize, extractorStream) {
  stream.on('readable',() => {
    if (buffer.length === bufferSize) {
      extractorStream.write(new Float32Array(buffer));
      buffer = [];
    }
  });
  stream.on('finish',() => {
    if (buffer.length > 0) {
      extractorStream.write(new Float32Array(
        buffer.concat(
          zeroes(bufferSize - buffer.length)
        )
      ));
    }
  });
};
*/
