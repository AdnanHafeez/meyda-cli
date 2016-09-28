#!/usr/bin/env node

(function() {
  const fs = require('fs');
  const wav = require('wav');
  const program = require('commander');
  const meyda = require('meyda');
  const main = require('./main');
  const ChunkStream = require('./chunks');

  program
    .version(require('./package.json').version)
    .description("A command line interface to Meyda, audio feature extraction in Javascript")
    .usage('[options] <file>')
    .option('-w, --windowingFunction [name]',
            'Set the windowing function [hanning]',
            'hanning')
    .option('-s, --bufferSize <n>',
            'Set the buffer size, must be a power of 2',
            1024,
            parseInt)
    .option('-f, --features <items>',
            'A list of audio features (default all available features).',
            (string) => string.split(','))
    .arguments('<file> [env]')
    .action((file, env) => {
    }).parse(process.argv);

  // output help by default
  if (!process.argv.slice(2).length) {
    program.outputHelp();
    process.exit(1);
  }

  // TODO get filename from Commander
  //const filename = process.argv.slice(-1)[0];

  console.log(program.features);

  try {
    // If we've been given a file, open a file stream
    const stream = (() => {
      // TODO check the wav file is valid
      // if (validWavFile(filename)) {
      try {
        return fs.createReadStream(filename);
      } catch (e) {
        // Otherwise, use stdin
        return process.stdin;
      }
    })();

    const extract = main(program.file,
        program.features,
        program.windowingFunction,
        program.bufferSize);

    // TODO pass input through the wav stream encoder
    const chunkStream = new ChunkStream(extract, program.bufferSize);
    const wavReader = new wav.Reader();

    stream.pipe(wavReader);
    wavReader.on('format',() => {
      wavReader.pipe(chunkStream);
    });
    chunkStream.pipe(process.stdout);
  } catch (e) {
    console.error(e);
    program.outputHelp();
    process.exit(e.statusCode);
  }
})();
