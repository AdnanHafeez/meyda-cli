const Transform = require('stream').Transform;

function zeroes(n) {
  return Array.apply(null, Array(n)).map(Number.prototype.valueOf,0);
}

let frame = new Float32Array();

class ChunkStream extends Transform {
  constructor(extract, bufferSize, options) {
    super(options);
    this.extract = extract;
    this.bufferSize = bufferSize;
  }
}

ChunkStream.prototype._transform = function (obj, encoding, callback) {
  try {
    const b = Float32Array.from(obj);
    const a = new Float32Array(frame.length + b.length);
    a.set(frame);
    a.set(b, frame.length);
    frame = a;
    while (frame.length >= this.bufferSize) {
      const meydaFrame = Float32Array.from(frame.slice(0,this.bufferSize));
      this.push(`${JSON.stringify(this.extract(meydaFrame)).replace(/\n/g,'')}\n`);
      frame = frame.slice(this.bufferSize);
    }
  } catch(err) {
    return callback(err);
  }
  // TODO handle input stream closing case
  callback();
};

module.exports = ChunkStream;

