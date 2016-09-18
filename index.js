#!/usr/bin/env node

(function() {
  const fs = require('fs');
  const wav = require('wav');
  const program = require('commander');
  const meyda = require('meyda');
  const main = require('./main');

  const BAD_REQUEST = 400;

  program
    .version(require('./package.json').version)
    .description("A command line interface to Meyda, audio feature extraction in Javascript")
    .usage('[options] <file>')
    .option('-w, --windowingFunction [name]',
            'Set the windowing function [hanning]',
            'hanning')
    .option('-s, --bufferSize <n>',
            'Set the buffer size, must be a power of 2',
            1024, parseInt)
    .option('-f, --features <items>',
            'A list of audio features (default all available features).',
            Object.keys(meyda.featureExtractors),
            (l) => l.split(','))
    .arguments('<file> [env]')
    .action((file, env) => {
    }).parse(process.argv);

  // output help by default
  if (!process.argv.slice(2).length) {
    program.outputHelp();
    process.exit(BAD_REQUEST);
  }

  try {
    main(program.file,
        program.features,
        program.bufferSize,
        program.windowingFunction);
  } catch (e) {
    console.error(e);
    program.outputHelp();
    process.exit(e.statusCode);
  }
})();
