require('dotenv').config();

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { join } = require('path');

yargs(hideBin(process.argv))
  .commandDir(join(__dirname, 'cmd'))
  .demandCommand(1)
  .help()
  .parse();
